-- Create email OTP codes table
CREATE TABLE public.email_otp_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_number TEXT NOT NULL,
  email TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  used BOOLEAN NOT NULL DEFAULT false,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + '00:05:00'::interval),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.email_otp_codes ENABLE ROW LEVEL SECURITY;

-- Create policies for email OTP codes
CREATE POLICY "Anyone can create email OTP codes" 
ON public.email_otp_codes 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can read their own email OTP codes" 
ON public.email_otp_codes 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can update email OTP codes" 
ON public.email_otp_codes 
FOR UPDATE 
USING (true);

-- Make email field required in patients table
ALTER TABLE public.patients ALTER COLUMN email SET NOT NULL;

-- Remove telegram-related columns from patients table
ALTER TABLE public.patients DROP COLUMN IF EXISTS telegram_username;
ALTER TABLE public.patients DROP COLUMN IF EXISTS telegram_chat_id;

-- Drop telegram OTP table as we won't need it
DROP TABLE IF EXISTS public.telegram_otp_codes;