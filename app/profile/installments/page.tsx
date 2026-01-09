'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, CreditCard, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import EmptyState from '@/components/EmptyState';
import { useCart } from '@/lib/hooks/useCart';
import { formatCurrency, calculatePaymentProgress, getInstallmentStatusColor, getPaymentStatusColor } from '@/lib/utils/installments';
import { safeLocalStorageGet } from '@/lib/utils/safeStorage';
import type { Installment, User } from '@/lib/types';
import Image from 'next/image';

export default function InstallmentsPage() {
    const router = useRouter();
    const { cart } = useCart();
    const [installments, setInstallments] = useState<Installment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check authentication
        const authToken = localStorage.getItem('authToken');
        const currentUserData = localStorage.getItem('currentUser');

        if (!authToken || !currentUserData) {
            router.push('/login');
            return;
        }

        let currentUser: User;
        try {
            currentUser = JSON.parse(currentUserData);
        } catch (error) {
            console.error('Failed to parse user data:', error);
            router.push('/login');
            return;
        }

        // Load installments for current user
        const allInstallments = safeLocalStorageGet<Installment[]>('installments', []);
        const userInstallments = allInstallments?.filter(i => i.userId === currentUser.id) || [];
        setInstallments(userInstallments);
        setLoading(false);
    }, [router]);

    const activeInstallments = installments.filter(i => i.status === 'active');
    const completedInstallments = installments.filter(i => i.status === 'completed');

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header cartItemCount={cart.itemCount} showSearch={false} />

            {/* Page Header */}
            <div className="bg-white border-b sticky top-[72px] z-30">
                <div className="px-4 py-4">
                    <div className="flex items-center">
                        <button
                            onClick={() => router.back()}
                            className="mr-3 p-2 hover:bg-gray-100 rounded-full"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">My Installments</h1>
                            <p className="text-sm text-gray-600">
                                {activeInstallments.length} active payment plan{activeInstallments.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <main className="pb-20">
                {loading ? (
                    <div className="p-8 text-center">
                        <p className="text-gray-600">Loading...</p>
                    </div>
                ) : installments.length === 0 ? (
                    <EmptyState
                        icon={CreditCard}
                        title="No installment plans"
                        description="You haven't purchased any products on installment yet. Products over ₦5,000 qualify for monthly payments."
                        actionLabel="Browse Products"
                        onAction={() => router.push('/products')}
                    />
                ) : (
                    <div className="p-4 space-y-4">
                        {/* Active Installments */}
                        {activeInstallments.length > 0 && (
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-3">Active Plans</h2>
                                <div className="space-y-3">
                                    {activeInstallments.map((installment) => {
                                        const progress = calculatePaymentProgress(installment);
                                        const nextPayment = installment.payments.find(p => p.status === 'pending');

                                        return (
                                            <div
                                                key={installment.id}
                                                onClick={() => router.push(`/profile/installments/${installment.id}`)}
                                                className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
                                            >
                                                <div className="flex gap-3">
                                                    {/* Product Image */}
                                                    <div className="relative w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0">
                                                        {installment.productImage ? (
                                                            <Image
                                                                src={installment.productImage}
                                                                alt={installment.productName}
                                                                fill
                                                                className="object-cover rounded-lg"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center">
                                                                <CreditCard className="w-8 h-8 text-gray-400" />
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Details */}
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-semibold text-gray-900 truncate">
                                                            {installment.productName}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 mt-1">
                                                            {formatCurrency(installment.monthlyPayment)}/month × {installment.duration} months
                                                        </p>

                                                        {/* Progress Bar */}
                                                        <div className="mt-3">
                                                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                                                                <span>{installment.paidInstallments} of {installment.duration} paid</span>
                                                                <span>{Math.round(progress)}%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                                <div
                                                                    className="bg-primary h-2 rounded-full transition-all"
                                                                    style={{ width: `${progress}%` }}
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Next Payment */}
                                                        {nextPayment && (
                                                            <div className="mt-3 flex items-center justify-between">
                                                                <div className="flex items-center text-sm text-gray-600">
                                                                    <Clock className="w-4 h-4 mr-1" />
                                                                    <span>
                                                                        Next: {new Date(nextPayment.dueDate).toLocaleDateString()}
                                                                    </span>
                                                                </div>
                                                                <span className={`text-xs px-2 py-1 rounded-full ${getPaymentStatusColor(nextPayment.status)}`}>
                                                                    {nextPayment.status}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Completed Installments */}
                        {completedInstallments.length > 0 && (
                            <div className="mt-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-3">Completed</h2>
                                <div className="space-y-3">
                                    {completedInstallments.map((installment) => (
                                        <div
                                            key={installment.id}
                                            onClick={() => router.push(`/profile/installments/${installment.id}`)}
                                            className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow opacity-75"
                                        >
                                            <div className="flex gap-3">
                                                <div className="relative w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0">
                                                    {installment.productImage ? (
                                                        <Image
                                                            src={installment.productImage}
                                                            alt={installment.productName}
                                                            fill
                                                            className="object-cover rounded-lg"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <CreditCard className="w-8 h-8 text-gray-400" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h3 className="font-semibold text-gray-900">
                                                                {installment.productName}
                                                            </h3>
                                                            <p className="text-sm text-gray-600 mt-1">
                                                                Completed on {installment.completedAt ? new Date(installment.completedAt).toLocaleDateString() : 'N/A'}
                                                            </p>
                                                        </div>
                                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    );
}
