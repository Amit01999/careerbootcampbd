
import { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Mail, Lock, User, Phone } from 'lucide-react';
import { toast } from 'sonner';
import logo from '@/assets/logo.png';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const defaultMode =
    searchParams.get('mode') === 'signup' ? 'signup' : 'login';

  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = await login({ email: loginData.email, password: loginData.password });
      const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';
      navigate(isAdmin ? '/admin' : '/dashboard');
    } catch (error) {
      console.error(error);
      toast.error('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (signupData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    const phoneRegex = /^(\+8801|01)[3-9]\d{8}$/;
    if (!phoneRegex.test(signupData.phone)) {
      toast.error('Enter a valid Bangladeshi phone number');
      return;
    }

    const nameParts = signupData.name.trim().split(' ');
    if (nameParts.length < 2) {
      toast.error('Enter full name (first & last)');
      return;
    }

    setIsLoading(true);
    try {
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ');
      await register({
        firstName,
        lastName,
        email: signupData.email,
        phone: signupData.phone,
        password: signupData.password,
      });
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      toast.error('Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div className="min-h-screen flex items-start justify-center p-4 pt-20 bg-[#0A0A0C] mt-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
         <div className="flex items-center justify-center">
          <img src={logo} alt="Logo" className="w-12 h-12" />
         </div>
          <span className="text-2xl font-bold text-white tracking-tight">Private Bank Bootcamp</span>
          <p className="mt-2 text-[#D4AF5A]/80">
            Start your journey to success
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue={defaultMode} className="w-full">
          <TabsList
            className="
    grid grid-cols-2
    bg-[#1A1A1A] border border-[#333]
    rounded-xl
    p-1
    mb-6
    transition-all duration-300
  "
          >
            <TabsTrigger
              value="login"
              className="
      text-white/70
      data-[state=active]:bg-[#A7823D]
      data-[state=active]:text-white
      data-[state=active]:rounded-lg
      transition-all duration-300
    "
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="
      text-white/70
      data-[state=active]:bg-[#A7823D]
      data-[state=active]:text-white
      data-[state=active]:rounded-lg
      transition-all duration-300
    "
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          {/* Login */}
          <TabsContent value="login">
            <Card className="bg-[#111] border border-[#333] shadow-xl rounded-xl">
              <CardHeader>
                <CardTitle className="text-white">Welcome Back</CardTitle>
                <CardDescription className="text-[#D4AF5A]/70">
                  Login to continue practicing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-white/80">
                      Email or Phone
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-[#D4AF5A]/70" />
                      <Input
                        id="login-email"
                        type="text"
                        placeholder="Enter email or phone"
                        className="pl-10 bg-[#1A1A1A] text-white border border-[#333] focus:border-[#A7823D] rounded-lg"
                        value={loginData.email}
                        onChange={e =>
                          setLoginData({ ...loginData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-white/80">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-[#D4AF5A]/70" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Enter password"
                        className="pl-10 bg-[#1A1A1A] text-white border border-[#333] focus:border-[#A7823D] rounded-lg"
                        value={loginData.password}
                        onChange={e =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#A7823D] hover:bg-[#D4AF5A] rounded-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging in...' : 'Login'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Signup */}
          <TabsContent value="signup">
            <Card className="bg-[#111] border border-[#333] shadow-xl rounded-xl ">
              <CardHeader>
                <CardTitle className="text-white">Create Account</CardTitle>
                <CardDescription className="text-[#D4AF5A]/70">
                  Join thousands of students preparing for their dream bank job
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="text-white/80">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-[#D4AF5A]/70" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="John Doe"
                        className="pl-10 bg-[#1A1A1A] text-white border border-[#333] focus:border-[#A7823D] rounded-lg"
                        value={signupData.name}
                        onChange={e =>
                          setSignupData({ ...signupData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-white/80">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-[#D4AF5A]/70" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10 bg-[#1A1A1A] text-white border border-[#333] focus:border-[#A7823D] rounded-lg"
                        value={signupData.email}
                        onChange={e =>
                          setSignupData({
                            ...signupData,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-phone" className="text-white/80">
                      Phone
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-[#D4AF5A]/70" />
                      <Input
                        id="signup-phone"
                        type="tel"
                        placeholder="01712345678"
                        className="pl-10 bg-[#1A1A1A] text-white border border-[#333] focus:border-[#A7823D] rounded-lg"
                        value={signupData.phone}
                        onChange={e =>
                          setSignupData({
                            ...signupData,
                            phone: e.target.value,
                          })
                        }
                        required
                        pattern="(\+8801|01)[3-9]\d{8}"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-white/80">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-[#D4AF5A]/70" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Min. 8 characters"
                        className="pl-10 bg-[#1A1A1A] text-white border border-[#333] focus:border-[#A7823D] rounded-lg"
                        value={signupData.password}
                        onChange={e =>
                          setSignupData({
                            ...signupData,
                            password: e.target.value,
                          })
                        }
                        required
                        minLength={8}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="signup-confirm-password"
                      className="text-white/80"
                    >
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-[#D4AF5A]/70" />
                      <Input
                        id="signup-confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        className="pl-10 bg-[#1A1A1A] text-white border border-[#333] focus:border-[#A7823D] rounded-lg"
                        value={signupData.confirmPassword}
                        onChange={e =>
                          setSignupData({
                            ...signupData,
                            confirmPassword: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#A7823D] hover:bg-[#D4AF5A] rounded-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating...' : 'Sign Up'}
                  </Button>

                  <p className="text-xs text-center text-[#D4AF5A]/70 mt-2">
                    By signing up, you agree to our Terms of Service and Privacy
                    Policy
                  </p>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
