'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Bell, Shield, HelpCircle, FileText, Globe } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { useCart } from '@/lib/hooks/useCart';

export default function SettingsPage() {
    const router = useRouter();
    const { cart } = useCart();

    const settingsOptions = [
        { icon: Bell, label: 'Notifications', description: 'Manage notification preferences', path: '/settings/notifications' },
        { icon: Shield, label: 'Privacy & Security', description: 'Control your privacy settings', path: '/settings/privacy' },
        { icon: Globe, label: 'Language', description: 'Change app language', path: '/settings/language' },
        { icon: HelpCircle, label: 'Help & Support', description: 'Get help or contact support', path: '/settings/help' },
        { icon: FileText, label: 'Terms & Conditions', description: 'Read our terms', path: '/settings/terms' },
        { icon: FileText, label: 'Privacy Policy', description: 'Read our privacy policy', path: '/settings/privacy-policy' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header cartItemCount={cart.itemCount} showSearch={false} />

            {/* Page Header */}
            <div className="bg-white border-b px-4 py-3 sticky top-[72px] z-30">
                <div className="flex items-center">
                    <button
                        onClick={() => router.back()}
                        className="mr-3 p-2 hover:bg-gray-100 rounded-full"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">Settings</h1>
                </div>
            </div>

            <main className="pb-20">
                {/* Settings Options */}
                <div className="bg-white mt-2">
                    {settingsOptions.map((option, index) => {
                        const Icon = option.icon;
                        return (
                            <button
                                key={option.path}
                                onClick={() => router.push(option.path)}
                                className={`w-full flex items-center px-4 py-4 hover:bg-gray-50 transition-colors ${index !== settingsOptions.length - 1 ? 'border-b border-gray-100' : ''
                                    }`}
                            >
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                                    <Icon className="w-5 h-5 text-gray-600" />
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="font-medium text-gray-900">{option.label}</p>
                                    <p className="text-sm text-gray-500">{option.description}</p>
                                </div>
                                <span className="text-gray-400">›</span>
                            </button>
                        );
                    })}
                </div>

                {/* App Info */}
                <div className="px-4 py-6 text-center">
                    <p className="text-sm text-gray-500">EeziCart v1.0.0</p>
                    <p className="text-xs text-gray-400 mt-1">© 2025 EeziCart. All rights reserved.</p>
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
