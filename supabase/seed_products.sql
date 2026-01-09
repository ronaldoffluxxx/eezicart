-- =============================================
-- SEED PRODUCTS DATA
-- =============================================
-- This script populates the products table with mock data for testing
-- Run this in your Supabase SQL Editor

-- First, get the vendor user ID (you'll need to replace this with actual vendor ID from your profiles table)
-- You can find vendor IDs by running: SELECT id, name, user_type FROM profiles WHERE user_type = 'vendor';

-- For this seed, we'll use a placeholder vendor_id that you should replace
-- Replace 'YOUR_VENDOR_ID_HERE' with an actual vendor UUID from your profiles table

-- FASHION PRODUCTS (10 items)
INSERT INTO products (vendor_id, name, description, category, subcategory, price, compare_at_price, stock, images, location_state, location_city, location_address, shipping_pickup_only, shipping_delivery_available, shipping_delivery_fee, rating, review_count, status, views, sales) VALUES
('YOUR_VENDOR_ID_HERE', 'Men''s Casual Shirt', 'Premium cotton casual shirt for men. Available in multiple colors and sizes.', 'fashion', 'Men''s Clothing', 8500, 12000, 45, ARRAY['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80'], 'Lagos', 'Ikeja', '123 Allen Avenue, Ikeja', false, true, 2000, 4.5, 23, 'published', 156, 12),
('YOUR_VENDOR_ID_HERE', 'Women''s Handbag', 'Elegant leather handbag with multiple compartments.', 'fashion', 'Bags', 15000, 20000, 20, ARRAY['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80'], 'Lagos', 'Lekki', 'Lekki Phase 1', false, true, 2000, 4.7, 34, 'published', 234, 18),
('YOUR_VENDOR_ID_HERE', 'Laptop Backpack', 'Durable laptop backpack with multiple compartments.', 'fashion', 'Bags', 12000, NULL, 35, ARRAY['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80'], 'Abuja', 'Wuse', 'Wuse Market', false, true, 2000, 4.3, 19, 'published', 189, 15),
('YOUR_VENDOR_ID_HERE', 'Sunglasses', 'Stylish UV protection sunglasses.', 'fashion', 'Accessories', 7500, NULL, 50, ARRAY['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80'], 'Lagos', 'Victoria Island', 'VI Shopping Mall', false, true, 2000, 4.6, 28, 'published', 267, 22),
('YOUR_VENDOR_ID_HERE', 'Designer Sneakers', 'Trendy designer sneakers for casual wear.', 'fashion', 'Shoes', 22000, 28000, 18, ARRAY['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80'], 'Rivers', 'Port Harcourt', 'GRA Phase 2', false, true, 2000, 4.8, 41, 'published', 345, 25),
('YOUR_VENDOR_ID_HERE', 'Women''s Dress', 'Elegant evening dress for special occasions.', 'fashion', 'Women''s Clothing', 18500, NULL, 12, ARRAY['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80'], 'Lagos', 'Surulere', 'Adeniran Ogunsanya', false, true, 2000, 4.4, 16, 'published', 198, 9),
('YOUR_VENDOR_ID_HERE', 'Men''s Wristwatch', 'Classic analog wristwatch with leather strap.', 'fashion', 'Accessories', 16000, 21000, 25, ARRAY['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80'], 'Abuja', 'Garki', 'Garki II', false, true, 2000, 4.5, 31, 'published', 278, 19),
('YOUR_VENDOR_ID_HERE', 'Leather Belt', 'Genuine leather belt for men.', 'fashion', 'Accessories', 5500, NULL, 40, ARRAY['https://images.unsplash.com/photo-1624222247344-550fb60583bb?w=800&q=80'], 'Kano', 'Kano Municipal', 'Kano Market', false, true, 2000, 4.2, 14, 'published', 145, 11),
('YOUR_VENDOR_ID_HERE', 'Women''s Sandals', 'Comfortable sandals for everyday wear.', 'fashion', 'Shoes', 9500, NULL, 30, ARRAY['https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&q=80'], 'Lagos', 'Yaba', 'Yaba Market', false, true, 2000, 4.3, 22, 'published', 201, 14),
('YOUR_VENDOR_ID_HERE', 'Men''s Suit', 'Professional 2-piece suit for business.', 'fashion', 'Men''s Clothing', 45000, 55000, 8, ARRAY['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80'], 'Lagos', 'Ikeja', 'Computer Village', false, true, 2000, 4.9, 37, 'published', 412, 8);

-- ELECTRONICS (10 items)
INSERT INTO products (vendor_id, name, description, category, subcategory, price, compare_at_price, stock, images, location_state, location_city, location_address, shipping_pickup_only, shipping_delivery_available, shipping_delivery_fee, rating, review_count, status, views, sales) VALUES
('YOUR_VENDOR_ID_HERE', 'Wireless Earbuds', 'High-quality wireless earbuds with noise cancellation.', 'electronics', 'Audio', 25000, NULL, 30, ARRAY['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80'], 'Lagos', 'Ikeja', 'Computer Village', false, true, 2000, 4.6, 45, 'published', 389, 28),
('YOUR_VENDOR_ID_HERE', 'Smart Watch', 'Feature-rich smartwatch with fitness tracking.', 'electronics', 'Accessories', 45000, 55000, 15, ARRAY['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'], 'Abuja', 'Wuse', 'Wuse Zone 5', false, true, 2000, 4.7, 52, 'published', 456, 31),
('YOUR_VENDOR_ID_HERE', 'Bluetooth Speaker', 'Portable Bluetooth speaker with amazing sound quality.', 'electronics', 'Audio', 18500, 25000, 40, ARRAY['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80'], 'Lagos', 'Lekki', 'Lekki Phase 1', false, true, 2000, 4.5, 38, 'published', 334, 24),
('YOUR_VENDOR_ID_HERE', 'Phone Case', 'Protective phone case with stylish design.', 'electronics', 'Accessories', 3500, NULL, 100, ARRAY['https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80'], 'Lagos', 'Ikeja', 'Computer Village', false, true, 2000, 4.3, 67, 'published', 289, 45),
('YOUR_VENDOR_ID_HERE', 'Laptop Stand', 'Adjustable aluminum laptop stand.', 'electronics', 'Accessories', 8500, NULL, 22, ARRAY['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80'], 'Abuja', 'Maitama', 'Maitama District', false, true, 2000, 4.4, 29, 'published', 245, 17),
('YOUR_VENDOR_ID_HERE', 'Wireless Mouse', 'Ergonomic wireless mouse for productivity.', 'electronics', 'Accessories', 6500, NULL, 45, ARRAY['https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&q=80'], 'Lagos', 'Ikeja', 'Computer Village', false, true, 2000, 4.5, 41, 'published', 312, 26),
('YOUR_VENDOR_ID_HERE', 'USB-C Hub', 'Multi-port USB-C hub for laptops.', 'electronics', 'Accessories', 12000, NULL, 28, ARRAY['https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&q=80'], 'Rivers', 'Port Harcourt', 'Trans Amadi', false, true, 2000, 4.6, 33, 'published', 278, 21),
('YOUR_VENDOR_ID_HERE', 'Power Bank 20000mAh', 'High-capacity power bank for mobile devices.', 'electronics', 'Accessories', 15000, 18000, 35, ARRAY['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80'], 'Lagos', 'Ikeja', 'Computer Village', false, true, 2000, 4.7, 48, 'published', 367, 29),
('YOUR_VENDOR_ID_HERE', 'Webcam HD', '1080p HD webcam for video calls.', 'electronics', 'Cameras', 22000, NULL, 18, ARRAY['https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&q=80'], 'Abuja', 'Garki', 'Garki Area 11', false, true, 2000, 4.5, 27, 'published', 234, 16),
('YOUR_VENDOR_ID_HERE', 'LED Desk Lamp', 'Adjustable LED desk lamp with USB charging.', 'electronics', 'Accessories', 9500, NULL, 32, ARRAY['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80'], 'Lagos', 'Victoria Island', 'Adeola Odeku', false, true, 2000, 4.4, 24, 'published', 198, 15);

-- SPORTS (5 items)
INSERT INTO products (vendor_id, name, description, category, subcategory, price, compare_at_price, stock, images, location_state, location_city, location_address, shipping_pickup_only, shipping_delivery_available, shipping_delivery_fee, rating, review_count, status, views, sales) VALUES
('YOUR_VENDOR_ID_HERE', 'Running Shoes', 'Comfortable running shoes for daily exercise.', 'sports', 'Shoes', 18000, NULL, 25, ARRAY['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'], 'Lagos', 'Surulere', 'Stadium Road', false, true, 2000, 4.6, 35, 'published', 289, 19),
('YOUR_VENDOR_ID_HERE', 'Yoga Mat', 'Non-slip yoga mat for comfortable workouts.', 'sports', 'Equipment', 5500, NULL, 60, ARRAY['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80'], 'Abuja', 'Gwarinpa', 'Gwarinpa Estate', false, true, 2000, 4.5, 42, 'published', 312, 28),
('YOUR_VENDOR_ID_HERE', 'Dumbbells Set', 'Adjustable dumbbells for home workouts.', 'sports', 'Equipment', 28000, 35000, 15, ARRAY['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80'], 'Lagos', 'Lekki', 'Lekki Phase 2', false, true, 2000, 4.7, 29, 'published', 267, 14),
('YOUR_VENDOR_ID_HERE', 'Sports Water Bottle', 'Insulated sports water bottle 1L.', 'sports', 'Accessories', 4500, NULL, 70, ARRAY['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80'], 'Rivers', 'Port Harcourt', 'GRA', false, true, 2000, 4.4, 51, 'published', 345, 34),
('YOUR_VENDOR_ID_HERE', 'Resistance Bands', 'Set of 5 resistance bands for strength training.', 'sports', 'Equipment', 8500, NULL, 40, ARRAY['https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&q=80'], 'Lagos', 'Ikeja', 'Allen Avenue', false, true, 2000, 4.5, 37, 'published', 298, 23);

-- HOME & LIVING (5 items)
INSERT INTO products (vendor_id, name, description, category, subcategory, price, compare_at_price, stock, images, location_state, location_city, location_address, shipping_pickup_only, shipping_delivery_available, shipping_delivery_fee, rating, review_count, status, views, sales) VALUES
('YOUR_VENDOR_ID_HERE', 'Throw Pillows Set', 'Decorative throw pillows set of 4.', 'home', 'Decor', 12000, NULL, 25, ARRAY['https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80'], 'Lagos', 'Yaba', 'Tejuosho Market', false, true, 2000, 4.3, 21, 'published', 178, 13),
('YOUR_VENDOR_ID_HERE', 'Wall Clock', 'Modern wall clock with silent movement.', 'home', 'Decor', 6500, NULL, 35, ARRAY['https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&q=80'], 'Abuja', 'Wuse', 'Wuse Market', false, true, 2000, 4.4, 26, 'published', 201, 16),
('YOUR_VENDOR_ID_HERE', 'Kitchen Knife Set', 'Professional kitchen knife set with stand.', 'home', 'Kitchen', 15500, 20000, 20, ARRAY['https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&q=80'], 'Lagos', 'Ikeja', 'Ikeja City Mall', false, true, 2000, 4.6, 32, 'published', 245, 18),
('YOUR_VENDOR_ID_HERE', 'Bedsheet Set', 'Premium cotton bedsheet set with pillowcases.', 'home', 'Bedding', 18000, NULL, 30, ARRAY['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80'], 'Lagos', 'Surulere', 'Balogun Market', false, true, 2000, 4.5, 28, 'published', 223, 17),
('YOUR_VENDOR_ID_HERE', 'Table Lamp', 'Elegant table lamp for bedroom or living room.', 'home', 'Decor', 9500, NULL, 28, ARRAY['https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80'], 'Abuja', 'Garki', 'Garki Shopping Plaza', false, true, 2000, 4.4, 19, 'published', 189, 12);

-- BEAUTY & HEALTH (5 items)
INSERT INTO products (vendor_id, name, description, category, subcategory, price, compare_at_price, stock, images, location_state, location_city, location_address, shipping_pickup_only, shipping_delivery_available, shipping_delivery_fee, rating, review_count, status, views, sales) VALUES
('YOUR_VENDOR_ID_HERE', 'Skincare Set', 'Complete skincare routine set for glowing skin.', 'beauty', 'Skincare', 25000, 32000, 22, ARRAY['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80'], 'Lagos', 'Victoria Island', 'Adeola Odeku', false, true, 2000, 4.7, 44, 'published', 356, 26),
('YOUR_VENDOR_ID_HERE', 'Hair Dryer', 'Professional hair dryer with multiple settings.', 'beauty', 'Hair Care', 18500, NULL, 18, ARRAY['https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&q=80'], 'Lagos', 'Lekki', 'Lekki Phase 1', false, true, 2000, 4.5, 31, 'published', 267, 19),
('YOUR_VENDOR_ID_HERE', 'Makeup Brush Set', 'Professional makeup brush set with case.', 'beauty', 'Makeup', 12000, NULL, 30, ARRAY['https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80'], 'Abuja', 'Wuse', 'Wuse Zone 4', false, true, 2000, 4.6, 38, 'published', 298, 22),
('YOUR_VENDOR_ID_HERE', 'Perfume Set', 'Luxury perfume gift set for men and women.', 'beauty', 'Fragrances', 35000, 42000, 15, ARRAY['https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80'], 'Lagos', 'Victoria Island', 'Palms Shopping Mall', false, true, 2000, 4.8, 47, 'published', 423, 21),
('YOUR_VENDOR_ID_HERE', 'Face Mask Pack', 'Hydrating face mask pack of 10.', 'beauty', 'Skincare', 8500, NULL, 45, ARRAY['https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80'], 'Lagos', 'Ikeja', 'Ikeja City Mall', false, true, 2000, 4.4, 36, 'published', 289, 24);

-- BOOKS & MEDIA (3 items)
INSERT INTO products (vendor_id, name, description, category, subcategory, price, compare_at_price, stock, images, location_state, location_city, location_address, shipping_pickup_only, shipping_delivery_available, shipping_delivery_fee, rating, review_count, status, views, sales) VALUES
('YOUR_VENDOR_ID_HERE', 'Business Strategy Book', 'Best-selling business strategy guide.', 'books', 'Books', 5500, NULL, 40, ARRAY['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80'], 'Lagos', 'Yaba', 'Yaba Market', false, true, 2000, 4.5, 28, 'published', 234, 19),
('YOUR_VENDOR_ID_HERE', 'Motivational Book Set', 'Set of 3 motivational books.', 'books', 'Books', 12000, 15000, 25, ARRAY['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80'], 'Abuja', 'Garki', 'Garki II', false, true, 2000, 4.6, 33, 'published', 267, 21),
('YOUR_VENDOR_ID_HERE', 'Cookbook Collection', 'Nigerian cuisine cookbook collection.', 'books', 'Books', 8500, NULL, 30, ARRAY['https://images.unsplash.com/photo-1589998059171-988d887df646?w=800&q=80'], 'Lagos', 'Surulere', 'Adeniran Ogunsanya', false, true, 2000, 4.4, 24, 'published', 198, 15);

-- FOOD & GROCERIES (2 items)
INSERT INTO products (vendor_id, name, description, category, subcategory, price, compare_at_price, stock, images, location_state, location_city, location_address, shipping_pickup_only, shipping_delivery_available, shipping_delivery_fee, rating, review_count, status, views, sales) VALUES
('YOUR_VENDOR_ID_HERE', 'Organic Honey 500g', 'Pure organic honey from local farms.', 'food', 'Packaged Foods', 4500, NULL, 50, ARRAY['https://images.unsplash.com/photo-1587049352846-4a222e784210?w=800&q=80'], 'Lagos', 'Ikeja', 'Ikeja Market', false, true, 2000, 4.5, 41, 'published', 312, 27),
('YOUR_VENDOR_ID_HERE', 'Spice Collection Set', 'Complete Nigerian spice collection.', 'food', 'Packaged Foods', 6500, NULL, 35, ARRAY['https://images.unsplash.com/photo-1596040033229-a0b3b83b6e9f?w=800&q=80'], 'Abuja', 'Wuse', 'Wuse Market', false, true, 2000, 4.3, 29, 'published', 245, 18);

-- Success message
SELECT 'Products seeded successfully! Total: 40 products' AS message;
