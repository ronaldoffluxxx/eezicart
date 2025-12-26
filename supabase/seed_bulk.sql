-- Bulk Seed Data
-- Run this AFTER running seed.sql and replacing the UUIDs

-- NOTE: You MUST replace 'f10e0d5a-8871-45b8-9dee-50217fa11911' and '8ffed2bc-4933-4386-bd61-08085104a6be' with actual user IDs from your Supabase Users table

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
-- Fashion (Men)
('f10e0d5a-8871-45b8-9dee-50217fa11911', 'Classic White Tee', 'Premium cotton t-shirt', 5000, 7000, 'fashion', 'Men''s Clothing', 50, ARRAY['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80'], 'Lagos', 'Yaba', true, 1500, 'published'),
('f10e0d5a-8871-45b8-9dee-50217fa11911', 'Slim Fit Jeans', 'Dark blue denim jeans', 12000, 15000, 'fashion', 'Men''s Clothing', 30, ARRAY['https://images.unsplash.com/photo-1542272617-08f08630329f?w=800&q=80'], 'Lagos', 'Yaba', true, 1500, 'published'),
('f10e0d5a-8871-45b8-9dee-50217fa11911', 'Leather Chelsea Boots', 'Brown genuine leather boots', 35000, 45000, 'fashion', 'Men''s Shoes', 15, ARRAY['https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80'], 'Lagos', 'Lekki', true, 2500, 'published'),

-- Fashion (Women)
('f10e0d5a-8871-45b8-9dee-50217fa11911', 'Floral Summer Dress', 'Lightweight summer dress', 18000, 22000, 'fashion', 'Women''s Clothing', 25, ARRAY['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80'], 'Abuja', 'Wuse', true, 2000, 'published'),
('f10e0d5a-8871-45b8-9dee-50217fa11911', 'High Heels', 'Red stiletto heels', 25000, 30000, 'fashion', 'Women''s Shoes', 20, ARRAY['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80'], 'Abuja', 'Wuse', true, 2000, 'published'),
('f10e0d5a-8871-45b8-9dee-50217fa11911', 'Gold Plated Necklace', '18k gold plated necklace', 15000, NULL, 'fashion', 'Accessories', 40, ARRAY['https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=800&q=80'], 'Lagos', 'Ikeja', true, 1500, 'published'),

-- Electronics
('f10e0d5a-8871-45b8-9dee-50217fa11911', 'iPhone 13 Pro', 'Used iPhone 13 Pro 256GB', 450000, 480000, 'electronics', 'Phones', 5, ARRAY['https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=800&q=80'], 'Lagos', 'Ikeja', true, 3000, 'published'),
('f10e0d5a-8871-45b8-9dee-50217fa11911', 'Samsung Galaxy S21', 'Samsung Galaxy S21 Ultra', 380000, 420000, 'electronics', 'Phones', 8, ARRAY['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80'], 'Lagos', 'Ikeja', true, 3000, 'published'),
('f10e0d5a-8871-45b8-9dee-50217fa11911', 'MacBook Air M1', 'Apple MacBook Air M1 Chip', 650000, 700000, 'electronics', 'Laptops', 3, ARRAY['https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80'], 'Lagos', 'Lekki', true, 5000, 'published'),
('f10e0d5a-8871-45b8-9dee-50217fa11911', 'Sony WH-1000XM4', 'Noise cancelling headphones', 180000, 200000, 'electronics', 'Audio', 10, ARRAY['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80'], 'Lagos', 'Surulere', true, 2000, 'published'),

-- Home & Living
('f10e0d5a-8871-45b8-9dee-50217fa11911', 'Modern Sofa Set', 'Grey 3-seater sofa', 250000, 300000, 'home', 'Furniture', 2, ARRAY['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'], 'Lagos', 'Lekki', true, 15000, 'published'),
('f10e0d5a-8871-45b8-9dee-50217fa11911', 'Wooden Coffee Table', 'Oak wood coffee table', 45000, 60000, 'home', 'Furniture', 5, ARRAY['https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800&q=80'], 'Lagos', 'Yaba', true, 5000, 'published'),
('f10e0d5a-8871-45b8-9dee-50217fa11911', 'Ceramic Vase', 'Handmade ceramic vase', 8000, 12000, 'home', 'Decor', 15, ARRAY['https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800&q=80'], 'Abuja', 'Gwarinpa', true, 2000, 'published'),

-- Beauty
('f10e0d5a-8871-45b8-9dee-50217fa11911', 'Vitamin C Serum', 'Brightening facial serum', 6500, 8000, 'beauty', 'Skincare', 50, ARRAY['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80'], 'Rivers', 'Port Harcourt', true, 1500, 'published'),
('f10e0d5a-8871-45b8-9dee-50217fa11911', 'Matte Lipstick Set', 'Set of 6 matte lipsticks', 12000, 15000, 'beauty', 'Makeup', 30, ARRAY['https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=800&q=80'], 'Lagos', 'Ikeja', true, 1500, 'published'),

-- Sports
('f10e0d5a-8871-45b8-9dee-50217fa11911', 'Dumbbell Set', 'Adjustable dumbbell set 20kg', 45000, 55000, 'sports', 'Fitness', 10, ARRAY['https://images.unsplash.com/photo-1638536532686-d664be8966c6?w=800&q=80'], 'Lagos', 'Surulere', true, 4000, 'published'),
('f10e0d5a-8871-45b8-9dee-50217fa11911', 'Tennis Racket', 'Professional tennis racket', 25000, 32000, 'sports', 'Outdoor', 8, ARRAY['https://images.unsplash.com/photo-1622279456947-2e8d47b539c3?w=800&q=80'], 'Abuja', 'Maitama', true, 2000, 'published'),

-- Groceries
('f10e0d5a-8871-45b8-9dee-50217fa11911', 'Organic Honey', 'Pure wild honey 1L', 4500, NULL, 'groceries', 'Pantry', 100, ARRAY['https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80'], 'Lagos', 'Ikeja', true, 1000, 'published'),
('f10e0d5a-8871-45b8-9dee-50217fa11911', 'Rice 50kg', 'Premium parboiled rice', 65000, 72000, 'groceries', 'Staples', 40, ARRAY['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80'], 'Lagos', 'Ikeja', true, 3000, 'published'),

-- Vehicles
('f10e0d5a-8871-45b8-9dee-50217fa11911', 'Car Tires', 'Michelin 16 inch tires', 45000, NULL, 'automobile', 'Parts', 20, ARRAY['https://images.unsplash.com/photo-1578844251758-2f71da645217?w=800&q=80'], 'Lagos', 'Ladipo', true, 3000, 'published'),
('f10e0d5a-8871-45b8-9dee-50217fa11911', 'Car Vacuum Cleaner', 'Portable handheld vacuum', 15000, 18000, 'automobile', 'Accessories', 25, ARRAY['https://images.unsplash.com/photo-1555628532-67b147321689?w=800&q=80'], 'Lagos', 'Ikeja', true, 1500, 'published');

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
('8ffed2bc-4933-4386-bd61-08085104a6be', 'house', 'Modern 5 Bedroom Detached House', 'Luxury detached house with swimming pool via automated gate', 'Lagos', 'Lekki', 'Chevron Drive', 'Chevron Head Office', 8000000, 950000000, 1000000, 500000, true, 120, 5, 6, 7, 450, 'unfurnished', ARRAY['Pool', 'Cinema', 'BQ', 'Solar'], ARRAY['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'], 'available'),
('8ffed2bc-4933-4386-bd61-08085104a6be', 'apartment', '2 Bedroom Flat in Yaba', 'Clean newly built 2 bedroom flat', 'Lagos', 'Yaba', 'Alagomeji', 'Yaba Tech', 1200000, 1500000, 150000, 150000, false, NULL, 2, 2, 3, 100, 'unfurnished', ARRAY['Water', 'Security', 'Prepaid Meter'], ARRAY['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80'], 'available'),
('8ffed2bc-4933-4386-bd61-08085104a6be', 'studio', 'Self Contain in Surulere', 'Spacious room self contain', 'Lagos', 'Surulere', 'Bode Thomas', 'Shoprite', 500000, 600000, 50000, 50000, false, NULL, 1, 1, 1, 30, 'unfurnished', ARRAY['Water', 'Security'], ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'], 'available'),
('8ffed2bc-4933-4386-bd61-08085104a6be', 'duplex', 'Fully Furnished 3 Bedroom Terrace', 'Serviced terrace duplex', 'Abuja', 'Wuse', 'Wuse 2', 'Dominos', 4500000, 5000000, 200000, 200000, false, NULL, 3, 4, 5, 250, 'furnished', ARRAY['Generator', 'AC', 'Wifi'], ARRAY['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'], 'available');
