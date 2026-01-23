import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Mail, Lock, Loader2 } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('super@agro.gov.az');
    const [password, setPassword] = useState(''); // Mock password
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState<'LOGIN' | 'OTP'>('LOGIN');
    const [otp, setOtp] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setStep('OTP');
            setIsLoading(false);
        }, 1000);
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(async () => {
            const success = await login(email);
            if (success) {
                navigate('/dashboard');
            } else {
                alert('Invalid credentials');
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-lg border-t-4 border-t-primary-600">
                <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                        <Lock className="w-6 h-6 text-primary-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">
                        {step === 'LOGIN' ? 'Sisteme Giriş' : 'Təhlükəsizlik Kodu'}
                    </CardTitle>
                    <p className="text-sm text-gray-500 mt-2">
                        {step === 'LOGIN'
                            ? 'Kənd Təsərrüfatı Nazirliyi Arxiv Platforması'
                            : `${email} ünvanına göndərilmiş 6 rəqəmli kodu daxil edin`}
                    </p>
                </CardHeader>
                <CardContent>
                    {step === 'LOGIN' ? (
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">E-mail ünvanı</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                    <Input
                                        type="email"
                                        placeholder="name@agro.gov.az"
                                        className="pl-10"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Şifrə</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <a href="#" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                                        Şifrəni unutmusunuz?
                                    </a>
                                </div>
                            </div>
                            <Button type="submit" className="w-full bg-primary-600 hover:bg-primary-700" disabled={isLoading}>
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Daxil ol'}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">OTP Kod</label>
                                <Input
                                    type="text"
                                    placeholder="123456"
                                    className="text-center text-lg tracking-widest"
                                    maxLength={6}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full bg-primary-600 hover:bg-primary-700" disabled={isLoading}>
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Təsdiqlə'}
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
                                className="w-full"
                                onClick={() => setStep('LOGIN')}
                            >
                                Geri qayıt
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>

            <div className="absolute bottom-4 text-center text-xs text-gray-400">
                &copy; 2026 Kənd Təsərrüfatı Nazirliyi. All rights reserved.
            </div>
        </div>
    );
}
