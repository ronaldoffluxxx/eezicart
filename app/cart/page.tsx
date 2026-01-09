'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import EmptyState from '@/components/EmptyState';
import { useCart } from '@/lib/hooks/useCart';
import { useToast } from '@/components/ToastProvider';
import { formatCurrency } from '@/lib/utils/formatting';

export default function CartPage() {
    const router = useRouter();
    const { cart, removeItem, updateQuantity, getItemsByVendor } = useCart();
    const { showToast } = useToast();

    const itemsByVendor = getItemsByVendor();
    const vendorIds = Object.keys(itemsByVendor);

    const handleCheckout = () => {
        // TODO: Navigate to checkout page
        showToast('Checkout functionality coming soon!', 'info');
    };

    if (cart.items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header cartItemCount={0} showSearch={false} />

                <div className="bg-white border-b px-4 py-3 sticky top-[72px] z-30">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-gray-700 hover:text-gray-900"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        <span className="font-medium">Back</span>
                    </button>
                </div>

                <EmptyState
                    icon={ShoppingBag}
                    title="Your cart is empty"
                    description="Add some products to your cart to get started with your shopping."
                    actionLabel="Continue Shopping"
                    onAction={() => router.push('/products')}
                />

                <BottomNav />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header cartItemCount={cart.itemCount} showSearch={false} />

            {/* Page Header */}
            <div className="bg-white border-b px-4 py-3 sticky top-[72px] z-30">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-gray-700 hover:text-gray-900"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        <span className="font-medium">Back</span>
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">
                        Shopping Cart ({cart.itemCount})
                    </h1>
                    <div className="w-20"></div>
                </div>
            </div>

            <main className="pb-48">
                {/* Cart Items by Vendor */}
                <div className="px-4 py-4 space-y-4">
                    {vendorIds.map((vendorId) => {
                        const items = itemsByVendor[vendorId];
                        const vendorSubtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

                        return (
                            <div key={vendorId} className="bg-white rounded-lg overflow-hidden shadow-sm">
                                {/* Vendor Header */}
                                <div className="bg-gray-50 px-4 py-3 border-b">
                                    <p className="font-semibold text-gray-900">Vendor Items</p>
                                    <p className="text-sm text-gray-600">Delivery: {formatCurrency(2000)}</p>
                                </div>

                                {/* Items */}
                                <div className="divide-y">
                                    {items.map((item) => (
                                        <div key={`${item.productId}-${JSON.stringify(item.variation)}`} className="p-4">
                                            <div className="flex space-x-3">
                                                {/* Product Image */}
                                                <div className="relative w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                                    {item.image ? (
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <ShoppingBag className="w-8 h-8 text-gray-400" />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Product Info */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                                                        {item.name}
                                                    </h3>

                                                    {/* Variation */}
                                                    {item.variation && (
                                                        <p className="text-xs text-gray-600 mb-2">
                                                            {Object.entries(item.variation).map(([key, value]) => (
                                                                <span key={key} className="mr-2">
                                                                    {key}: {value}
                                                                </span>
                                                            ))}
                                                        </p>
                                                    )}

                                                    {/* Price */}
                                                    <p className="text-primary font-bold mb-3">
                                                        {formatCurrency(item.price)}
                                                    </p>

                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center border border-gray-300 rounded-lg">
                                                            <button
                                                                onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variation)}
                                                                className="p-2 hover:bg-gray-100"
                                                            >
                                                                <Minus className="w-4 h-4" />
                                                            </button>
                                                            <span className="px-4 font-semibold">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variation)}
                                                                className="p-2 hover:bg-gray-100 disabled:opacity-50"
                                                                disabled={item.quantity >= item.stock}
                                                            >
                                                                <Plus className="w-4 h-4" />
                                                            </button>
                                                        </div>

                                                        {/* Remove Button */}
                                                        <button
                                                            onClick={() => removeItem(item.productId, item.variation)}
                                                            className="text-red-600 hover:text-red-700 p-2"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>

                                                    {/* Stock Warning */}
                                                    {item.quantity >= item.stock && (
                                                        <p className="text-xs text-orange-600 mt-2">
                                                            Maximum stock reached
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Vendor Subtotal */}
                                <div className="bg-gray-50 px-4 py-3 border-t">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Subtotal ({items.length} items)</span>
                                        <span className="font-semibold text-gray-900">{formatCurrency(vendorSubtotal)}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            {/* Bottom Summary */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40">
                <div className="px-4 py-4 max-w-screen-xl mx-auto">
                    {/* Summary */}
                    <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-medium">{formatCurrency(cart.subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Delivery Fee</span>
                            <span className="font-medium">{formatCurrency(cart.deliveryFee)}</span>
                        </div>
                        <div className="flex justify-between text-base font-bold border-t pt-2">
                            <span>Total</span>
                            <span className="text-primary">{formatCurrency(cart.total)}</span>
                        </div>
                    </div>

                    {/* Checkout Button */}
                    <button
                        onClick={handleCheckout}
                        className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>

            {/* Bottom Nav Spacer */}
            <div className="h-20"></div>
        </div>
    );
}

