'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { signIn } from '@/lib/supabase/auth';

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { user, session, error: authError } = await signIn(formData.email, formData.password);

            if (authError) {
                setError(authError);
                setLoading(false);
                return;
            }

            if (!user) {
                setError('Login failed. Please try again.');
                setLoading(false);
                return;
            }

            // Get user profile to determine user type
            const { getUserProfile } = await import('@/lib/supabase/auth');
            const { profile, error: profileError } = await getUserProfile(user.id);

            if (profileError || !profile) {
                // If profile fetch fails, try to use user metadata or fail gracefully
                console.error('Error fetching profile:', profileError);
            }

            // Store current user in localStorage for quick access
            // NOTE: We only use the location from the profile. 
            // If it's missing, 'Home' will handle it (showing all products or prompting selection).
            localStorage.setItem('currentUser', JSON.stringify({
                id: user.id,
                email: user.email,
                userType: profile?.user_type || 'tenant',
                name: profile?.full_name || profile?.name || 'User',
                phone: profile?.phone,
                walletBalance: profile?.wallet_balance || 0,
                location: {
                    state: profile?.location_state || '',
                    city: profile?.location_city || '',
                },
                avatar: profile?.avatar_url || null,
                businessName: profile?.business_name,
                status: profile?.status,
            }));

            // CRITICAL: Set authToken to prevent redirect loop
            if (session) {
                localStorage.setItem('authToken', session.access_token);
            }

            if (rememberMe) {
                localStorage.setItem('rememberMe', 'true');
            }

            // Navigate based on user type
            if (profile?.user_type === 'admin') {
                router.push('/admin');
            } else {
                router.push('/home');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex flex-col relative"
            style={{
                background: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 50%, #FCA5A5 100%)',
            }}
        >
            {/* Decorative pattern overlay */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23DC2626\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex-1 flex flex-col justify-center px-4 py-12">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <Image
                        src="/logo-transparent.png"
                        alt="EeziCart"
                        width={200}
                        height={200}
                        className="w-auto h-32"
                        priority
                    />
                </div>

                {/* Login Card */}
                <div className="max-w-md w-full mx-auto">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Welcome Back</h1>
                        <p className="text-gray-600 text-center mb-8">Sign in to continue to EeziCart</p>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-600 text-sm">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                    />
                                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                </label>
                                <Link href="/forgot-password" className="text-sm text-primary hover:text-primary-dark">
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>

                        {/* Sign Up Link */}
                        <p className="mt-6 text-center text-gray-600">
                            Don't have an account?{' '}
                            <Link href="/register" className="text-primary font-semibold hover:text-primary-dark">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
