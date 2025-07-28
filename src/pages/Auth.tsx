import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useAuth } from '@/hooks/useAuth';
import { Phone, Shield, ArrowLeft, Send } from 'lucide-react';

export default function Auth() {
  const [phone, setPhone] = useState('');
  const [telegramUsername, setTelegramUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const { phoneLogin, verifyOtp } = useAuth();
  const navigate = useNavigate();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || !telegramUsername.trim()) return;

    setLoading(true);
    const { error } = await phoneLogin(phone, telegramUsername);
    setLoading(false);

    if (!error) {
      setStep('otp');
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;

    setLoading(true);
    const { error } = await verifyOtp(phone, otp);
    setLoading(false);

    if (!error) {
      navigate('/reports');
    }
  };

  const resetForm = () => {
    setStep('phone');
    setPhone('');
    setTelegramUsername('');
    setOtp('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Patient Login</CardTitle>
          <CardDescription>
            Access your test reports securely with Telegram authentication
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 'phone' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
               <div className="space-y-2">
                 <Label htmlFor="phone">Phone Number</Label>
                 <div className="relative">
                   <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                   <Input
                     id="phone"
                     type="tel"
                     placeholder="+91 98765 43210"
                     value={phone}
                     onChange={(e) => setPhone(e.target.value)}
                     className="pl-10"
                     required
                   />
                 </div>
               </div>
               <div className="space-y-2">
                 <Label htmlFor="telegram">Telegram Username</Label>
                 <div className="relative">
                   <Send className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                   <Input
                     id="telegram"
                     type="text"
                     placeholder="@your_username"
                     value={telegramUsername}
                     onChange={(e) => setTelegramUsername(e.target.value)}
                     className="pl-10"
                     required
                   />
                 </div>
                  <p className="text-sm text-muted-foreground">
                    First, start a conversation with @kalerscanbot on Telegram, then enter your username here. We'll send your OTP completely free!
                  </p>
               </div>
               <Button type="submit" className="w-full" disabled={loading || !phone.trim() || !telegramUsername.trim()}>
                 {loading ? 'Sending OTP...' : 'Send OTP via Telegram'}
               </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-2">
                <Label>Enter OTP</Label>
                 <p className="text-sm text-muted-foreground">
                   Enter the 6-digit code sent to @{telegramUsername} on Telegram
                 </p>
                <div className="flex justify-center">
                  <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
              <div className="space-y-2">
                <Button type="submit" className="w-full" disabled={loading || otp.length !== 6}>
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="w-full" 
                  onClick={resetForm}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Change Phone Number
                </Button>
              </div>
            </form>
          )}

          <div className="text-center pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Having trouble? Contact us at{' '}
              <a href="tel:+919876543210" className="text-primary hover:underline">
                +91 98765 43210
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}