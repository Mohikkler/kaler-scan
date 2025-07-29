-- Fix OTP expiry to recommended 2 minutes
ALTER TABLE public.email_otp_codes ALTER COLUMN expires_at SET DEFAULT (now() + '00:02:00'::interval);