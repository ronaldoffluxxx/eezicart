# Supabase Setup Instructions

## Step 1: Create Environment Variables

1. Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```

2. Fill in your Supabase credentials in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Get these from: Supabase Dashboard → Settings → API

## Step 2: Set Up Storage Buckets

1. Go to Supabase Dashboard → Storage
2. Create three public buckets:
   - `product-images` (max 5MB)
   - `property-images` (max 10MB)
   - `avatars` (max 2MB)

3. For each bucket, set the following policy:

**Policy Name**: Public Access
**Policy Definition**:
```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'product-images' );

CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'product-images' AND auth.role() = 'authenticated' );

CREATE POLICY "Users can update own images"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'product-images' AND auth.role() = 'authenticated' );

CREATE POLICY "Users can delete own images"
ON storage.objects FOR DELETE
USING ( bucket_id = 'product-images' AND auth.role() = 'authenticated' );
```

Repeat for `property-images` and `avatars` buckets (change bucket_id).

## Step 3: Fix Permissions & Seed Data

1. Run the `fix_rls.sql` file in SQL Editor (This fixes the "new row violates row-level security policy" error).
2. Run the `seed.sql` file to create initial structure.
3. **Important**: Go to Authentication -> Users in Supabase Dashboard.
4. Copy the `User UID` for your test accounts.
5. In `seed_bulk.sql`, replace `'YOUR_VENDOR_UUID'` with the UUID of your vendor account.
6. Replace `'YOUR_LANDLORD_UUID'` with the UUID of your landlord account.
7. Run the `seed_bulk.sql` file.

## Step 4: Test Accounts

After running seed.sql, you can login with:

**Admin**:
- Email: admin@eezicart.com
- Password: Admin123

**Tenant/Shopper**:
- Email: john@example.com
- Password: User123

**Vendor**:
- Email: vendor@fashion.com
- Password: Vendor123

**Landlord**:
- Email: landlord@homes.com
- Password: Land123

## Step 5: Start Development Server

```bash
npm run dev
```

Open http://localhost:3000

## Troubleshooting

### Images not showing
- Check that storage buckets are created and public
- Verify bucket policies are set correctly
- Check browser console for CORS errors

### Login not working
- Verify environment variables are set correctly
- Check Supabase dashboard for user creation
- Look at browser console for errors

### Database errors
- Ensure schema.sql was run successfully
- Check that all tables exist in Supabase
- Verify RLS policies are set correctly
