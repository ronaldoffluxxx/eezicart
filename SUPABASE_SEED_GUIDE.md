# How to Seed Products in Supabase

## Step 1: Get Your Vendor ID

1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Run this query to find a vendor user:

```sql
SELECT id, name, email, user_type 
FROM profiles 
WHERE user_type = 'vendor' 
LIMIT 1;
```

4. Copy the `id` value (it will look like: `550e8400-e29b-41d4-a716-446655440000`)

## Step 2: Update the Seed Script

1. Open `supabase/seed_products.sql`
2. Find all instances of `'YOUR_VENDOR_ID_HERE'` (there are 40 of them)
3. Replace with your actual vendor ID from Step 1

**Quick Replace:**
- Press `Ctrl+H` (or `Cmd+H` on Mac)
- Find: `YOUR_VENDOR_ID_HERE`
- Replace with: `your-actual-vendor-id-here`
- Click "Replace All"

## Step 3: Run the Seed Script

1. Go back to Supabase **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase/seed_products.sql`
4. Paste into the SQL Editor
5. Click **Run** or press `Ctrl+Enter`

## Step 4: Verify

Run this query to check if products were added:

```sql
SELECT COUNT(*) as total_products FROM products;
```

You should see `40` products.

## What Gets Seeded

- **10 Fashion items** (shirts, bags, shoes, accessories)
- **10 Electronics** (earbuds, speakers, power banks, etc.)
- **5 Sports items** (yoga mats, dumbbells, running shoes)
- **5 Home & Living** (pillows, clocks, bedsheets)
- **5 Beauty & Health** (skincare, makeup, perfumes)
- **3 Books**
- **2 Food items**

All products have:
- Realistic prices (₦3,500 - ₦45,000)
- Stock quantities
- Ratings and review counts
- Nigerian locations (Lagos, Abuja, etc.)
- Product images from Unsplash

## Troubleshooting

**Error: "vendor_id violates foreign key constraint"**
- You didn't replace `YOUR_VENDOR_ID_HERE` with a real vendor ID
- Or the vendor ID doesn't exist in your profiles table

**Error: "column does not exist"**
- Your products table schema might be different
- Check that you've run the schema.sql file first

**No products showing in app**
- Clear your browser cache
- Check browser console for errors
- Verify products exist: `SELECT * FROM products LIMIT 5;`

## Next Steps

After seeding:
1. Refresh your app at http://localhost:3000/products
2. Products should now load from Supabase
3. Click on any product to view details
4. Product IDs will now be persistent!
