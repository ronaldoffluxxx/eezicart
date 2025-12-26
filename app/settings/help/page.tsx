'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Mail, Phone, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { useCart } from '@/lib/hooks/useCart';

export default function HelpPage() {
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
                    <h1 className="text-xl font-bold text-gray-900">Help & Support</h1>
                </div>
            </div>
            <main className="pb-20 p-4 space-y-4">
                <div className="bg-white rounded-lg p-4">
                    <h2 className="font-semibold text-gray-900 mb-4">Contact Us</h2>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-primary" />
                            <span className="text-gray-700">support@eezicart.com</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-primary" />
                            <span className="text-gray-700">+234 800 000 0000</span>
                        </div>
                    </div>
                </div>
            </main>
            <BottomNav />
        </div>
    );
}
