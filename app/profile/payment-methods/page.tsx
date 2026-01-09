'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { useCart } from '@/lib/hooks/useCart';

export default function PaymentMethodsPage() {
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
                    <h1 className="text-xl font-bold text-gray-900">Payment Methods</h1>
                </div>
            </div>

            <main className="pb-20 p-4">
                <div className="text-center py-12">
                    <p className="text-gray-500">No payment methods saved</p>
                    <button className="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark">
                        Add Payment Method
                    </button>
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
