-- Fix OTP expiry to meet security recommendations (5 minutes instead of 10)
ALTER TABLE public.telegram_otp_codes 
ALTER COLUMN expires_at SET DEFAULT (now() + interval '5 minutes');