'use client';

import { useState } from 'react';
import { Calendar, TrendingUp, CreditCard } from 'lucide-react';
import type { InstallmentPlan } from '@/lib/types';
import {
    calculateInstallment,
    formatCurrency,
    INSTALLMENT_CONFIG,
} from '@/lib/utils/installments';

interface InstallmentCalculatorProps {
    productPrice: number;
    onPlanSelect?: (plan: InstallmentPlan, details: ReturnType<typeof calculateInstallment>) => void;
    selectedPlan?: InstallmentPlan;
}

export default function InstallmentCalculator({
    productPrice,
    onPlanSelect,
    selectedPlan,
}: InstallmentCalculatorProps) {
    const [activePlan, setActivePlan] = useState<InstallmentPlan>(selectedPlan || '6-months');

    const handlePlanChange = (plan: InstallmentPlan) => {
        setActivePlan(plan);
        const details = calculateInstallment(productPrice, plan);
        onPlanSelect?.(plan, details);
    };

    const currentDetails = calculateInstallment(productPrice, activePlan);

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-gray-900">Pay in Installments</h3>
            </div>

            <p className="text-sm text-gray-600 mb-4">
                Split your payment into easy monthly installments
            </p>

            {/* Plan Selection */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                {INSTALLMENT_CONFIG.plans.map((plan) => {
                    const planString = `${plan.duration}-months` as InstallmentPlan;
                    const isActive = activePlan === planString;
                    const details = calculateInstallment(productPrice, planString);

                    return (
                        <button
                            key={plan.duration}
                            onClick={() => handlePlanChange(planString)}
                            className={`p-4 rounded-lg border-2 transition-all ${isActive
                                    ? 'border-primary bg-primary/5'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <div className="text-center">
                                <p className="text-sm font-medium text-gray-900">{plan.label}</p>
                                <p className="text-xs text-gray-500 mt-1">{plan.interestRate}% interest</p>
                                <p className="text-lg font-bold text-primary mt-2">
                                    {formatCurrency(details.monthlyPayment)}
                                </p>
                                <p className="text-xs text-gray-500">/month</p>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Payment Breakdown */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Product Price</span>
                    <span className="font-medium text-gray-900">{formatCurrency(currentDetails.productPrice)}</span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        Interest ({currentDetails.interestRate}%)
                    </span>
                    <span className="font-medium text-gray-900">{formatCurrency(currentDetails.interestAmount)}</span>
                </div>

                <div className="border-t border-gray-200 pt-3 flex justify-between">
                    <span className="font-semibold text-gray-900">Total Amount</span>
                    <span className="font-bold text-gray-900">{formatCurrency(currentDetails.totalAmount)}</span>
                </div>

                <div className="border-t border-gray-200 pt-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Monthly Payment
                        </span>
                        <span className="text-2xl font-bold text-primary">
                            {formatCurrency(currentDetails.monthlyPayment)}
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-right">
                        for {currentDetails.duration} months
                    </p>
                </div>
            </div>

            {/* Info Note */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-800">
                    <span className="font-semibold">Note:</span> Your first payment will be due 30 days after purchase.
                    No hidden fees or charges.
                </p>
            </div>
        </div>
    );
}
