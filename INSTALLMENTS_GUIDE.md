# Installment Payment System - Setup Guide

## Overview

The installment payment system allows users to buy products and pay in monthly installments with interest. Products over ₦5,000 qualify for this feature.

## Payment Plans

| Duration | Interest Rate | Example (₦10,000 product) |
|----------|--------------|---------------------------|
| 3 months | 5% | ₦3,500/month (₦10,500 total) |
| 6 months | 10% | ₦1,833/month (₦11,000 total) |
| 12 months | 15% | ₦958/month (₦11,500 total) |

## Database Setup

Run the installments schema in your Supabase SQL Editor:

```bash
# File: supabase/installments_schema.sql
```

This creates:
- `installments` table - Stores installment plans
- `installment_payments` table - Tracks individual payments
- RLS policies for user and admin access
- Automatic triggers to update payment status

## Features Implemented

### 1. Product Display
- Products ≥ ₦5,000 show "or from ₦X/month" on product cards
- Installment calculator on product details page (for eligible products)

### 2. Installment Calculator Component
- Interactive plan selection (3, 6, 12 months)
- Real-time monthly payment calculation
- Interest breakdown display
- Total amount with interest

### 3. User Dashboard
- View all active and completed installment plans
- Payment progress tracking with visual progress bar
- Next payment due date display
- Payment history

### 4. Utility Functions
Located in `lib/utils/installments.ts`:
- `calculateInstallment()` - Calculate payment details
- `generatePaymentSchedule()` - Create payment schedule
- `isEligibleForInstallments()` - Check product eligibility
- `formatInstallmentDisplay()` - Format display text
- And more...

## How to Use

### For Users

1. **Browse Products**
   - Products over ₦5,000 show installment option
   - Click product to see installment calculator

2. **View Installment Plans**
   - Go to Profile → Installments
   - See all active and completed plans
   - Track payment progress

3. **Make Payments**
   - Click on an installment plan
   - View payment schedule
   - Make next payment

### For Admins

Admins can view all user installments through the admin panel (to be implemented).

## Configuration

Edit `lib/utils/installments.ts` to modify:

```typescript
export const INSTALLMENT_CONFIG = {
    enabled: true,
    minAmount: 5000, // Minimum product price
    plans: [
        { duration: 3, interestRate: 5, label: '3 Months' },
        { duration: 6, interestRate: 10, label: '6 Months' },
        { duration: 12, interestRate: 15, label: '12 Months' },
    ],
};
```

## Files Created

- `lib/types/index.ts` - Added installment types
- `lib/utils/installments.ts` - Utility functions
- `components/InstallmentCalculator.tsx` - Calculator component
- `app/profile/installments/page.tsx` - User dashboard
- `supabase/installments_schema.sql` - Database schema

## Files Modified

- `components/ProductCard.tsx` - Added monthly payment display
- `app/products/[id]/page.tsx` - Added calculator import

## Next Steps

To complete the installment system:

1. **Checkout Integration**
   - Add installment option in checkout flow
   - Process down payment (if required)
   - Create installment record on purchase

2. **Payment Processing**
   - Integrate with payment gateways
   - Handle installment payments
   - Send payment reminders

3. **Admin Panel**
   - View all installments
   - Monitor payment status
   - Handle defaults

## Testing

1. Browse products over ₦5,000
2. Check installment display on product cards
3. View installment calculator on product page
4. Navigate to Profile → Installments
5. Verify empty state shows correctly

## Notes

- First payment is due 30 days after purchase
- No hidden fees or charges
- Users can view payment schedule anytime
- Automatic status updates via database triggers
