-- Add telegram_username to patients table for Telegram-based authentication
ALTER TABLE public.patients 
ADD COLUMN telegram_username TEXT UNIQUE,
ADD COLUMN telegram_chat_id BIGINT UNIQUE;

-- Create index for better performance on telegram lookups
CREATE INDEX idx_patients_telegram_username ON public.patients(telegram_username);
CREATE INDEX idx_patients_telegram_chat_id ON public.patients(telegram_chat_id);

-- Create table to store OTP codes for Telegram authentication
CREATE TABLE public.telegram_otp_codes (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    phone_number TEXT NOT NULL,
    telegram_username TEXT NOT NULL,
    otp_code TEXT NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '10 minutes'),
    used BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for telegram_otp_codes
ALTER TABLE public.telegram_otp_codes ENABLE ROW LEVEL SECURITY;

-- Create policy for telegram_otp_codes - anyone can insert (for registration)
CREATE POLICY "Anyone can create OTP codes" 
ON public.telegram_otp_codes 
FOR INSERT 
WITH CHECK (true);

-- Create policy for reading OTP codes (for verification)
CREATE POLICY "Anyone can read their own OTP codes" 
ON public.telegram_otp_codes 
FOR SELECT 
USING (true);

-- Create policy for updating OTP codes (marking as used)
CREATE POLICY "Anyone can update OTP codes" 
ON public.telegram_otp_codes 
FOR UPDATE 
USING (true);

-- Create index for OTP lookups
CREATE INDEX idx_telegram_otp_phone_code ON public.telegram_otp_codes(phone_number, otp_code);
CREATE INDEX idx_telegram_otp_expires ON public.telegram_otp_codes(expires_at);