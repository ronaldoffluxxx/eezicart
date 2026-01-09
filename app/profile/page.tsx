'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User as UserIcon, ArrowLeft, LogOut, MapPin, Phone, Mail } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { useCart } from '@/lib/hooks/useCart';
import { safeLocalStorageGet } from '@/lib/utils/safeStorage';
import type { User } from '@/lib/types';

export default function ProfilePage() {
    const router = useRouter();
    const { cart } = useCart();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Load current user
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            router.push('/login');
            return;
        }

        const currentUser = safeLocalStorageGet<User>('currentUser');
        if (currentUser) {
            setUser(currentUser);
        } else {
            // Fallback: try to find user by ID from token
            const users = safeLocalStorageGet<User[]>('users', []);
            if (users && users.length > 0) {
                // Extract user ID from mock token (format: mock_jwt_{userId}_{timestamp})
                const parts = authToken.split('_');
                if (parts.length >= 3) {
                    const userId = parts[2];
                    const currentUser = users.find(u => u.id === userId);
                    if (currentUser) {
                        setUser(currentUser);
                        localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    }
                }
            }
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        router.push('/login');
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-600">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
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
                    <h1 className="text-xl font-bold text-gray-900">Profile</h1>
                </div>
            </div>

            <main className="pb-20">
                {/* Profile Header */}
                <div className="bg-white px-4 py-6 mb-2">
                    <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                            <UserIcon className="w-10 h-10 text-white" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                            <p className="text-sm text-gray-600 capitalize">{user.userType}</p>
                        </div>
                    </div>
                </div>

                {/* User Info */}
                <div className="bg-white px-4 py-4 mb-2">
                    <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <Mail className="w-5 h-5 text-gray-400 mr-3" />
                            <div>
                                <p className="text-sm text-gray-600">Email</p>
                                <p className="font-medium text-gray-900">{user.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Phone className="w-5 h-5 text-gray-400 mr-3" />
                            <div>
                                <p className="text-sm text-gray-600">Phone</p>
                                <p className="font-medium text-gray-900">{user.phone}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                            <div>
                                <p className="text-sm text-gray-600">Location</p>
                                <p className="font-medium text-gray-900">
                                    {user.location?.city || 'City not set'}, {user.location?.state || 'State not set'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Menu Items */}
                <div className="bg-white px-4 py-2 mb-2">
                    <button
                        onClick={() => router.push('/profile/edit')}
                        className="w-full flex items-center justify-between py-4 border-b border-gray-100"
                    >
                        <span className="text-gray-900">Edit Profile</span>
                        <span className="text-gray-400">›</span>
                    </button>
                    <button
                        onClick={() => router.push('/profile/addresses')}
                        className="w-full flex items-center justify-between py-4 border-b border-gray-100"
                    >
                        <span className="text-gray-900">Saved Addresses</span>
                        <span className="text-gray-400">›</span>
                    </button>
                    <button
                        onClick={() => router.push('/profile/payment-methods')}
                        className="w-full flex items-center justify-between py-4 border-b border-gray-100"
                    >
                        <span className="text-gray-900">Payment Methods</span>
                        <span className="text-gray-400">›</span>
                    </button>
                    <button
                        onClick={() => router.push('/settings')}
                        className="w-full flex items-center justify-between py-4"
                    >
                        <span className="text-gray-900">Settings</span>
                        <span className="text-gray-400">›</span>
                    </button>
                </div>

                {/* Logout Button */}
                <div className="px-4 py-4">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </main>

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    );
}
