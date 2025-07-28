import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const telegramBotToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
const supabaseUrl = 'https://lbljucnwufptvdviozsw.supabase.co';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const supabase = createClient(supabaseUrl, supabaseServiceKey!);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const sendTelegramMessage = async (chatId: string, message: string) => {
  console.log(`Sending message to chat ${chatId}: ${message}`);
  
  const response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    }),
  });

  const result = await response.json();
  console.log('Telegram API response:', result);
  
  if (!result.ok) {
    throw new Error(`Telegram API error: ${result.description}`);
  }
  
  return result;
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    
    // Handle Telegram webhook (when users message the bot)
    if (body.message) {
      const chatId = body.message.chat.id;
      const username = body.message.from.username;
      const text = body.message.text;

      console.log(`Received message from @${username} (${chatId}): ${text}`);

      // Store or update the user's chat_id
      if (username) {
        const { error } = await supabase
          .from('patients')
          .upsert({
            telegram_username: username,
            telegram_chat_id: chatId,
            phone_number: `temp_${username}`, // Temporary until they login properly
            full_name: `User ${username}`
          }, {
            onConflict: 'telegram_username',
            ignoreDuplicates: false
          });

        if (error) {
          console.error('Error storing chat_id:', error);
        }

        // Send welcome message
        if (text === '/start') {
          await sendTelegramMessage(chatId.toString(), 
            '🏥 <b>Welcome to Kalera Diagnostics!</b>\n\n' +
            'Your Telegram account is now connected. You can now receive OTP codes for secure login to access your test reports.\n\n' +
            'Go back to the website and enter your phone number and Telegram username to get started!'
          );
        }
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Handle OTP actions
    const { action, phone, telegramUsername, otp } = body;
    console.log(`Received action: ${action}, phone: ${phone}, telegram: ${telegramUsername}`);

    if (action === 'send_otp') {
      // Generate OTP code
      const otpCode = generateOTP();
      console.log(`Generated OTP: ${otpCode} for ${phone}`);

      // Store OTP in database
      const { error: insertError } = await supabase
        .from('telegram_otp_codes')
        .insert({
          phone_number: phone,
          telegram_username: telegramUsername,
          otp_code: otpCode
        });

      if (insertError) {
        console.error('Error storing OTP:', insertError);
        throw insertError;
      }

      // Try to find user's chat ID by username first
      let chatId = null;
      
      // For now, we'll send the OTP to the username via a message format
      // In a real implementation, users would need to start a conversation with the bot first
      const message = `🔐 <b>Kalera Diagnostics - OTP Verification</b>\n\n` +
                    `Your verification code is: <b>${otpCode}</b>\n\n` +
                    `⏰ This code will expire in 5 minutes.\n` +
                    `📱 Phone: ${phone}\n\n` +
                    `Please enter this code in the web application to complete your login.`;

      // Try to get user's chat by username via Telegram API
      try {
        // First, try to find if user has a stored chat_id by telegram username
        const cleanUsername = telegramUsername.replace('@', '');
        const { data: patientData } = await supabase
          .from('patients')
          .select('telegram_chat_id')
          .eq('telegram_username', cleanUsername)
          .maybeSingle();

        let chatId = patientData?.telegram_chat_id;

        if (!chatId) {
          // If no stored chat_id, we can't send the message directly
          // User needs to start a conversation with the bot first
          return new Response(JSON.stringify({ 
            success: false, 
            error: 'Please start a conversation with @kalerscanbot on Telegram first, then try again.',
            requiresBotStart: true
          }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // Send OTP via Telegram
        await sendTelegramMessage(chatId.toString(), message);

        return new Response(JSON.stringify({ 
          success: true, 
          message: 'OTP sent to your Telegram account'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      } catch (telegramError) {
        console.error('Error sending Telegram message:', telegramError);
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'Failed to send OTP via Telegram. Please ensure you have started a conversation with @kalerscanbot first.'
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

    } else if (action === 'verify_otp') {
      console.log(`Verifying OTP: ${otp} for phone: ${phone}`);

      // Verify OTP from database
      const { data: otpData, error: fetchError } = await supabase
        .from('telegram_otp_codes')
        .select('*')
        .eq('phone_number', phone)
        .eq('otp_code', otp)
        .eq('used', false)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1);

      if (fetchError) {
        console.error('Error fetching OTP:', fetchError);
        throw fetchError;
      }

      if (!otpData || otpData.length === 0) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'Invalid or expired OTP' 
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Mark OTP as used
      const { error: updateError } = await supabase
        .from('telegram_otp_codes')
        .update({ used: true })
        .eq('id', otpData[0].id);

      if (updateError) {
        console.error('Error updating OTP:', updateError);
        throw updateError;
      }

      // Check if patient exists, if not create them
      const { data: patientData, error: patientError } = await supabase
        .from('patients')
        .select('*')
        .eq('phone_number', phone)
        .maybeSingle();

      if (patientError) {
        console.error('Error fetching patient:', patientError);
        throw patientError;
      }

      if (!patientData) {
        // Create new patient with Telegram username
        const { error: createError } = await supabase
          .from('patients')
          .insert({
            phone_number: phone,
            telegram_username: otpData[0].telegram_username,
            full_name: `User ${phone}` // Default name, can be updated later
          });

        if (createError) {
          console.error('Error creating patient:', createError);
          throw createError;
        }
      } else {
        // Update existing patient with Telegram username
        const { error: updatePatientError } = await supabase
          .from('patients')
          .update({ telegram_username: otpData[0].telegram_username })
          .eq('phone_number', phone);

        if (updatePatientError) {
          console.error('Error updating patient:', updatePatientError);
          throw updatePatientError;
        }
      }

      return new Response(JSON.stringify({ 
        success: true, 
        message: 'OTP verified successfully' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } else {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Invalid action' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Error in telegram-bot function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});