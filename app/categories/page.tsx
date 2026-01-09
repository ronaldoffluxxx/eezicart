'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Package } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { useCart } from '@/lib/hooks/useCart';
import { safeLocalStorageGet } from '@/lib/utils/safeStorage';
import { PRODUCT_CATEGORIES } from '@/lib/constants/data';
import type { Product } from '@/lib/types';

export default function CategoriesPage() {
    const router = useRouter();
    const { cart } = useCart();
    const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});

    useEffect(() => {
        const products = safeLocalStorageGet<Product[]>('products', []);
        if (products) {
            const counts: Record<string, number> = {};

            products.forEach(product => {
                counts[product.category] = (counts[product.category] || 0) + 1;
            });

            setCategoryCounts(counts);
        }
    }, []);

    const categoryIcons: Record<string, string> = {
        fashion: '👔',
        electronics: '📱',
        sports: '⚽',
        home: '🏠',
        beauty: '💄',
        books: '📚',
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header cartItemCount={cart.itemCount} showSearch={false} />

            <div className="bg-white border-b px-4 py-3 sticky top-[72px] z-30">
                <div className="flex items-center">
                    <button onClick={() => router.back()} className="mr-3 p-2 hover:bg-gray-100 rounded-full">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">Categories</h1>
                </div>
            </div>

            <main className="pb-20 p-4">
                <div className="grid grid-cols-2 gap-4">
                    {PRODUCT_CATEGORIES.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => router.push(`/products?category=${category.id}`)}
                            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center"
                        >
                            <div className="text-4xl mb-3">{categoryIcons[category.id] || '📦'}</div>
                            <h3 className="font-semibold text-gray-900 mb-1 capitalize">{category.name}</h3>
                            <p className="text-sm text-gray-500">
                                {categoryCounts[category.id] || 0} products
                            </p>
                        </button>
                    ))}
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
