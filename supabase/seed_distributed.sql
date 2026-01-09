-- Clean up existing data
TRUNCATE TABLE properties, products CASCADE;

-- Note: We assume users already exist or will be created. 
-- For this seed, we will rely on the existing 'vendor' and 'landlord' profiles we created earlier.
-- If they don't exist, this script might fail on foreign keys unless we mock them.
-- To be safe, we will fetch IDs dynamically if possible, or use the hardcoded ones from previous examples if they are stable.
-- Assuming the triggered profiles exists.

-- Let's create some guaranteed test users in auth.users if possible? No, can't insert into auth.users easily from SQL editor.
-- So we assume the user has run 'heal_profiles.sql' and has valid profiles.

-- We will use a DO block to find valid vendor/landlord IDs or fallback to a placeholder.
DO $$
DECLARE
    v_vendor_id UUID;
    v_landlord_id UUID;
BEGIN
    -- Try to get a vendor
    SELECT id INTO v_vendor_id FROM profiles WHERE user_type = 'vendor' LIMIT 1;
    -- Try to get a landlord
    SELECT id INTO v_landlord_id FROM profiles WHERE user_type = 'landlord' LIMIT 1;

    -- If no vendor/landlord, we can't seed properly. But typically the user has created one.
    -- If null, we might insert a dummy profile if RLS allows, but RLS blocks inserts usually.
    -- So we proceed assuming IDs are found. If not, the inserts below might fail or be skipped.

    IF v_vendor_id IS NOT NULL THEN
        -- 1. LAGOS PRODUCTS
        INSERT INTO products (name, description, price, category, stock, images, vendor_id, location_state, location_city, status) VALUES
        ('iPhone 14 Pro Max', 'Deep Purple, 256GB.', 1200000, 'electronics', 5, ARRAY['https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?auto=format&fit=crop&w=500&q=60'], v_vendor_id, 'Lagos', 'Ikeja', 'published'),
        ('Samsung 55" TV', '4K Smart TV.', 450000, 'electronics', 3, ARRAY['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=500&q=60'], v_vendor_id, 'Lagos', 'Surulere', 'published');

        -- 2. ABUJA PRODUCTS
        INSERT INTO products (name, description, price, category, stock, images, vendor_id, location_state, location_city, status) VALUES
        ('Office Chair', 'Ergonomic mesh chair.', 85000, 'furniture', 10, ARRAY['https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=500&q=60'], v_vendor_id, 'Abuja', 'Wuse', 'published');

        -- 3. KANO PRODUCTS
        INSERT INTO products (name, description, price, category, stock, images, vendor_id, location_state, location_city, status) VALUES
        ('Solar Generator', '2KVA Solar System.', 350000, 'electronics', 5, ARRAY['https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&w=500&q=60'], v_vendor_id, 'Kano', 'Kano', 'published');

        -- 4. ENUGU PRODUCTS
        INSERT INTO products (name, description, price, category, stock, images, vendor_id, location_state, location_city, status) VALUES
        ('Nike Sneakers', 'Air Max running shoes.', 45000, 'fashion', 8, ARRAY['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=60'], v_vendor_id, 'Enugu', 'Enugu', 'published'),
        ('Blender & Grinder', 'High speed blender for smoothies and beans.', 25000, 'home_appliances', 15, ARRAY['https://images.unsplash.com/photo-1570222094114-28a9d88aa907?auto=format&fit=crop&w=500&q=60'], v_vendor_id, 'Enugu', 'Nsukka', 'published');

        -- 5. OYO (IBADAN) PRODUCTS
        INSERT INTO products (name, description, price, category, stock, images, vendor_id, location_state, location_city, status) VALUES
        ('Gas Cooker 4-Burner', 'Table top gas cooker, durable.', 18000, 'home_appliances', 4, ARRAY['https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=500&q=60'], v_vendor_id, 'Oyo', 'Ibadan', 'published');

    END IF;

    IF v_landlord_id IS NOT NULL THEN
        -- 1. LAGOS PROPERTIES
        INSERT INTO properties (title, description, type, price, period, address, location_state, location_city, bedrooms, bathrooms, images, landlord_id, status) VALUES
        ('Luxury 3 Bed Apartment', 'Fully serviced apartment in Lekki Phase 1.', 'apartment', 5000000, 'yearly', 'Admiralty Way, Lekki', 'Lagos', 'Lekki', 3, 4, ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=500&q=60'], v_landlord_id, 'available'),
        ('Mini Flat in Yaba', 'Standard mini flat near Unilag.', 'apartment', 800000, 'yearly', 'Akoka, Yaba', 'Lagos', 'Yaba', 1, 1, ARRAY['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=500&q=60'], v_landlord_id, 'available');

        -- 2. ABUJA PROPERTIES
        INSERT INTO properties (title, description, type, price, period, address, location_state, location_city, bedrooms, bathrooms, images, landlord_id, status) VALUES
        ('4 Bedroom Duplex', 'Spacious duplex with BQ in Gwarinpa.', 'duplex', 7500000, 'yearly', '3rd Avenue, Gwarinpa', 'Abuja', 'Gwarinpa', 4, 5, ARRAY['https://images.unsplash.com/photo-1600596542815-2250657d2fc5?auto=format&fit=crop&w=500&q=60'], v_landlord_id, 'available');

        -- 3. RIVERS (PH) PROPERTIES
        INSERT INTO properties (title, description, type, price, period, address, location_state, location_city, bedrooms, bathrooms, images, landlord_id, status) VALUES
        ('2 Bedroom Flat', 'Clean flat in a secure estate.', 'apartment', 1200000, 'yearly', 'Peter Odili Road', 'Rivers', 'Port Harcourt', 2, 2, ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=500&q=60'], v_landlord_id, 'available');
    
        -- 4. KANO PROPERTIES
        INSERT INTO properties (title, description, type, price, period, address, location_state, location_city, bedrooms, bathrooms, images, landlord_id, status) VALUES
        ('Warehouse Space', 'Large warehouse for storage.', 'commercial', 3000000, 'yearly', 'Bompai Industrial Area', 'Kano', 'Kano', 0, 1, ARRAY['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=500&q=60'], v_landlord_id, 'available');
    END IF;

END $$;
