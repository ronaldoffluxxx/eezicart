'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { useCart } from '@/lib/hooks/useCart';

const createSettingsPage = (title: string, content: string) => {
    return function SettingsPage() {
        const router = useRouter();
        const { cart } = useCart();

        return (
            <div className="min-h-screen bg-gray-50">
                <Header cartItemCount={cart.itemCount} showSearch={false} />
                <div className="bg-white border-b px-4 py-3 sticky top-[72px] z-30">
                    <div className="flex items-center">
                        <button onClick={() => router.back()} className="mr-3 p-2 hover:bg-gray-100 rounded-full">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
                    </div>
                </div>
                <main className="pb-20 p-4">
                    <p className="text-gray-600">{content}</p>
                </main>
                <BottomNav />
            </div>
        );
    };
};

export default createSettingsPage('Privacy & Security', 'Privacy and security settings will be available soon.');
