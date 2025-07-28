-- Fix security warnings by setting proper search paths for all functions

-- Update is_admin function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.admin_users 
        WHERE user_id = auth.uid()
    );
END;
$$;

-- Update get_patient_by_phone function
CREATE OR REPLACE FUNCTION public.get_patient_by_phone(phone TEXT)
RETURNS UUID 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN (SELECT id FROM public.patients WHERE phone_number = phone LIMIT 1);
END;
$$;

-- Update generate_appointment_id function
CREATE OR REPLACE FUNCTION public.generate_appointment_id()
RETURNS TEXT 
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
    new_id TEXT;
BEGIN
    new_id := 'KSC' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD((EXTRACT(EPOCH FROM NOW())::BIGINT % 10000)::TEXT, 4, '0');
    RETURN new_id;
END;
$$;

-- Update generate_report_id function
CREATE OR REPLACE FUNCTION public.generate_report_id()
RETURNS TEXT 
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
    new_id TEXT;
BEGIN
    new_id := 'RPT' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD((EXTRACT(EPOCH FROM NOW())::BIGINT % 10000)::TEXT, 4, '0');
    RETURN new_id;
END;
$$;

-- Update set_appointment_id function
CREATE OR REPLACE FUNCTION public.set_appointment_id()
RETURNS TRIGGER 
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
    IF NEW.appointment_id IS NULL OR NEW.appointment_id = '' THEN
        NEW.appointment_id := public.generate_appointment_id();
    END IF;
    RETURN NEW;
END;
$$;

-- Update set_report_id function
CREATE OR REPLACE FUNCTION public.set_report_id()
RETURNS TRIGGER 
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
    IF NEW.report_id IS NULL OR NEW.report_id = '' THEN
        NEW.report_id := public.generate_report_id();
    END IF;
    RETURN NEW;
END;
$$;

-- Update update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;