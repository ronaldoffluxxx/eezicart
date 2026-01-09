'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, ShoppingCart, Heart, Minus, Plus, Star, MapPin, Truck } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import InstallmentCalculator from '@/components/InstallmentCalculator';
import { useCart } from '@/lib/hooks/useCart';
import { useToast } from '@/components/ToastProvider';
import { formatCurrency } from '@/lib/utils/formatting';
import { isEligibleForInstallments } from '@/lib/utils/installments';
import { getProduct, incrementProductViews } from '@/lib/supabase/products';
import { safeLocalStorageGet } from '@/lib/utils/safeStorage';
import type { Product, User } from '@/lib/types';
import { supabase } from '@/lib/supabase/client';

export default function ProductDetailPage() {
    const router = useRouter();
    const params = useParams();
    const productId = params.id as string;
    const { cart, addItem } = useCart();
    const { showToast } = useToast();

    const [product, setProduct] = useState<Product | null>(null);
    const [vendor, setVendor] = useState<User | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);

            // Fetch product from Supabase
            const { product: supabaseProduct, error } = await getProduct(productId);

            if (error) {
                console.error('Error fetching product:', error);
                showToast('Failed to load product', 'error');
                setIsLoading(false);
                // Redirect to products page after delay
                setTimeout(() => {
                    router.push('/products');
                }, 2000);
                return;
            }

            if (supabaseProduct) {
                setProduct(supabaseProduct);

                // Increment views
                incrementProductViews(productId);

                // Load vendor info from Supabase
                const { data: vendorData } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', supabaseProduct.vendorId)
                    .single();

                if (vendorData) {
                    setVendor(vendorData);
                }

                setIsLoading(false);
            } else {
                // Product not found
                showToast('Product not found', 'error');
                setIsLoading(false);
                setTimeout(() => {
                    router.push('/products');
                }, 2000);
            }
        };

        fetchProduct();

        // Check wishlist
        const wishlist = safeLocalStorageGet<string[]>('wishlist', []);
        setIsInWishlist(wishlist?.includes(productId) || false);
    }, [productId, router, showToast]);

    const handleAddToCart = () => {
        if (product) {
            addItem(product, quantity);
            showToast(`${quantity} x ${product.name} added to cart!`, 'success');
        }
    };

    const handleBuyNow = () => {
        if (product) {
            addItem(product, quantity);
            router.push('/cart');
        }
    };

    const handleToggleWishlist = () => {
        let wishlist = safeLocalStorageGet<string[]>('wishlist', []) || [];

        if (isInWishlist) {
            wishlist = wishlist.filter(id => id !== productId);
        } else {
            wishlist.push(productId);
        }

        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        setIsInWishlist(!isInWishlist);
    };

    const incrementQuantity = () => {
        if (product && quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-600">Loading product...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 mb-2">Product not found</p>
                    <p className="text-sm text-gray-500">Redirecting to products page...</p>
                </div>
            </div>
        );
    }

    const discountPercentage = product.compareAtPrice
        ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
        : 0;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header cartItemCount={cart.itemCount} showSearch={false} />

            {/* Back Button */}
            <div className="bg-white border-b px-4 py-3 sticky top-[72px] z-30">
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-gray-700 hover:text-gray-900"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    <span className="font-medium">Back</span>
                </button>
            </div>

            <main className="pb-32">
                {/* Image Gallery */}
                <div className="bg-white">
                    <div className="relative h-80 bg-gray-200">
                        {product.images && product.images.length > 0 ? (
                            <Image
                                src={product.images[selectedImage]}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <ShoppingCart className="w-20 h-20" />
                            </div>
                        )}

                        {/* Wishlist Button */}
                        <button
                            onClick={handleToggleWishlist}
                            className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50"
                        >
                            <Heart
                                className={`w-5 h-5 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                            />
                        </button>

                        {/* Discount Badge */}
                        {discountPercentage > 0 && (
                            <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded">
                                -{discountPercentage}% OFF
                            </div>
                        )}
                    </div>

                    {/* Image Thumbnails */}
                    {product.images && product.images.length > 1 && (
                        <div className="flex space-x-2 p-4 overflow-x-auto">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${selectedImage === index ? 'border-primary' : 'border-gray-200'
                                        }`}
                                >
                                    <Image
                                        src={image}
                                        alt={`${product.name} ${index + 1}`}
                                        width={64}
                                        height={64}
                                        className="object-cover w-full h-full"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="bg-white mt-2 p-4">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                        <div className="flex items-center">
                            <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                            <span className="text-base font-semibold text-gray-900 ml-1">
                                {product.rating?.toFixed(1) || '0.0'}
                            </span>
                        </div>
                        <span className="text-gray-600 ml-2">
                            ({product.reviewCount || 0} reviews)
                        </span>
                        <span className="text-gray-400 mx-2">•</span>
                        <span className="text-gray-600">
                            {product.sales || 0} sold
                        </span>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                        <div className="flex items-baseline">
                            <span className="text-3xl font-bold text-primary">
                                {formatCurrency(product.price)}
                            </span>
                            {product.compareAtPrice && (
                                <span className="text-lg text-gray-400 line-through ml-3">
                                    {formatCurrency(product.compareAtPrice)}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Stock Status */}
                    <div className="mb-4">
                        {product.stock > 0 ? (
                            <span className="text-green-600 font-medium">
                                In Stock ({product.stock} available)
                            </span>
                        ) : (
                            <span className="text-red-600 font-medium">Out of Stock</span>
                        )}
                    </div>

                    {/* Quantity Selector */}
                    {product.stock > 0 && (
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Quantity
                            </label>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                    <button
                                        onClick={decrementQuantity}
                                        className="p-3 hover:bg-gray-100 disabled:opacity-50"
                                        disabled={quantity <= 1}
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="px-6 font-semibold">{quantity}</span>
                                    <button
                                        onClick={incrementQuantity}
                                        className="p-3 hover:bg-gray-100 disabled:opacity-50"
                                        disabled={quantity >= product.stock}
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Installment Calculator - Only for Vehicles */}
                {product.category === 'vehicles' && isEligibleForInstallments(product.price) && (
                    <div className="bg-white mt-2 p-4">
                        <InstallmentCalculator productPrice={product.price} />
                    </div>
                )}

                {/* Vendor Info */}
                {vendor && (
                    <div className="bg-white mt-2 p-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Sold by</h3>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900">{vendor.businessName || vendor.name}</p>
                                <div className="flex items-center text-gray-600 text-sm mt-1">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    <span>{vendor.location?.city}, {vendor.location?.state}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => router.push(`/products?vendor=${product.vendorId}`)}
                                className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                            >
                                View Shop
                            </button>
                        </div>
                    </div>
                )}

                {/* Shipping Info */}
                <div className="bg-white mt-2 p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Delivery & Returns</h3>
                    <div className="space-y-3">
                        {product.shipping?.deliveryAvailable && (
                            <div className="flex items-start">
                                <Truck className="w-5 h-5 text-primary mr-3 mt-0.5" />
                                <div>
                                    <p className="font-medium text-gray-900">Delivery Available</p>
                                    <p className="text-sm text-gray-600">
                                        Delivery fee: {formatCurrency(product.shipping.deliveryFee || 2000)}
                                    </p>
                                </div>
                            </div>
                        )}
                        {product.shipping?.pickupOnly && (
                            <div className="flex items-start">
                                <MapPin className="w-5 h-5 text-primary mr-3 mt-0.5" />
                                <div>
                                    <p className="font-medium text-gray-900">Pickup Available</p>
                                    <p className="text-sm text-gray-600">{product.location?.address}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Description */}
                <div className="bg-white mt-2 p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
                    <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
                </div>
            </main>

            {/* Bottom Action Bar */}
            {product.stock > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-40">
                    <div className="flex space-x-3 max-w-screen-xl mx-auto">
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-white border-2 border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary/5 transition-colors flex items-center justify-center space-x-2"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            <span>Add to Cart</span>
                        </button>
                        <button
                            onClick={handleBuyNow}
                            className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
