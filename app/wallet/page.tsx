'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Wallet as WalletIcon, ArrowLeft, Plus, ArrowUpRight, X } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { useCart } from '@/lib/hooks/useCart';
import { formatCurrency } from '@/lib/utils/formatting';
import { safeLocalStorageGet } from '@/lib/utils/safeStorage';
import { useToast } from '@/components/ToastProvider';
import type { User } from '@/lib/types';

export default function WalletPage() {
    const router = useRouter();
    const { cart } = useCart();
    const { showToast } = useToast();
    const [user, setUser] = useState<User | null>(null);
    const [showFundModal, setShowFundModal] = useState(false);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [amount, setAmount] = useState('');
    const [transactions, setTransactions] = useState<any[]>([]);

    useEffect(() => {
        const currentUser = safeLocalStorageGet<User>('currentUser');
        if (currentUser) {
            setUser(currentUser);
        }

        const savedTransactions = safeLocalStorageGet<any[]>('transactions', []) || [];
        setTransactions(savedTransactions);
    }, []);

    const handleFund = () => {
        if (!amount || parseFloat(amount) <= 0) {
            showToast('Please enter a valid amount', 'error');
            return;
        }

        if (user) {
            const newBalance = user.walletBalance + parseFloat(amount);
            const updatedUser = { ...user, walletBalance: newBalance };

            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            setUser(updatedUser);

            // Add transaction
            const newTransaction = {
                id: `txn_${Date.now()}`,
                type: 'credit',
                amount: parseFloat(amount),
                description: 'Wallet Funding',
                date: new Date().toISOString(),
            };
            const updatedTransactions = [newTransaction, ...transactions];
            localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
            setTransactions(updatedTransactions);

            setAmount('');
            setShowFundModal(false);
            alert(`Wallet funded successfully! New balance: ${formatCurrency(newBalance)}`);
        }
    };

    const handleWithdraw = () => {
        if (!amount || parseFloat(amount) <= 0) {
            showToast('Please enter a valid amount', 'error');
            return;
        }

        if (user) {
            if (parseFloat(amount) > user.walletBalance) {
                showToast('Insufficient balance', 'error');
                return;
            }

            const newBalance = user.walletBalance - parseFloat(amount);
            const updatedUser = { ...user, walletBalance: newBalance };

            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            setUser(updatedUser);

            // Add transaction
            const newTransaction = {
                id: `txn_${Date.now()}`,
                type: 'debit',
                amount: parseFloat(amount),
                description: 'Wallet Withdrawal',
                date: new Date().toISOString(),
            };
            const updatedTransactions = [newTransaction, ...transactions];
            localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
            setTransactions(updatedTransactions);

            setAmount('');
            setShowWithdrawModal(false);
            alert(`Withdrawal successful! New balance: ${formatCurrency(newBalance)}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header cartItemCount={cart.itemCount} showSearch={false} />

            <div className="bg-white border-b px-4 py-3 sticky top-[72px] z-30">
                <div className="flex items-center">
                    <button onClick={() => router.back()} className="mr-3 p-2 hover:bg-gray-100 rounded-full">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">Wallet</h1>
                </div>
            </div>

            <main className="pb-20">
                {/* Wallet Balance Card */}
                <div className="px-4 py-6">
                    <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white shadow-lg">
                        <p className="text-sm opacity-90 mb-2">Available Balance</p>
                        <h2 className="text-4xl font-bold mb-6">{formatCurrency(user?.walletBalance || 0)}</h2>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setShowFundModal(true)}
                                className="bg-white text-primary py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
                            >
                                <Plus className="w-5 h-5" />
                                <span>Fund Wallet</span>
                            </button>
                            <button
                                onClick={() => setShowWithdrawModal(true)}
                                className="bg-white/20 text-white py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors flex items-center justify-center space-x-2"
                            >
                                <ArrowUpRight className="w-5 h-5" />
                                <span>Withdraw</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Transaction History */}
                <div className="px-4 py-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Transactions</h3>
                    {transactions.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                            <WalletIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-600">No transactions yet</p>
                            <p className="text-sm text-gray-500 mt-1">Your transaction history will appear here</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-sm divide-y">
                            {transactions.map((txn) => (
                                <div key={txn.id} className="p-4 flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-900">{txn.description}</p>
                                        <p className="text-sm text-gray-500">{new Date(txn.date).toLocaleDateString()}</p>
                                    </div>
                                    <p className={`font-bold ${txn.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                                        {txn.type === 'credit' ? '+' : '-'}{formatCurrency(txn.amount)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Fund Modal */}
            {showFundModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">Fund Wallet</h2>
                            <button onClick={() => setShowFundModal(false)}>
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4"
                        />
                        <button
                            onClick={handleFund}
                            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark"
                        >
                            Fund Wallet
                        </button>
                    </div>
                </div>
            )}

            {/* Withdraw Modal */}
            {showWithdrawModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">Withdraw Funds</h2>
                            <button onClick={() => setShowWithdrawModal(false)}>
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4"
                        />
                        <button
                            onClick={handleWithdraw}
                            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark"
                        >
                            Withdraw
                        </button>
                    </div>
                </div>
            )}

            <BottomNav />
        </div>
    );
}

