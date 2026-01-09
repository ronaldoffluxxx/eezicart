'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CreditCard, Wallet } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { useCart } from '@/lib/hooks/useCart';
import { formatCurrency } from '@/lib/utils/formatting';
import { useToast } from '@/components/ToastProvider';
import { safeLocalStorageGet } from '@/lib/utils/safeStorage';
import type { User } from '@/lib/types';

export default function CheckoutPage() {
    const router = useRouter();
    const { cart, clearCart } = useCart();
    const { showToast } = useToast();
    const [user, setUser] = useState<User | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'paystack' | 'flutterwave'>('wallet');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const currentUser = safeLocalStorageGet<User>('currentUser');
        if (currentUser) {
            setUser(currentUser);
        }

        if (cart.items.length === 0) {
            router.push('/cart');
        }
    }, [cart.items.length, router]);

    const handlePayment = async () => {
        if (!user) return;

        setLoading(true);

        if (paymentMethod === 'wallet') {
            // Wallet payment
            if (user.walletBalance < cart.total) {
                showToast('Insufficient wallet balance', 'error');
                setLoading(false);
                return;
            }

            const newBalance = user.walletBalance - cart.total;
            const updatedUser = { ...user, walletBalance: newBalance };
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            setUser(updatedUser);

            // Create order
            const order = {
                id: `order_${Date.now()}`,
                userId: user.id,
                items: cart.items,
                total: cart.total,
                paymentMethod: 'wallet',
                status: 'confirmed',
                createdAt: new Date().toISOString(),
            };

            const orders = safeLocalStorageGet<any[]>('orders', []) || [];
            orders.push(order);
            localStorage.setItem('orders', JSON.stringify(orders));

            // Add transaction
            const transaction = {
                id: `txn_${Date.now()}`,
                type: 'debit',
                amount: cart.total,
                description: `Order #${order.id}`,
                date: new Date().toISOString(),
            };
            const transactions = safeLocalStorageGet<any[]>('transactions', []) || [];
            transactions.unshift(transaction);
            localStorage.setItem('transactions', JSON.stringify(transactions));

            clearCart();
            showToast('Order placed successfully!', 'success');
            router.push('/orders');
        } else if (paymentMethod === 'paystack') {
            // Paystack integration
            showToast('Paystack integration coming soon! For now, use wallet payment.', 'info');
            setLoading(false);
        } else if (paymentMethod === 'flutterwave') {
            // Flutterwave integration
            showToast('Flutterwave integration coming soon! For now, use wallet payment.', 'info');
            setLoading(false);
        }
    };

    if (!user || cart.items.length === 0) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header cartItemCount={cart.itemCount} showSearch={false} />

            <div className="bg-white border-b px-4 py-3 sticky top-[72px] z-30">
                <div className="flex items-center">
                    <button onClick={() => router.back()} className="mr-3 p-2 hover:bg-gray-100 rounded-full">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
                </div>
            </div>

            <main className="pb-20 p-4 max-w-2xl mx-auto">
                {/* Order Summary */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                    <h2 className="font-bold text-gray-900 mb-3">Order Summary</h2>
                    <div className="space-y-2">
                        {cart.items.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                                <span className="text-gray-700">{item.name} x {item.quantity}</span>
                                <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                            </div>
                        ))}
                        <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span className="text-primary">{formatCurrency(cart.total)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                    <h2 className="font-bold text-gray-900 mb-3">Payment Method</h2>
                    <div className="space-y-3">
                        <button
                            onClick={() => setPaymentMethod('wallet')}
                            className={`w-full p-4 border-2 rounded-lg flex items-center justify-between transition-colors ${paymentMethod === 'wallet' ? 'border-primary bg-primary/5' : 'border-gray-200'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <Wallet className="w-6 h-6 text-primary" />
                                <div className="text-left">
                                    <p className="font-medium text-gray-900">Wallet</p>
                                    <p className="text-sm text-gray-600">Balance: {formatCurrency(user.walletBalance)}</p>
                                </div>
                            </div>
                            {paymentMethod === 'wallet' && <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs">✓</div>}
                        </button>

                        <button
                            onClick={() => setPaymentMethod('paystack')}
                            className={`w-full p-4 border-2 rounded-lg flex items-center justify-between transition-colors ${paymentMethod === 'paystack' ? 'border-primary bg-primary/5' : 'border-gray-200'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <CreditCard className="w-6 h-6 text-primary" />
                                <div className="text-left">
                                    <p className="font-medium text-gray-900">Paystack</p>
                                    <p className="text-sm text-gray-600">Pay with card</p>
                                </div>
                            </div>
                            {paymentMethod === 'paystack' && <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs">✓</div>}
                        </button>

                        <button
                            onClick={() => setPaymentMethod('flutterwave')}
                            className={`w-full p-4 border-2 rounded-lg flex items-center justify-between transition-colors ${paymentMethod === 'flutterwave' ? 'border-primary bg-primary/5' : 'border-gray-200'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <CreditCard className="w-6 h-6 text-primary" />
                                <div className="text-left">
                                    <p className="font-medium text-gray-900">Flutterwave</p>
                                    <p className="text-sm text-gray-600">Pay with card</p>
                                </div>
                            </div>
                            {paymentMethod === 'flutterwave' && <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs">✓</div>}
                        </button>
                    </div>
                </div>

                {/* Place Order Button */}
                <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full bg-primary text-white py-4 rounded-lg font-bold text-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                >
                    {loading ? 'Processing...' : `Pay ${formatCurrency(cart.total)}`}
                </button>
            </main>

            <BottomNav />
        </div>
    );
}

