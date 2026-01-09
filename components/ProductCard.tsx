'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Heart } from 'lucide-react';
import type { Product } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/formatting';

interface ProductCardProps {
    product: Product;
    onAddToCart?: (product: Product) => void;
    onToggleWishlist?: (productId: string) => void;
    isInWishlist?: boolean;
}

export default function ProductCard({
    product,
    onAddToCart,
    onToggleWishlist,
    isInWishlist = false
}: ProductCardProps) {
    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/products/${product.id}`);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        onAddToCart?.(product);
    };

    const handleToggleWishlist = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggleWishlist?.(product.id);
    };

    const discountPercentage = product.compareAtPrice
        ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
        : 0;

    return (
        <div
            onClick={handleCardClick}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
            {/* Product Image */}
            <div className="relative h-48 bg-gray-200">
                {product.images && product.images.length > 0 ? (
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <ShoppingCart className="w-12 h-12" />
                    </div>
                )}

                {/* Discount Badge */}
                {discountPercentage > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        -{discountPercentage}%
                    </div>
                )}

                {/* Wishlist Button */}
                <button
                    onClick={handleToggleWishlist}
                    className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                >
                    <Heart
                        className={`w-4 h-4 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                    />
                </button>

                {/* Stock Badge */}
                {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="bg-white text-gray-900 px-3 py-1 rounded font-semibold text-sm">
                            Out of Stock
                        </span>
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-3">
                <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 min-h-[2.5rem]">
                    {product.name}
                </h3>

                {/* Vendor Name */}
                <p className="text-xs text-gray-600 mb-2">
                    {product.location?.city}, {product.location?.state}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-2">
                    <div className="flex items-center">
                        <span className="text-yellow-500 text-sm">★</span>
                        <span className="text-xs text-gray-700 ml-1">
                            {product.rating.toFixed(1)}
                        </span>
                    </div>
                    <span className="text-xs text-gray-500 ml-1">
                        ({product.reviewCount})
                    </span>
                    {product.sales > 0 && (
                        <span className="text-xs text-gray-500 ml-2">
                            {product.sales} sold
                        </span>
                    )}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <span className="text-primary font-bold text-base">
                            {formatCurrency(product.price)}
                        </span>
                        {product.compareAtPrice && (
                            <span className="text-gray-400 text-xs line-through ml-2">
                                {formatCurrency(product.compareAtPrice)}
                            </span>
                        )}
                    </div>
                </div>

                {/* Installment Option */}
                {product.price >= 5000 && (
                    <p className="text-xs text-gray-600 mb-2">
                        or from <span className="font-semibold text-primary">
                            {formatCurrency(Math.ceil((product.price * 1.15) / 12))}/month
                        </span>
                    </p>
                )}

                {/* Add to Cart Button */}
                {product.stock > 0 && (
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-primary text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center space-x-2"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add to Cart</span>
                    </button>
                )}
            </div>
        </div>
    );
}
