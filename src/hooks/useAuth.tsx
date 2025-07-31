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
  isLoggedIn: () => boolean;
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

  // Check if user is logged in based on phone number in localStorage
  const isLoggedIn = () => {
    return localStorage.getItem('current_phone') !== null;
  };

  const emailLogin = async (phone: string, email: string) => {
    console.log('EmailLogin called with:', phone, email);
    try {
      const response = await fetch('http://localhost:4000/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phone,
          email: email
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send OTP');
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to send OTP');
      }

      toast.success('OTP sent to your email address');
      return { error: null };
    } catch (error: unknown) {
      console.error('Error during OTP sending:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to send OTP';
      toast.error(errorMessage);
      return { error: errorMessage };
    }
  };

  const verifyOtp = async (phone: string, otp: string) => {
    try {
      const response = await fetch('http://localhost:4000/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phone,
          otp: otp
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid OTP');
      }

      if (!data.success) {
        throw new Error(data.error || 'Invalid OTP');
      }

      // Store phone in local storage for RLS policies
      localStorage.setItem('current_phone', phone);
      
      toast.success('Successfully logged in');
      return { error: null };
    } catch (error: unknown) {
      console.error('Error during OTP verification:', error);
      const errorMessage = error instanceof Error ? error.message : 'Invalid OTP';
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
    } catch (error: unknown) {
      console.error('Error during logout:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to logout';
      toast.error(errorMessage);
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
      isAdmin,
      isLoggedIn
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