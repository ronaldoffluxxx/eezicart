'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Phone, Mail, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { useCart } from '@/lib/hooks/useCart';
import { useToast } from '@/components/ToastProvider';
import { safeLocalStorageGet } from '@/lib/utils/safeStorage';
import type { User as UserType } from '@/lib/types';

export default function EditProfilePage() {
    const router = useRouter();
    const { cart } = useCart();
    const { showToast } = useToast();
    const [user, setUser] = useState<UserType | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        locationState: '',
        locationCity: '',
    });

    useEffect(() => {
        const currentUser = safeLocalStorageGet<UserType>('currentUser');
        if (currentUser) {
            setUser(currentUser);
            setFormData({
                name: currentUser.name,
                phone: currentUser.phone,
                email: currentUser.email,
                locationState: currentUser.location?.state || '',
                locationCity: currentUser.location?.city || '',
            });
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Update user profile
        showToast('Profile update functionality will be implemented with Supabase', 'info');
        router.back();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header cartItemCount={cart.itemCount} showSearch={false} />

            <div className="bg-white border-b px-4 py-3 sticky top-[72px] z-30">
                <div className="flex items-center">
                    <button onClick={() => router.back()} className="mr-3 p-2 hover:bg-gray-100 rounded-full">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">Edit Profile</h1>
                </div>
            </div>

            <main className="pb-20">
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Your name"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Phone number"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Email address"
                                disabled
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                    >
                        Save Changes
                    </button>
                </form>
            </main>

            <BottomNav />
        </div>
    );
}

