'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Car, Home, Wallet } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import ProductCard from '@/components/ProductCard';
import PropertyCard from '@/components/PropertyCard';
import { safeLocalStorageGet } from '@/lib/utils/safeStorage';
import type { Product, Property } from '@/lib/types';

export default function PaySmallSmallPage() {
    const router = useRouter();
    const [vehicles, setVehicles] = useState<Product[]>([]);
    const [properties, setProperties] = useState<Property[]>([]);
    const [activeTab, setActiveTab] = useState<'all' | 'vehicles' | 'properties'>('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = () => {
            // Load products and filter for vehicles
            const allProducts = safeLocalStorageGet<Product[]>('products', []) || [];
            const vehicleProducts = allProducts.filter(p => p.category === 'vehicles');
            setVehicles(vehicleProducts);

            // Load properties
            const allProperties = safeLocalStorageGet<Property[]>('properties', []) || [];
            setProperties(allProperties);

            setLoading(false);
        };

        loadData();
    }, []);

    const filteredItems = () => {
        if (activeTab === 'vehicles') return { vehicles, properties: [] };
        if (activeTab === 'properties') return { vehicles: [], properties };
        return { vehicles, properties };
    };

    const { vehicles: showVehicles, properties: showProperties } = filteredItems();

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="pb-20">
                {/* Hero Section */}
                <div className="bg-primary px-4 py-8 text-white">
                    <div className="flex items-center mb-4">
                        <button
                            onClick={() => router.back()}
                            className="mr-3 p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <h1 className="text-2xl font-bold">Pay Small Small</h1>
                    </div>
                    <p className="text-white/90 text-lg mb-6">
                        Flexible payment plans for vehicles and properties.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                            <Car className="w-8 h-8 mb-2 opacity-80" />
                            <div className="text-2xl font-bold">{vehicles.length}</div>
                            <div className="text-sm opacity-80">Vehicles Available</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                            <Home className="w-8 h-8 mb-2 opacity-80" />
                            <div className="text-2xl font-bold">{properties.length}</div>
                            <div className="text-sm opacity-80">Properties Available</div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="sticky top-[72px] z-30 bg-white border-b border-gray-200 px-4">
                    <div className="flex space-x-6 overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'all'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            All Items
                        </button>
                        <button
                            onClick={() => setActiveTab('vehicles')}
                            className={`py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'vehicles'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Vehicles
                        </button>
                        <button
                            onClick={() => setActiveTab('properties')}
                            className={`py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'properties'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Properties
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="px-4 py-6 space-y-8">
                    {activeTab !== 'properties' && showVehicles.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Car className="w-5 h-5 text-primary" />
                                <h2 className="text-lg font-bold text-gray-900">Vehicles</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {showVehicles.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab !== 'vehicles' && showProperties.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Home className="w-5 h-5 text-primary" />
                                <h2 className="text-lg font-bold text-gray-900">Properties</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {showProperties.map(property => (
                                    <PropertyCard key={property.id} property={property} />
                                ))}
                            </div>
                        </div>
                    )}

                    {loading && (
                        <div className="text-center py-12">
                            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-500">Loading items...</p>
                        </div>
                    )}

                    {!loading && showVehicles.length === 0 && showProperties.length === 0 && (
                        <div className="text-center py-12">
                            <Wallet className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
                            <p className="text-gray-500">Check back later for available installment plans.</p>
                        </div>
                    )}
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
