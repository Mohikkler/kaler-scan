import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  emailLogin: (phone: string, email: string) => Promise<{ error: string | null }>;
  verifyOtp: (phone: string, otp: string) => Promise<{ error: string | null }>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check if user is admin
        if (session?.user) {
          const { data } = await supabase
            .from('admin_users')
            .select('id')
            .eq('user_id', session.user.id)
            .maybeSingle();
          setIsAdmin(!!data);
        } else {
          setIsAdmin(false);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const emailLogin = async (phone: string, email: string) => {
    try {
      const response = await supabase.functions.invoke('email-otp', {
        body: {
          action: 'send_otp',
          phone: phone,
          email: email
        }
      });

      if (response.error) {
        throw response.error;
      }

      const { data } = response;
      if (!data.success) {
        throw new Error(data.error || 'Failed to send OTP');
      }

      toast.success('OTP sent to your email address');
      return { error: null };
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to send OTP';
      toast.error(errorMessage);
      return { error: errorMessage };
    }
  };

  const verifyOtp = async (phone: string, otp: string) => {
    try {
      const response = await supabase.functions.invoke('email-otp', {
        body: {
          action: 'verify_otp',
          phone: phone,
          otp: otp
        }
      });

      if (response.error) {
        throw response.error;
      }

      const { data } = response;
      if (!data.success) {
        throw new Error(data.error || 'Invalid OTP');
      }

      // Store phone in local storage for RLS policies
      localStorage.setItem('current_phone', phone);
      
      toast.success('Successfully logged in');
      return { error: null };
    } catch (error: any) {
      const errorMessage = error.message || 'Invalid OTP';
      toast.error(errorMessage);
      return { error: errorMessage };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      localStorage.removeItem('current_phone');
      toast.success('Logged out successfully');
    } catch (error: any) {
      toast.error('Error logging out');
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signOut,
      emailLogin,
      verifyOtp,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}