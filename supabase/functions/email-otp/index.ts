import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from 'npm:resend@4.0.0';

const resendApiKey = Deno.env.get('RESEND_API_KEY');
const supabaseUrl = 'https://lbljucnwufptvdviozsw.supabase.co';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const supabase = createClient(supabaseUrl, supabaseServiceKey!);
const resend = new Resend(resendApiKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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
    const { action, phone, email, otp } = body;
    console.log(`Received action: ${action}, phone: ${phone}, email: ${email}`);

    if (action === 'send_otp') {
      // Generate OTP code
      const otpCode = generateOTP();
      console.log(`Generated OTP: ${otpCode} for ${phone}`);

      // Store OTP in database
      const { error: insertError } = await supabase
        .from('email_otp_codes')
        .insert({
          phone_number: phone,
          email: email,
          otp_code: otpCode
        });

      if (insertError) {
        console.error('Error storing OTP:', insertError);
        throw insertError;
      }

      try {
        // Send OTP via email
        const { error: emailError } = await resend.emails.send({
          from: 'Kalera Diagnostics <onboarding@resend.dev>',
          to: [email],
          subject: 'Your OTP Code - Kalera Diagnostics',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #2563eb; text-align: center;">Kalera Diagnostics</h1>
              <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h2 style="color: #1e293b; margin-bottom: 16px;">Your Verification Code</h2>
                <p style="color: #475569; font-size: 16px; line-height: 1.5;">
                  Your verification code for phone number <strong>${phone}</strong> is:
                </p>
                <div style="background-color: #e2e8f0; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
                  <span style="font-size: 32px; font-weight: bold; color: #1e293b; letter-spacing: 4px;">${otpCode}</span>
                </div>
                <p style="color: #ef4444; font-size: 14px;">
                  ⏰ This code will expire in 1 minute for security.
                </p>
                <p style="color: #475569; font-size: 14px; margin-top: 20px;">
                  If you didn't request this code, please ignore this email.
                </p>
              </div>
              <div style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 30px;">
                <p>© 2024 Kalera Diagnostics. All rights reserved.</p>
              </div>
            </div>
          `
        });

        if (emailError) {
          console.error('Error sending email:', emailError);
          throw emailError;
        }

        return new Response(JSON.stringify({ 
          success: true, 
          message: 'OTP sent to your email address'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      } catch (emailError) {
        console.error('Error sending email:', emailError);
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'Failed to send OTP via email. Please check your email address and try again.'
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

    } else if (action === 'verify_otp') {
      console.log(`Verifying OTP: ${otp} for phone: ${phone}`);

      // Verify OTP from database
      const { data: otpData, error: fetchError } = await supabase
        .from('email_otp_codes')
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
        .from('email_otp_codes')
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
        // Create new patient with email
        const { error: createError } = await supabase
          .from('patients')
          .insert({
            phone_number: phone,
            email: otpData[0].email,
            full_name: `User ${phone}` // Default name, can be updated later
          });

        if (createError) {
          console.error('Error creating patient:', createError);
          throw createError;
        }
      } else {
        // Update existing patient with email
        const { error: updatePatientError } = await supabase
          .from('patients')
          .update({ email: otpData[0].email })
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
    console.error('Error in email-otp function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});