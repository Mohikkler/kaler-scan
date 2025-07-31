import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { generateOTP, sendOTPEmail, sendAppointmentConfirmationEmail, verifyEmailConnection } from '../src/services/emailService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase configuration
const supabaseUrl = 'https://lbljucnwufptvdviozsw.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxibGp1Y253dWZwdHZkdmlvenN3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzcxMDc1NCwiZXhwIjoyMDY5Mjg2NzU0fQ.JE70ZT5_WKcxruD6Q6vXHOEeLpQapGvdijqIPT2EKeI';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Test endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Email server is running' });
});

// Send OTP endpoint
app.post('/api/send-otp', async (req, res) => {
  try {
    const { phone, email } = req.body;

    if (!phone || !email) {
      return res.status(400).json({
        success: false,
        error: 'Phone number and email are required'
      });
    }

    // Generate OTP
    const otpCode = generateOTP();
    console.log(`Generated OTP: ${otpCode} for ${phone}`);

    // Store OTP in database with expiration (10 minutes)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
    
    const { error: insertError } = await supabase
      .from('email_otp_codes')
      .insert({
        phone_number: phone,
        email: email,
        otp_code: otpCode,
        expires_at: expiresAt.toISOString(),
        used: false
      });

    if (insertError) {
      console.error('Error storing OTP:', insertError);
      return res.status(500).json({
        success: false,
        error: 'Failed to store OTP'
      });
    }

    // Send OTP via email
    const emailSent = await sendOTPEmail(email, otpCode, phone);

    if (!emailSent) {
      return res.status(500).json({
        success: false,
        error: 'Failed to send OTP via email'
      });
    }

    res.json({
      success: true,
      message: 'OTP sent to your email address'
    });

  } catch (error) {
    console.error('Error in send-otp endpoint:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Verify OTP endpoint
app.post('/api/verify-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        error: 'Phone number and OTP are required'
      });
    }

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
      return res.status(500).json({
        success: false,
        error: 'Failed to verify OTP'
      });
    }

    if (!otpData || otpData.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired OTP'
      });
    }

    // Mark OTP as used
    const { error: updateError } = await supabase
      .from('email_otp_codes')
      .update({ used: true })
      .eq('id', otpData[0].id);

    if (updateError) {
      console.error('Error updating OTP:', updateError);
      return res.status(500).json({
        success: false,
        error: 'Failed to update OTP status'
      });
    }

    // Check if patient exists, if not create them
    const { data: patientData, error: patientError } = await supabase
      .from('patients')
      .select('*')
      .eq('phone_number', phone)
      .maybeSingle();

    if (patientError) {
      console.error('Error fetching patient:', patientError);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch patient data'
      });
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
        return res.status(500).json({
          success: false,
          error: 'Failed to create patient'
        });
      }
    } else {
      // Update existing patient with email
      const { error: updatePatientError } = await supabase
        .from('patients')
        .update({ email: otpData[0].email })
        .eq('phone_number', phone);

      if (updatePatientError) {
        console.error('Error updating patient:', updatePatientError);
        return res.status(500).json({
          success: false,
          error: 'Failed to update patient'
        });
      }
    }

    res.json({
      success: true,
      message: 'OTP verified successfully'
    });

  } catch (error) {
    console.error('Error in verify-otp endpoint:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Test email connection
app.get('/api/test-email', async (req, res) => {
  try {
    const isConnected = await verifyEmailConnection();
    res.json({
      success: isConnected,
      message: isConnected ? 'Email service is ready' : 'Email service is not ready'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to test email connection'
    });
  }
});

// Send appointment confirmation email endpoint
app.post('/api/send-appointment-confirmation', async (req, res) => {
  try {
    const { appointmentData } = req.body;

    if (!appointmentData || !appointmentData.email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Appointment data and email are required' 
      });
    }

    console.log('Received appointment confirmation request:', appointmentData);

    const emailSent = await sendAppointmentConfirmationEmail(appointmentData);

    if (emailSent) {
      res.json({ 
        success: true, 
        message: 'Appointment confirmation email sent successfully' 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: 'Failed to send appointment confirmation email' 
      });
    }
  } catch (error: any) {
    console.error('Error in appointment confirmation endpoint:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Internal server error' 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Email server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Test email: http://localhost:${PORT}/api/test-email`);
});

export default app; 