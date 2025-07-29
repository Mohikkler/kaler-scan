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
          from: 'Kaler Scan Center <onboarding@resend.dev>',
          to: [email],
          subject: 'Your Verification Code - Kaler Scan Center',
          html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>OTP Verification - Kaler Scan Center</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background-color: #f8fafc;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 40px 20px; text-align: center;">
                  <div style="background-color: rgba(255,255,255,0.1); border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                    <div style="width: 40px; height: 40px; background-color: white; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                      <div style="width: 24px; height: 24px; background-color: #2563eb; border-radius: 4px;"></div>
                    </div>
                  </div>
                  <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                    Kaler Scan Center
                  </h1>
                  <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 16px;">
                    Advanced Diagnostic Services
                  </p>
                </div>
                
                <!-- Content -->
                <div style="padding: 40px 30px;">
                  <div style="text-align: center; margin-bottom: 30px;">
                    <h2 style="color: #1e293b; margin: 0 0 12px; font-size: 24px; font-weight: 600;">
                      Security Verification Code
                    </h2>
                    <p style="color: #64748b; margin: 0; font-size: 16px; line-height: 1.5;">
                      We've sent this code to verify your identity for secure access to your test reports.
                    </p>
                  </div>
                  
                  <!-- Phone Info -->
                  <div style="background-color: #f1f5f9; border-radius: 12px; padding: 20px; margin-bottom: 30px; text-align: center;">
                    <p style="color: #475569; margin: 0 0 8px; font-size: 14px; font-weight: 500;">
                      PHONE NUMBER
                    </p>
                    <p style="color: #1e293b; margin: 0; font-size: 18px; font-weight: 600; letter-spacing: 0.5px;">
                      ${phone}
                    </p>
                  </div>
                  
                  <!-- OTP Code -->
                  <div style="background: linear-gradient(135deg, #f8fafc, #e2e8f0); border-radius: 16px; padding: 30px; margin-bottom: 30px; text-align: center; border: 2px solid #e2e8f0;">
                    <p style="color: #475569; margin: 0 0 16px; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">
                      Your Verification Code
                    </p>
                    <div style="background-color: white; border-radius: 12px; padding: 20px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                      <span style="font-size: 36px; font-weight: 700; color: #2563eb; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                        ${otpCode}
                      </span>
                    </div>
                  </div>
                  
                  <!-- Security Notice -->
                  <div style="background-color: #fef3f2; border-left: 4px solid #ef4444; padding: 16px 20px; border-radius: 8px; margin-bottom: 30px;">
                    <div style="display: flex; align-items: flex-start;">
                      <div style="width: 20px; height: 20px; background-color: #ef4444; border-radius: 50%; margin-right: 12px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; margin-top: 2px;">
                        <span style="color: white; font-size: 12px; font-weight: bold;">!</span>
                      </div>
                      <div>
                        <p style="color: #dc2626; margin: 0 0 4px; font-size: 14px; font-weight: 600;">
                          Security Notice
                        </p>
                        <p style="color: #7f1d1d; margin: 0; font-size: 13px; line-height: 1.4;">
                          This code expires in <strong>1 minute</strong> for your security. Never share this code with anyone.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Instructions -->
                  <div style="text-align: center; margin-bottom: 30px;">
                    <p style="color: #475569; margin: 0; font-size: 15px; line-height: 1.6;">
                      Enter this code in the web application to complete your secure login and access your test reports.
                    </p>
                  </div>
                  
                  <!-- Disclaimer -->
                  <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; text-align: center;">
                    <p style="color: #64748b; margin: 0; font-size: 13px; line-height: 1.5;">
                      If you didn't request this verification code, please ignore this email or contact our support team immediately.
                    </p>
                  </div>
                </div>
                
                <!-- Footer -->
                <div style="background-color: #1e293b; padding: 30px 20px; text-align: center;">
                  <div style="margin-bottom: 20px;">
                    <h3 style="color: white; margin: 0 0 8px; font-size: 18px; font-weight: 600;">
                      Kaler Scan Center
                    </h3>
                    <p style="color: #94a3b8; margin: 0; font-size: 14px;">
                      Your Trusted Partner in Healthcare Diagnostics
                    </p>
                  </div>
                  
                  <div style="border-top: 1px solid #374151; padding-top: 20px;">
                    <p style="color: #9ca3af; margin: 0; font-size: 12px;">
                      © 2024 Kaler Scan Center. All rights reserved.
                    </p>
                    <p style="color: #6b7280; margin: 8px 0 0; font-size: 11px;">
                      This is an automated message. Please do not reply to this email.
                    </p>
                  </div>
                </div>
              </div>
            </body>
            </html>
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