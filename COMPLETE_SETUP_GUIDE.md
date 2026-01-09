# Complete Setup Guide - Products & Installments

## Current Status

✅ **Code Updated:**
- Products list page uses Supabase
- Product details page uses Supabase
- Installment calculator added to product details
- All changes pushed to GitHub

❌ **Database Not Seeded:**
- Your Supabase database has no products yet
- This is why products page shows "Loading..." forever

## Quick Fix - 3 Steps

### Step 1: Get a Vendor ID

1. Open **Supabase Dashboard** → **SQL Editor**
2. Run this query:

```sql
SELECT id, name, email, user_type 
FROM profiles 
WHERE user_type = 'vendor' 
LIMIT 1;
```

3. Copy the `id` value (looks like: `550e8400-e29b-41d4-a716-446655440000`)

**Don't have a vendor?** Create one:
```sql
-- First, sign up as a vendor through your app
-- OR manually insert one:
INSERT INTO profiles (id, name, email, user_type, location_state, location_city)
VALUES (
  gen_random_uuid(),
  'Test Vendor',
  'vendor@test.com',
  'vendor',
  'Lagos',
  'Ikeja'
)
RETURNING id;
```

### Step 2: Update Seed Script

1. Open `supabase/seed_products.sql`
2. Press `Ctrl+H` (Find & Replace)
3. Find: `YOUR_VENDOR_ID_HERE`
4. Replace with: `your-actual-vendor-id-from-step-1`
5. Click "Replace All" (40 replacements)

### Step 3: Run Seed Script

1. Go back to **Supabase SQL Editor**
2. Click "New Query"
3. Copy entire contents of `supabase/seed_products.sql`
4. Paste and click **Run**
5. You should see: "Products seeded successfully! Total: 40 products"

## Verify It Worked

Run this query:
```sql
SELECT COUNT(*) as total FROM products;
```

Should show `40`.

## Test the App

1. Go to http://localhost:3000/products
2. You should see 40 products!
3. Click any product to see details
4. Products ≥ ₦5,000 will show the **Buy Now, Pay Later** calculator
5. Select a payment plan (3, 6, or 12 months)
6. See monthly payment breakdown with interest

## What You Get

### Products Seeded:
- 10 Fashion items (₦5,500 - ₦45,000)
- 10 Electronics (₦3,500 - ₦45,000)
- 5 Sports items (₦4,500 - ₦28,000)
- 5 Home & Living (₦6,500 - ₦18,000)
- 5 Beauty & Health (₦8,500 - ₦35,000)
- 3 Books (₦5,500 - ₦12,000)
- 2 Food items (₦4,500 - ₦6,500)

### Installment Features:
- **3 months** - 5% interest
- **6 months** - 10% interest
- **12 months** - 15% interest
- Only for products ≥ ₦5,000
- Interactive calculator on product details
- Monthly payment display on product cards

## Troubleshooting

**Still seeing "Loading..."?**
- Check browser console for errors
- Verify Supabase env variables in `.env.local`
- Make sure you replaced ALL `YOUR_VENDOR_ID_HERE` instances

**Products show but no installment calculator?**
- Only products ≥ ₦5,000 show installments
- Try products like "Men's Suit" (₦45,000) or "Smart Watch" (₦45,000)

**"vendor_id violates foreign key constraint"?**
- The vendor ID doesn't exist in profiles table
- Go back to Step 1 and get a valid vendor ID

## Next Steps After Seeding

1. ✅ Products will load from Supabase
2. ✅ Product IDs will be persistent
3. ✅ Installment calculator will work
4. ✅ You can add more products through vendor dashboard
5. ✅ Ready for production deployment!
