'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, X } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import ProductCard from '@/components/ProductCard';
import PropertyCard from '@/components/PropertyCard';
import EmptyState from '@/components/EmptyState';
import { useCart } from '@/lib/hooks/useCart';
import { useToast } from '@/components/ToastProvider';
import { safeLocalStorageGet } from '@/lib/utils/safeStorage';
import type { Product, Property } from '@/lib/types';

export default function SearchPage() {
    const router = useRouter();
    const { cart, addItem } = useCart();
    const { showToast } = useToast();

    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<'products' | 'properties'>('products');
    const [products, setProducts] = useState<Product[]>([]);
    const [properties, setProperties] = useState<Property[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
    const [wishlist, setWishlist] = useState<string[]>([]);
    const [searchHistory, setSearchHistory] = useState<string[]>([]);

    useEffect(() => {
        const savedProducts = safeLocalStorageGet<Product[]>('products', []);
        const savedProperties = safeLocalStorageGet<Property[]>('properties', []);
        const savedWishlist = safeLocalStorageGet<string[]>('wishlist', []);
        const savedHistory = safeLocalStorageGet<string[]>('searchHistory', []);

        setProducts(savedProducts || []);
        setProperties(savedProperties || []);
        setWishlist(savedWishlist || []);
        setSearchHistory(savedHistory || []);
    }, []);

    useEffect(() => {
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();

            // Filter products
            const matchedProducts = products.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query)
            );
            setFilteredProducts(matchedProducts);

            // Filter properties
            const matchedProperties = properties.filter(p =>
                p.title.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.location?.city?.toLowerCase().includes(query) ||
                p.location?.state?.toLowerCase().includes(query)
            );
            setFilteredProperties(matchedProperties);
        } else {
            setFilteredProducts([]);
            setFilteredProperties([]);
        }
    }, [searchQuery, products, properties]);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            // Add to search history
            const newHistory = [searchQuery, ...searchHistory.filter(h => h !== searchQuery)].slice(0, 10);
            setSearchHistory(newHistory);
            localStorage.setItem('searchHistory', JSON.stringify(newHistory));
        }
    };

    const handleSearchHistoryClick = (query: string) => {
        setSearchQuery(query);
    };

    const clearSearchHistory = () => {
        setSearchHistory([]);
        localStorage.removeItem('searchHistory');
    };

    const handleAddToCart = (product: Product) => {
        addItem(product, 1);
        showToast(`${product.name} added to cart!`, 'success');
    };

    const handleToggleWishlist = (productId: string) => {
        const newWishlist = wishlist.includes(productId)
            ? wishlist.filter(id => id !== productId)
            : [...wishlist, productId];

        setWishlist(newWishlist);
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    };

    const hasResults = searchQuery.trim() && (filteredProducts.length > 0 || filteredProperties.length > 0);
    const showEmptyState = searchQuery.trim() && filteredProducts.length === 0 && filteredProperties.length === 0;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header cartItemCount={cart.itemCount} showSearch={false} />

            {/* Search Bar */}
            <div className="bg-white border-b px-4 py-3 sticky top-[72px] z-30">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-gray-100 rounded-full"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            placeholder="Search products, properties..."
                            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                            autoFocus
                        />
                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <main className="pb-20">
                {/* Search History */}
                {!searchQuery && searchHistory.length > 0 && (
                    <div className="bg-white p-4 mb-2">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-gray-900">Recent Searches</h3>
                            <button
                                onClick={clearSearchHistory}
                                className="text-sm text-primary hover:underline"
                            >
                                Clear All
                            </button>
                        </div>
                        <div className="space-y-2">
                            {searchHistory.map((query, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSearchHistoryClick(query)}
                                    className="flex items-center w-full text-left py-2 hover:bg-gray-50 rounded"
                                >
                                    <Search className="w-4 h-4 text-gray-400 mr-3" />
                                    <span className="text-gray-700">{query}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Results Tabs */}
                {hasResults && (
                    <div className="bg-white border-b px-4 sticky top-[132px] z-20">
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setActiveTab('products')}
                                className={`py-3 px-2 font-medium border-b-2 transition-colors ${activeTab === 'products'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Products ({filteredProducts.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('properties')}
                                className={`py-3 px-2 font-medium border-b-2 transition-colors ${activeTab === 'properties'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Properties ({filteredProperties.length})
                            </button>
                        </div>
                    </div>
                )}

                {/* Results */}
                {hasResults && (
                    <div className="px-4 py-4">
                        {activeTab === 'products' && filteredProducts.length > 0 && (
                            <div className="grid grid-cols-2 gap-4">
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onAddToCart={handleAddToCart}
                                        onToggleWishlist={handleToggleWishlist}
                                        isInWishlist={wishlist.includes(product.id)}
                                    />
                                ))}
                            </div>
                        )}

                        {activeTab === 'properties' && filteredProperties.length > 0 && (
                            <div className="space-y-4">
                                {filteredProperties.map((property) => (
                                    <PropertyCard key={property.id} property={property} />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Empty State */}
                {showEmptyState && (
                    <EmptyState
                        icon={Search}
                        title="No results found"
                        description={`We couldn't find any results for "${searchQuery}". Try different keywords.`}
                    />
                )}

                {/* Initial State */}
                {!searchQuery && searchHistory.length === 0 && (
                    <div className="px-4 py-12 text-center">
                        <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Search for products and properties
                        </h3>
                        <p className="text-gray-600">
                            Find what you're looking for by entering keywords above
                        </p>
                    </div>
                )}
            </main>

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    );
}

