import nodemailer from 'nodemailer';

// Email configuration
const emailConfig = {
  service: 'gmail',
  auth: {
    user: 'mohikkler123@gmail.com', // Your Gmail address
    pass: 'sxly vgyn fixa rftq' // Your app password
  },
  secure: true, // Use SSL/TLS
  port: 465, // Gmail SMTP port for SSL
  tls: {
    rejectUnauthorized: false // Allow self-signed certificates
  }
};

// Create transporter
const transporter = nodemailer.createTransport(emailConfig);

// Generate OTP
export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Email template for OTP
const createOTPEmailTemplate = (otp: string): string => {
  return `
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
          
          <!-- OTP Code (Moved to where phone number was) -->
          <div style="background-color: #f1f5f9; border-radius: 12px; padding: 20px; margin-bottom: 30px; text-align: center;">
            <p style="color: #475569; margin: 0 0 8px; font-size: 14px; font-weight: 500;">
              YOUR VERIFICATION CODE
            </p>
            <div style="background-color: white; border-radius: 12px; padding: 20px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); margin-top: 12px;">
              <span style="font-size: 36px; font-weight: 700; color: #2563eb; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                ${otp}
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
                  This code expires in <strong>10 minutes</strong> for your security. Never share this code with anyone.
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
  `;
};

// Send OTP email
export const sendOTPEmail = async (to: string, otp: string, phone: string): Promise<boolean> => {
  try {
    console.log(`Attempting to send OTP email to: ${to}`);
    console.log(`OTP: ${otp} for phone: ${phone}`);
    
    const mailOptions = {
      from: 'Kaler Scan Center <mohikkler123@gmail.com>',
      to: to,
      subject: 'Your Verification Code - Kaler Scan Center',
      html: createOTPEmailTemplate(otp)
    };

    console.log('Mail options configured:', { from: mailOptions.from, to: mailOptions.to, subject: mailOptions.subject });

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
    return true;
  } catch (error) {
    console.error('❌ Error sending email:');
    console.error('Error details:', error);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    return false;
  }
};

// Verify transporter connection
export const verifyEmailConnection = async (): Promise<boolean> => {
  try {
    await transporter.verify();
    console.log('Email service is ready');
    return true;
  } catch (error) {
    console.error('Email service verification failed:', error);
    return false;
  }
};

// Email template for appointment confirmation
const createAppointmentConfirmationTemplate = (appointmentData: {
  appointmentId: string;
  patientName: string;
  phoneNumber: string;
  email: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  age?: string;
  gender?: string;
  notes?: string;
}): string => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Appointment Confirmation - Kaler Scan Center</title>
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
            <div style="background-color: #dcfce7; border-radius: 50%; width: 60px; height: 60px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 24px; color: #16a34a;">✓</span>
            </div>
            <h2 style="color: #1e293b; margin: 0 0 12px; font-size: 24px; font-weight: 600;">
              Appointment Confirmed!
            </h2>
            <p style="color: #64748b; margin: 0; font-size: 16px; line-height: 1.5;">
              Your appointment has been successfully scheduled. Please find the details below.
            </p>
          </div>
          
          <!-- Appointment ID -->
          <div style="background-color: #f1f5f9; border-radius: 12px; padding: 20px; margin-bottom: 30px; text-align: center;">
            <p style="color: #475569; margin: 0 0 8px; font-size: 14px; font-weight: 500;">
              APPOINTMENT ID
            </p>
            <p style="color: #1e293b; margin: 0; font-size: 18px; font-weight: 600; letter-spacing: 0.5px;">
              ${appointmentData.appointmentId}
            </p>
          </div>
          
          <!-- Appointment Details -->
          <div style="background: linear-gradient(135deg, #f8fafc, #e2e8f0); border-radius: 16px; padding: 30px; margin-bottom: 30px; border: 2px solid #e2e8f0;">
            <h3 style="color: #1e293b; margin: 0 0 20px; font-size: 18px; font-weight: 600; text-align: center;">
              Appointment Details
            </h3>
            
            <div style="display: grid; gap: 16px;">
              <div style="display: flex; align-items: center; padding: 12px; background-color: white; border-radius: 8px;">
                <div style="width: 40px; height: 40px; background-color: #dbeafe; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                  <span style="font-size: 16px; color: #2563eb;">👤</span>
                </div>
                <div>
                  <p style="color: #64748b; margin: 0; font-size: 12px; font-weight: 500;">PATIENT NAME</p>
                  <p style="color: #1e293b; margin: 0; font-size: 14px; font-weight: 600;">${appointmentData.patientName}</p>
                </div>
              </div>
              
              <div style="display: flex; align-items: center; padding: 12px; background-color: white; border-radius: 8px;">
                <div style="width: 40px; height: 40px; background-color: #dbeafe; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                  <span style="font-size: 16px; color: #2563eb;">🔬</span>
                </div>
                <div>
                  <p style="color: #64748b; margin: 0; font-size: 12px; font-weight: 500;">SERVICE</p>
                  <p style="color: #1e293b; margin: 0; font-size: 14px; font-weight: 600;">${appointmentData.serviceType}</p>
                </div>
              </div>
              
              <div style="display: flex; align-items: center; padding: 12px; background-color: white; border-radius: 8px;">
                <div style="width: 40px; height: 40px; background-color: #dbeafe; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                  <span style="font-size: 16px; color: #2563eb;">📅</span>
                </div>
                <div>
                  <p style="color: #64748b; margin: 0; font-size: 12px; font-weight: 500;">DATE</p>
                  <p style="color: #1e293b; margin: 0; font-size: 14px; font-weight: 600;">${formatDate(appointmentData.preferredDate)}</p>
                </div>
              </div>
              
              <div style="display: flex; align-items: center; padding: 12px; background-color: white; border-radius: 8px;">
                <div style="width: 40px; height: 40px; background-color: #dbeafe; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                  <span style="font-size: 16px; color: #2563eb;">🕐</span>
                </div>
                <div>
                  <p style="color: #64748b; margin: 0; font-size: 12px; font-weight: 500;">TIME</p>
                  <p style="color: #1e293b; margin: 0; font-size: 14px; font-weight: 600;">${appointmentData.preferredTime}</p>
                </div>
              </div>
              
              <div style="display: flex; align-items: center; padding: 12px; background-color: white; border-radius: 8px;">
                <div style="width: 40px; height: 40px; background-color: #dbeafe; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                  <span style="font-size: 16px; color: #2563eb;">📞</span>
                </div>
                <div>
                  <p style="color: #64748b; margin: 0; font-size: 12px; font-weight: 500;">PHONE</p>
                  <p style="color: #1e293b; margin: 0; font-size: 14px; font-weight: 600;">${appointmentData.phoneNumber}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Important Information -->
          <div style="background-color: #fef3c7; border-radius: 12px; padding: 20px; margin-bottom: 30px; border-left: 4px solid #f59e0b;">
            <h4 style="color: #92400e; margin: 0 0 12px; font-size: 16px; font-weight: 600;">
              ⚠️ Important Information
            </h4>
            <ul style="color: #92400e; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
              <li>Please arrive 15 minutes before your scheduled appointment time</li>
              <li>Bring a valid photo ID and any previous medical reports</li>
              <li>For ultrasound scans, please come with a full bladder</li>
              <li>For fasting tests, please follow the fasting instructions provided</li>
              <li>Wear comfortable clothing for your examination</li>
            </ul>
          </div>
          
          <!-- Contact Information -->
          <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; text-align: center;">
            <h4 style="color: #1e293b; margin: 0 0 12px; font-size: 16px; font-weight: 600;">
              Need to Reschedule?
            </h4>
            <p style="color: #64748b; margin: 0 0 16px; font-size: 14px;">
              Please contact us at least 24 hours before your appointment
            </p>
            <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
              <div>
                <p style="color: #475569; margin: 0; font-size: 12px; font-weight: 500;">PHONE</p>
                <p style="color: #1e293b; margin: 0; font-size: 14px; font-weight: 600;">+91 XXXXX XXXXX</p>
              </div>
              <div>
                <p style="color: #475569; margin: 0; font-size: 12px; font-weight: 500;">EMAIL</p>
                <p style="color: #1e293b; margin: 0; font-size: 14px; font-weight: 600;">info@kalerscancenter.com</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #1e293b; padding: 30px 20px; text-align: center;">
          <p style="color: #94a3b8; margin: 0 0 8px; font-size: 14px;">
            Thank you for choosing Kaler Scan Center
          </p>
          <p style="color: #64748b; margin: 0; font-size: 12px;">
            Advanced Diagnostic Services • Professional Care • Accurate Results
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Function to send appointment confirmation email
export const sendAppointmentConfirmationEmail = async (appointmentData: {
  appointmentId: string;
  patientName: string;
  phoneNumber: string;
  email: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  age?: string;
  gender?: string;
  notes?: string;
}): Promise<boolean> => {
  try {
    console.log(`Attempting to send appointment confirmation email to: ${appointmentData.email}`);
    
    const mailOptions = {
      from: 'Kaler Scan Center <mohikkler123@gmail.com>',
      to: appointmentData.email,
      subject: `Appointment Confirmed - ${appointmentData.appointmentId} - Kaler Scan Center`,
      html: createAppointmentConfirmationTemplate(appointmentData)
    };

    console.log('Appointment confirmation mail options configured:', { 
      from: mailOptions.from, 
      to: mailOptions.to, 
      subject: mailOptions.subject 
    });

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Appointment confirmation email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
    return true;
  } catch (error: unknown) {
    console.error('❌ Error sending appointment confirmation email:');
    console.error('Error details:', error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Error code:', error instanceof Error && 'code' in error ? (error as any).code : 'Unknown');
    return false;
  }
};

export default {
  generateOTP,
  sendOTPEmail,
  sendAppointmentConfirmationEmail,
  verifyEmailConnection
}; 