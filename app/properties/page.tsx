'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, SlidersHorizontal, Home } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import PropertyCard from '@/components/PropertyCard';
import EmptyState from '@/components/EmptyState';
import { useCart } from '@/lib/hooks/useCart';
import { safeLocalStorageGet } from '@/lib/utils/safeStorage';
import type { Property } from '@/lib/types';

export default function PropertiesPage() {
    const router = useRouter();
    const { cart } = useCart();

    const [properties, setProperties] = useState<Property[]>([]);
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        // Load properties
        const allProperties = safeLocalStorageGet<Property[]>('properties', []);
        if (allProperties) {
            setProperties(allProperties);
        }
    }, []);

    // Sort properties
    useEffect(() => {
        let sorted = [...properties];

        switch (sortBy) {
            case 'price-low':
                sorted.sort((a, b) => a.pricing.monthly - b.pricing.monthly);
                break;
            case 'price-high':
                sorted.sort((a, b) => b.pricing.monthly - a.pricing.monthly);
                break;
            case 'newest':
            default:
                sorted.sort((a, b) => b.createdAt - a.createdAt);
                break;
        }

        setProperties(sorted);
    }, [sortBy]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header cartItemCount={cart.itemCount} />

            {/* Page Header */}
            <div className="bg-white border-b sticky top-[72px] z-30">
                <div className="px-4 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <button
                                onClick={() => router.back()}
                                className="mr-3 p-2 hover:bg-gray-100 rounded-full"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <h1 className="text-xl font-bold text-gray-900">Properties</h1>
                        </div>
                        <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <SlidersHorizontal className="w-4 h-4" />
                            <span className="text-sm">Filters</span>
                        </button>
                    </div>

                    {/* Sort Options */}
                    <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                        <button
                            onClick={() => setSortBy('newest')}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${sortBy === 'newest'
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Newest
                        </button>
                        <button
                            onClick={() => setSortBy('price-low')}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${sortBy === 'price-low'
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Price: Low to High
                        </button>
                        <button
                            onClick={() => setSortBy('price-high')}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${sortBy === 'price-high'
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Price: High to Low
                        </button>
                    </div>
                </div>
            </div>

            {/* Properties List */}
            <main className="pb-20">
                {properties.length > 0 ? (
                    <div className="px-4 py-4">
                        <p className="text-sm text-gray-600 mb-4">
                            {properties.length} {properties.length === 1 ? 'property' : 'properties'} found
                        </p>
                        <div className="space-y-4">
                            {properties.map((property) => (
                                <PropertyCard key={property.id} property={property} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <EmptyState
                        icon={Home}
                        title="No properties found"
                        description="We couldn't find any properties. Check back later for new listings."
                        actionLabel="Go Home"
                        onAction={() => router.push('/home')}
                    />
                )}
            </main>

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    );
}
