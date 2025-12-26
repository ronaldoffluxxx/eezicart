-- Fix RLS for Products and Properties
-- Run this in Supabase SQL Editor to make products visible

-- 1. Enable RLS (Security Best Practice)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies to start fresh
DROP POLICY IF EXISTS "Public can view published products" ON products;
DROP POLICY IF EXISTS "Vendors can insert own products" ON products;
DROP POLICY IF EXISTS "Vendors can update own products" ON products;
DROP POLICY IF EXISTS "Vendors can delete own products" ON products;

DROP POLICY IF EXISTS "Public can view available properties" ON properties;
DROP POLICY IF EXISTS "Landlords can insert own properties" ON properties;
DROP POLICY IF EXISTS "Landlords can update own properties" ON properties;
DROP POLICY IF EXISTS "Landlords can delete own properties" ON properties;

-- 3. Create Product Policies

-- Anyone (even logged out) can see 'published' products
CREATE POLICY "Public can view published products" ON products
  FOR SELECT USING (status = 'published');

-- Vendors can Insert (must set vendor_id to themselves)
CREATE POLICY "Vendors can insert own products" ON products
  FOR INSERT WITH CHECK (auth.uid() = vendor_id);

-- Vendors can Update/Delete their own
CREATE POLICY "Vendors can update own products" ON products
  FOR UPDATE USING (auth.uid() = vendor_id);

CREATE POLICY "Vendors can delete own products" ON products
  FOR DELETE USING (auth.uid() = vendor_id);

-- 4. Create Property Policies

-- Anyone can see 'available' properties
CREATE POLICY "Public can view available properties" ON properties
  FOR SELECT USING (status = 'available');

-- Landlords can Insert
CREATE POLICY "Landlords can insert own properties" ON properties
  FOR INSERT WITH CHECK (auth.uid() = landlord_id);

-- Landlords can Update/Delete
CREATE POLICY "Landlords can update own properties" ON properties
  FOR UPDATE USING (auth.uid() = landlord_id);

CREATE POLICY "Landlords can delete own properties" ON properties
  FOR DELETE USING (auth.uid() = landlord_id);
