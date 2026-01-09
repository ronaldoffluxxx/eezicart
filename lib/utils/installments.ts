import type { InstallmentPlan, Installment, InstallmentPayment } from '../types';

// Installment configuration
export const INSTALLMENT_CONFIG = {
    enabled: true,
    minAmount: 5000, // Minimum ₦5,000 to qualify
    plans: [
        {
            duration: 3,
            interestRate: 5, // 5%
            label: '3 Months',
        },
        {
            duration: 6,
            interestRate: 10, // 10%
            label: '6 Months',
        },
        {
            duration: 12,
            interestRate: 15, // 15%
            label: '12 Months',
        },
    ],
};

// Get plan details by duration
export const getPlanByDuration = (duration: 3 | 6 | 12) => {
    return INSTALLMENT_CONFIG.plans.find(p => p.duration === duration);
};

// Get plan details by plan string
export const getPlanByString = (plan: InstallmentPlan) => {
    const duration = parseInt(plan.split('-')[0]) as 3 | 6 | 12;
    return getPlanByDuration(duration);
};

// Calculate total amount with interest
export const calculateTotalWithInterest = (price: number, plan: InstallmentPlan): number => {
    const planDetails = getPlanByString(plan);
    if (!planDetails) return price;

    const interestAmount = price * (planDetails.interestRate / 100);
    return price + interestAmount;
};

// Calculate monthly payment
export const calculateMonthlyPayment = (price: number, plan: InstallmentPlan): number => {
    const planDetails = getPlanByString(plan);
    if (!planDetails) return price;

    const totalAmount = calculateTotalWithInterest(price, plan);
    return totalAmount / planDetails.duration;
};

// Calculate installment details
export const calculateInstallment = (price: number, plan: InstallmentPlan, downPayment: number = 0) => {
    const planDetails = getPlanByString(plan);
    if (!planDetails) {
        throw new Error('Invalid installment plan');
    }

    const remainingAmount = price - downPayment;
    const totalAmount = calculateTotalWithInterest(remainingAmount, plan);
    const monthlyPayment = totalAmount / planDetails.duration;

    return {
        productPrice: price,
        downPayment,
        remainingAmount,
        totalAmount,
        monthlyPayment,
        duration: planDetails.duration,
        interestRate: planDetails.interestRate,
        interestAmount: totalAmount - remainingAmount,
    };
};

// Generate payment schedule
export const generatePaymentSchedule = (
    installmentId: string,
    monthlyPayment: number,
    duration: number,
    startDate: Date = new Date()
): InstallmentPayment[] => {
    const payments: InstallmentPayment[] = [];

    for (let i = 0; i < duration; i++) {
        const dueDate = new Date(startDate);
        dueDate.setMonth(dueDate.getMonth() + i + 1); // First payment is next month

        payments.push({
            id: `payment_${installmentId}_${i + 1}`,
            installmentId,
            amount: monthlyPayment,
            dueDate: dueDate.getTime(),
            status: 'pending',
        });
    }

    return payments;
};

// Check if product qualifies for installments
export const isEligibleForInstallments = (price: number): boolean => {
    return INSTALLMENT_CONFIG.enabled && price >= INSTALLMENT_CONFIG.minAmount;
};

// Get next payment date
export const getNextPaymentDate = (installment: Installment): number | null => {
    const pendingPayments = installment.payments.filter(p => p.status === 'pending');
    if (pendingPayments.length === 0) return null;

    // Sort by due date and get the earliest
    const sortedPayments = pendingPayments.sort((a, b) => a.dueDate - b.dueDate);
    return sortedPayments[0].dueDate;
};

// Check if payment is overdue
export const isPaymentOverdue = (payment: InstallmentPayment): boolean => {
    if (payment.status === 'paid') return false;
    return Date.now() > payment.dueDate;
};

// Update overdue payments
export const updateOverduePayments = (installment: Installment): Installment => {
    const updatedPayments = installment.payments.map(payment => {
        if (isPaymentOverdue(payment) && payment.status === 'pending') {
            return { ...payment, status: 'overdue' as const };
        }
        return payment;
    });

    return { ...installment, payments: updatedPayments };
};

// Calculate payment progress percentage
export const calculatePaymentProgress = (installment: Installment): number => {
    const totalPayments = installment.duration;
    const paidPayments = installment.paidInstallments;
    return (paidPayments / totalPayments) * 100;
};

// Format currency
export const formatCurrency = (amount: number): string => {
    return `₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

// Format installment display (e.g., "From ₦3,500/month")
export const formatInstallmentDisplay = (price: number): string => {
    if (!isEligibleForInstallments(price)) return '';

    // Get the lowest monthly payment (12 months plan)
    const lowestMonthly = calculateMonthlyPayment(price, '12-months');
    return `From ${formatCurrency(lowestMonthly)}/month`;
};

// Get installment status color
export const getInstallmentStatusColor = (status: Installment['status']): string => {
    switch (status) {
        case 'active':
            return 'text-blue-600 bg-blue-100';
        case 'completed':
            return 'text-green-600 bg-green-100';
        case 'defaulted':
            return 'text-red-600 bg-red-100';
        case 'cancelled':
            return 'text-gray-600 bg-gray-100';
        default:
            return 'text-gray-600 bg-gray-100';
    }
};

// Get payment status color
export const getPaymentStatusColor = (status: InstallmentPayment['status']): string => {
    switch (status) {
        case 'paid':
            return 'text-green-600 bg-green-100';
        case 'pending':
            return 'text-yellow-600 bg-yellow-100';
        case 'overdue':
            return 'text-red-600 bg-red-100';
        default:
            return 'text-gray-600 bg-gray-100';
    }
};
