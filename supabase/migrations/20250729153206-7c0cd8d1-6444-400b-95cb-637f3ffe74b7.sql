-- Fix OTP expiry to recommended 1 minute for security
ALTER TABLE public.email_otp_codes ALTER COLUMN expires_at SET DEFAULT (now() + '00:01:00'::interval);