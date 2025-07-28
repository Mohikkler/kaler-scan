-- Create custom types
CREATE TYPE public.appointment_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
CREATE TYPE public.report_status AS ENUM ('pending', 'ready', 'delivered');
CREATE TYPE public.service_type AS ENUM ('ultrasound_3d_4d', 'color_doppler', 'general_ultrasound', 'ecg', 'x_ray', 'consultation');

-- Create patients table for phone-based authentication
CREATE TABLE public.patients (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    phone_number TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    email TEXT,
    age INTEGER,
    gender TEXT,
    emergency_contact TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create appointments table
CREATE TABLE public.appointments (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    appointment_id TEXT NOT NULL UNIQUE,
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    service_type service_type NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_time TIME NOT NULL,
    status appointment_status NOT NULL DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create reports table
CREATE TABLE public.reports (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    report_id TEXT NOT NULL UNIQUE,
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES public.appointments(id),
    test_type TEXT NOT NULL,
    status report_status NOT NULL DEFAULT 'pending',
    file_url TEXT,
    file_name TEXT,
    report_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin users table
CREATE TABLE public.admin_users (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.admin_users 
        WHERE user_id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get patient by phone
CREATE OR REPLACE FUNCTION public.get_patient_by_phone(phone TEXT)
RETURNS UUID AS $$
BEGIN
    RETURN (SELECT id FROM public.patients WHERE phone_number = phone LIMIT 1);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to generate appointment ID
CREATE OR REPLACE FUNCTION public.generate_appointment_id()
RETURNS TEXT AS $$
DECLARE
    new_id TEXT;
BEGIN
    new_id := 'KSC' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD((EXTRACT(EPOCH FROM NOW())::BIGINT % 10000)::TEXT, 4, '0');
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- Create function to generate report ID
CREATE OR REPLACE FUNCTION public.generate_report_id()
RETURNS TEXT AS $$
DECLARE
    new_id TEXT;
BEGIN
    new_id := 'RPT' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD((EXTRACT(EPOCH FROM NOW())::BIGINT % 10000)::TEXT, 4, '0');
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic ID generation
CREATE OR REPLACE FUNCTION public.set_appointment_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.appointment_id IS NULL OR NEW.appointment_id = '' THEN
        NEW.appointment_id := public.generate_appointment_id();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.set_report_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.report_id IS NULL OR NEW.report_id = '' THEN
        NEW.report_id := public.generate_report_id();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
CREATE TRIGGER set_appointment_id_trigger
    BEFORE INSERT ON public.appointments
    FOR EACH ROW EXECUTE FUNCTION public.set_appointment_id();

CREATE TRIGGER set_report_id_trigger
    BEFORE INSERT ON public.reports
    FOR EACH ROW EXECUTE FUNCTION public.set_report_id();

CREATE TRIGGER update_patients_updated_at
    BEFORE UPDATE ON public.patients
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
    BEFORE UPDATE ON public.appointments
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reports_updated_at
    BEFORE UPDATE ON public.reports
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies for patients table
CREATE POLICY "Patients can view their own data" ON public.patients
    FOR SELECT USING (phone_number = current_setting('app.current_phone', true));

CREATE POLICY "Admins can view all patients" ON public.patients
    FOR SELECT USING (public.is_admin());

CREATE POLICY "Anyone can create patient profiles" ON public.patients
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Patients can update their own data" ON public.patients
    FOR UPDATE USING (phone_number = current_setting('app.current_phone', true));

CREATE POLICY "Admins can update all patients" ON public.patients
    FOR UPDATE USING (public.is_admin());

-- RLS Policies for appointments table
CREATE POLICY "Patients can view their own appointments" ON public.appointments
    FOR SELECT USING (
        patient_id IN (
            SELECT id FROM public.patients 
            WHERE phone_number = current_setting('app.current_phone', true)
        )
    );

CREATE POLICY "Admins can view all appointments" ON public.appointments
    FOR SELECT USING (public.is_admin());

CREATE POLICY "Anyone can create appointments" ON public.appointments
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can update all appointments" ON public.appointments
    FOR UPDATE USING (public.is_admin());

-- RLS Policies for reports table
CREATE POLICY "Patients can view their own reports" ON public.reports
    FOR SELECT USING (
        patient_id IN (
            SELECT id FROM public.patients 
            WHERE phone_number = current_setting('app.current_phone', true)
        )
    );

CREATE POLICY "Admins can view all reports" ON public.reports
    FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can manage all reports" ON public.reports
    FOR ALL USING (public.is_admin());

-- RLS Policies for admin_users table
CREATE POLICY "Admins can view admin users" ON public.admin_users
    FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can manage admin users" ON public.admin_users
    FOR ALL USING (public.is_admin());

-- Create indexes for better performance
CREATE INDEX idx_patients_phone ON public.patients(phone_number);
CREATE INDEX idx_appointments_patient_id ON public.appointments(patient_id);
CREATE INDEX idx_appointments_date ON public.appointments(preferred_date);
CREATE INDEX idx_reports_patient_id ON public.reports(patient_id);
CREATE INDEX idx_admin_users_user_id ON public.admin_users(user_id);