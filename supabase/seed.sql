-- First, we need to create test users through Supabase Auth
-- Then run this script to seed products and properties

-- Note: Replace the UUIDs below with actual user IDs from Supabase Auth after creating test accounts

-- For testing, you can create these accounts:
-- 1. Vendor: vendor@test.com / Test123456
-- 2. Landlord: landlord@test.com / Test123456
-- 3. Tenant: tenant@test.com / Test123456

-- After creating accounts, get their UUIDs from Supabase Auth dashboard
-- Then replace 'YOUR_VENDOR_UUID' and 'YOUR_LANDLORD_UUID' below

-- Seed Products
INSERT INTO products (
  vendor_id,
  name,
  description,
  price,
  compare_at_price,
  category,
  subcategory,
  stock,
  images,
  location_state,
  location_city,
  shipping_delivery_available,
  shipping_delivery_fee,
  status
) VALUES
  -- Replace YOUR_VENDOR_UUID with the actual vendor user ID
  ('YOUR_VENDOR_UUID', 'Men''s Casual Shirt', 'Premium cotton casual shirt for men.', 8500, 12000, 'fashion', 'Men''s Clothing', 45, ARRAY['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80'], 'Lagos', 'Ikeja', true, 2000, 'published'),
  ('YOUR_VENDOR_UUID', 'Women''s Handbag', 'Elegant leather handbag.', 15000, 20000, 'fashion', 'Bags', 20, ARRAY['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80'], 'Lagos', 'Ikeja', true, 2000, 'published'),
  ('YOUR_VENDOR_UUID', 'Wireless Earbuds', 'High-quality wireless earbuds.', 25000, NULL, 'electronics', 'Audio', 30, ARRAY['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80'], 'Lagos', 'Ikeja', true, 2000, 'published'),
  ('YOUR_VENDOR_UUID', 'Smart Watch', 'Feature-rich smartwatch.', 45000, 55000, 'electronics', 'Accessories', 15, ARRAY['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'], 'Lagos', 'Ikeja', true, 2000, 'published'),
  ('YOUR_VENDOR_UUID', 'Running Shoes', 'Comfortable running shoes.', 18000, NULL, 'sports', 'Shoes', 25, ARRAY['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'], 'Lagos', 'Ikeja', true, 2000, 'published'),
  ('YOUR_VENDOR_UUID', 'Laptop Backpack', 'Durable laptop backpack.', 12000, NULL, 'fashion', 'Bags', 35, ARRAY['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80'], 'Lagos', 'Ikeja', true, 2000, 'published'),
  ('YOUR_VENDOR_UUID', 'Bluetooth Speaker', 'Portable Bluetooth speaker.', 18500, 25000, 'electronics', 'Audio', 40, ARRAY['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80'], 'Lagos', 'Ikeja', true, 2000, 'published'),
  ('YOUR_VENDOR_UUID', 'Sunglasses', 'Stylish UV protection sunglasses.', 7500, NULL, 'fashion', 'Accessories', 50, ARRAY['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80'], 'Lagos', 'Ikeja', true, 2000, 'published'),
  ('YOUR_VENDOR_UUID', 'Yoga Mat', 'Non-slip yoga mat.', 5500, NULL, 'sports', 'Fitness', 60, ARRAY['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80'], 'Lagos', 'Ikeja', true, 2000, 'published'),
  ('YOUR_VENDOR_UUID', 'Phone Case', 'Protective phone case.', 3500, NULL, 'electronics', 'Accessories', 100, ARRAY['https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80'], 'Lagos', 'Ikeja', true, 2000, 'published');

-- Seed Properties
INSERT INTO properties (
  landlord_id,
  type,
  title,
  description,
  location_state,
  location_city,
  location_address,
  location_landmarks,
  monthly_price,
  yearly_price,
  caution_fee,
  agency_fee,
  monthly_own_enabled,
  ownership_duration,
  bedrooms,
  bathrooms,
  toilets,
  size,
  furnishing,
  amenities,
  images,
  status
) VALUES
  -- Replace YOUR_LANDLORD_UUID with the actual landlord user ID
  ('YOUR_LANDLORD_UUID', 'apartment', '3 Bedroom Apartment in Lekki', 'Spacious 3-bedroom apartment with modern amenities.', 'Lagos', 'Lekki', '15 Admiralty Way, Lekki Phase 1', 'Near Lekki Toll Gate', 500000, 5500000, 500000, 250000, true, 120, 3, 3, 4, 120, 'furnished', ARRAY['Swimming Pool', 'Parking Space', '24hr Electricity', 'Security', 'Gym'], ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80'], 'available'),
  ('YOUR_LANDLORD_UUID', 'house', '4 Bedroom Duplex in Ikeja', 'Beautiful 4-bedroom duplex with spacious compound.', 'Lagos', 'Ikeja', '45 Allen Avenue, Ikeja GRA', 'Close to Ikeja City Mall', 750000, 8000000, 750000, 375000, false, NULL, 4, 4, 5, 200, 'semi-furnished', ARRAY['Parking Space', '24hr Electricity', 'Security', 'Generator', 'Water Supply'], ARRAY['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'], 'available');
