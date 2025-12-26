'use client';

import { useRouter } from 'next/navigation';
import { Package, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import EmptyState from '@/components/EmptyState';
import { useCart } from '@/lib/hooks/useCart';

export default function OrdersPage() {
    const router = useRouter();
    const { cart } = useCart();

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
                    <h1 className="text-xl font-bold text-gray-900">My Orders</h1>
                </div>
            </div>

            <main className="pb-20">
                <EmptyState
                    icon={Package}
                    title="No orders yet"
                    description="You haven't placed any orders yet. Start shopping to see your orders here."
                    actionLabel="Start Shopping"
                    onAction={() => router.push('/products')}
                />
            </main>

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    );
}
