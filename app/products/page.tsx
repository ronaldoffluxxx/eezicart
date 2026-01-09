'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import ProductCard from '@/components/ProductCard';
import EmptyState from '@/components/EmptyState';
import { useCart } from '@/lib/hooks/useCart';
import { useToast } from '@/components/ToastProvider';
import { safeLocalStorageGet } from '@/lib/utils/safeStorage';
import type { Product } from '@/lib/types';
import { ShoppingBag } from 'lucide-react';

function ProductsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { cart, addItem } = useCart();
    const { showToast } = useToast();

    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [wishlist, setWishlist] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState('newest');
    const [showFilters, setShowFilters] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const allProducts = safeLocalStorageGet<Product[]>('products', []);
        if (allProducts && allProducts.length > 0) {
            setProducts(allProducts);

            // Apply category filter if present
            const category = searchParams.get('category');
            if (category) {
                const filtered = allProducts.filter(p => p.category === category);
                setFilteredProducts(filtered);
            } else {
                setFilteredProducts(allProducts);
            }
        }

        const savedWishlist = safeLocalStorageGet<string[]>('wishlist', []);
        setWishlist(savedWishlist || []);
        setIsLoading(false);
    }, [searchParams]);

    // Sort products
    useEffect(() => {
        if (filteredProducts.length === 0) return;

        let sorted = [...filteredProducts];

        switch (sortBy) {
            case 'price-low':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'popular':
                sorted.sort((a, b) => b.sales - a.sales);
                break;
            case 'newest':
            default:
                sorted.sort((a, b) => b.createdAt - a.createdAt);
                break;
        }

        setFilteredProducts(sorted);
    }, [sortBy]);

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

    const category = searchParams.get('category');
    const categoryName = category
        ? category.charAt(0).toUpperCase() + category.slice(1)
        : 'All Products';

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-600">Loading products...</p>
            </div>
        );
    }

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
                            <h1 className="text-xl font-bold text-gray-900">{categoryName}</h1>
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
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
                            onClick={() => setSortBy('popular')}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${sortBy === 'popular'
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Popular
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

            {/* Products Grid */}
            <main className="pb-20">
                {filteredProducts.length > 0 ? (
                    <div className="px-4 py-4">
                        <p className="text-sm text-gray-600 mb-4">
                            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                        </p>
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
                    </div>
                ) : (
                    <EmptyState
                        icon={ShoppingBag}
                        title="No products found"
                        description="We couldn't find any products matching your criteria. Try adjusting your filters or browse all products."
                        actionLabel="View All Products"
                        onAction={() => router.push('/products')}
                    />
                )}
            </main>

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-600">Loading products...</p>
            </div>
        }>
            <ProductsContent />
        </Suspense>
    );
}
