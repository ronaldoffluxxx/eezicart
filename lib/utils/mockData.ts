import type { User, Product, Property, Order } from '@/lib/types';
import { NIGERIAN_STATES, PRODUCT_CATEGORIES } from '@/lib/constants/data';

// Generate unique ID
export const generateId = (prefix: string = ''): string => {
    return `${prefix}${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Generate mock users
export const generateMockUsers = (): User[] => {
    return [
        {
            id: 'user_admin',
            name: 'Admin User',
            email: 'admin@eezicart.com',
            phone: '08012345678',
            password: 'Admin123',
            userType: 'admin',
            location: {
                state: 'Lagos',
                city: 'Ikeja',
            },
            walletBalance: 1000000,
            createdAt: Date.now() - 90 * 24 * 60 * 60 * 1000,
            status: 'active',
        },
        {
            id: 'user_tenant_1',
            name: 'John Doe',
            email: 'john@example.com',
            phone: '08098765432',
            password: 'User123',
            userType: 'tenant',
            location: {
                state: 'Lagos',
                city: 'Lekki',
            },
            avatar: undefined,
            walletBalance: 50000,
            createdAt: Date.now() - 60 * 24 * 60 * 60 * 1000,
            status: 'active',
        },
        {
            id: 'user_vendor_1',
            name: 'Fashion Hub',
            email: 'vendor@fashion.com',
            phone: '08087654321',
            password: 'Vendor123',
            userType: 'vendor',
            location: {
                state: 'Lagos',
                city: 'Ikeja',
            },
            businessName: 'Fashion Hub Lagos',
            businessCategory: 'Fashion',
            businessAddress: '123 Allen Avenue, Ikeja, Lagos',
            businessDescription: 'Premium fashion items for men and women',
            bankDetails: {
                bankName: 'GTBank (Guaranty Trust Bank)',
                accountNumber: '0123456789',
                accountName: 'Fashion Hub Lagos',
            },
            walletBalance: 150000,
            createdAt: Date.now() - 45 * 24 * 60 * 60 * 1000,
            status: 'active',
        },
        {
            id: 'user_landlord_1',
            name: 'James Property',
            email: 'landlord@homes.com',
            phone: '08076543210',
            password: 'Land123',
            userType: 'landlord',
            location: {
                state: 'Lagos',
                city: 'Victoria Island',
            },
            businessName: 'James Property Homes',
            bankDetails: {
                bankName: 'Access Bank',
                accountNumber: '9876543210',
                accountName: 'James Property Homes',
            },
            walletBalance: 500000,
            createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
            status: 'active',
        },
    ];
};

// Generate mock products
export const generateMockProducts = (): Product[] => {
    const vendors = ['user_vendor_1'];
    const products: Product[] = [];

    const productData = [
        // FASHION (10 products)
        {
            name: 'Men\'s Casual Shirt',
            description: 'Premium cotton casual shirt for men. Available in multiple colors and sizes.',
            category: 'fashion',
            subcategory: 'Men\'s Clothing',
            price: 8500,
            compareAtPrice: 12000,
            stock: 45,
            images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80'],
            location: { state: 'Lagos', city: 'Ikeja', address: '123 Allen Avenue, Ikeja' },
        },
        {
            name: 'Women\'s Handbag',
            description: 'Elegant leather handbag with multiple compartments.',
            category: 'fashion',
            subcategory: 'Bags',
            price: 15000,
            compareAtPrice: 20000,
            stock: 20,
            images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80'],
            location: { state: 'Lagos', city: 'Lekki', address: 'Lekki Phase 1' },
        },
        {
            name: 'Laptop Backpack',
            description: 'Durable laptop backpack with multiple compartments.',
            category: 'fashion',
            subcategory: 'Bags',
            price: 12000,
            stock: 35,
            images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80'],
            location: { state: 'Abuja', city: 'Wuse', address: 'Wuse Market' },
        },
        {
            name: 'Sunglasses',
            description: 'Stylish UV protection sunglasses.',
            category: 'fashion',
            subcategory: 'Accessories',
            price: 7500,
            stock: 50,
            images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80'],
            location: { state: 'Lagos', city: 'Victoria Island', address: 'VI Shopping Mall' },
        },
        {
            name: 'Designer Sneakers',
            description: 'Trendy designer sneakers for casual wear.',
            category: 'fashion',
            subcategory: 'Shoes',
            price: 22000,
            compareAtPrice: 28000,
            stock: 18,
            images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80'],
            location: { state: 'Rivers', city: 'Port Harcourt', address: 'GRA Phase 2' },
        },
        {
            name: 'Women\'s Dress',
            description: 'Elegant evening dress for special occasions.',
            category: 'fashion',
            subcategory: 'Women\'s Clothing',
            price: 18500,
            stock: 12,
            images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80'],
            location: { state: 'Lagos', city: 'Surulere', address: 'Adeniran Ogunsanya' },
        },
        {
            name: 'Men\'s Wristwatch',
            description: 'Classic analog wristwatch with leather strap.',
            category: 'fashion',
            subcategory: 'Accessories',
            price: 16000,
            compareAtPrice: 21000,
            stock: 25,
            images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80'],
            location: { state: 'Abuja', city: 'Garki', address: 'Garki II' },
        },
        {
            name: 'Leather Belt',
            description: 'Genuine leather belt for men.',
            category: 'fashion',
            subcategory: 'Accessories',
            price: 5500,
            stock: 40,
            images: ['https://images.unsplash.com/photo-1624222247344-550fb60583bb?w=800&q=80'],
            location: { state: 'Kano', city: 'Kano Municipal', address: 'Kano Market' },
        },
        {
            name: 'Women\'s Sandals',
            description: 'Comfortable sandals for everyday wear.',
            category: 'fashion',
            subcategory: 'Shoes',
            price: 9500,
            stock: 30,
            images: ['https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&q=80'],
            location: { state: 'Lagos', city: 'Yaba', address: 'Yaba Market' },
        },
        {
            name: 'Men\'s Suit',
            description: 'Professional 2-piece suit for business.',
            category: 'fashion',
            subcategory: 'Men\'s Clothing',
            price: 45000,
            compareAtPrice: 55000,
            stock: 8,
            images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80'],
            location: { state: 'Lagos', city: 'Ikeja', address: 'Computer Village' },
        },

        // ELECTRONICS (10 products)
        {
            name: 'Wireless Earbuds',
            description: 'High-quality wireless earbuds with noise cancellation.',
            category: 'electronics',
            subcategory: 'Audio',
            price: 25000,
            stock: 30,
            images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80'],
            location: { state: 'Lagos', city: 'Ikeja', address: 'Computer Village' },
        },
        {
            name: 'Smart Watch',
            description: 'Feature-rich smartwatch with fitness tracking.',
            category: 'electronics',
            subcategory: 'Accessories',
            price: 45000,
            compareAtPrice: 55000,
            stock: 15,
            images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'],
            location: { state: 'Abuja', city: 'Wuse', address: 'Wuse Zone 5' },
        },
        {
            name: 'Bluetooth Speaker',
            description: 'Portable Bluetooth speaker with amazing sound quality.',
            category: 'electronics',
            subcategory: 'Audio',
            price: 18500,
            compareAtPrice: 25000,
            stock: 40,
            images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80'],
            location: { state: 'Lagos', city: 'Lekki', address: 'Lekki Phase 1' },
        },
        {
            name: 'Phone Case',
            description: 'Protective phone case with stylish design.',
            category: 'electronics',
            subcategory: 'Accessories',
            price: 3500,
            stock: 100,
            images: ['https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80'],
            location: { state: 'Lagos', city: 'Ikeja', address: 'Computer Village' },
        },
        {
            name: 'Laptop Stand',
            description: 'Adjustable aluminum laptop stand.',
            category: 'electronics',
            subcategory: 'Accessories',
            price: 8500,
            stock: 22,
            images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80'],
            location: { state: 'Abuja', city: 'Maitama', address: 'Maitama District' },
        },
        {
            name: 'Wireless Mouse',
            description: 'Ergonomic wireless mouse for productivity.',
            category: 'electronics',
            subcategory: 'Accessories',
            price: 6500,
            stock: 45,
            images: ['https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&q=80'],
            location: { state: 'Lagos', city: 'Ikeja', address: 'Computer Village' },
        },
        {
            name: 'USB-C Hub',
            description: 'Multi-port USB-C hub for laptops.',
            category: 'electronics',
            subcategory: 'Accessories',
            price: 12000,
            stock: 28,
            images: ['https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&q=80'],
            location: { state: 'Rivers', city: 'Port Harcourt', address: 'Trans Amadi' },
        },
        {
            name: 'Power Bank 20000mAh',
            description: 'High-capacity power bank for mobile devices.',
            category: 'electronics',
            subcategory: 'Accessories',
            price: 15000,
            compareAtPrice: 18000,
            stock: 35,
            images: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80'],
            location: { state: 'Lagos', city: 'Ikeja', address: 'Computer Village' },
        },
        {
            name: 'Webcam HD',
            description: '1080p HD webcam for video calls.',
            category: 'electronics',
            subcategory: 'Cameras',
            price: 22000,
            stock: 18,
            images: ['https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&q=80'],
            location: { state: 'Abuja', city: 'Garki', address: 'Garki Area 11' },
        },
        {
            name: 'LED Desk Lamp',
            description: 'Adjustable LED desk lamp with USB charging.',
            category: 'electronics',
            subcategory: 'Accessories',
            price: 9500,
            stock: 32,
            images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80'],
            location: { state: 'Lagos', city: 'Victoria Island', address: 'Adeola Odeku' },
        },

        // SPORTS (5 products)
        {
            name: 'Running Shoes',
            description: 'Comfortable running shoes for daily exercise.',
            category: 'sports',
            subcategory: 'Shoes',
            price: 18000,
            stock: 25,
            images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'],
            location: { state: 'Lagos', city: 'Surulere', address: 'Stadium Road' },
        },
        {
            name: 'Yoga Mat',
            description: 'Non-slip yoga mat for comfortable workouts.',
            category: 'sports',
            subcategory: 'Equipment',
            price: 5500,
            stock: 60,
            images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80'],
            location: { state: 'Abuja', city: 'Gwarinpa', address: 'Gwarinpa Estate' },
        },
        {
            name: 'Dumbbells Set',
            description: 'Adjustable dumbbells for home workouts.',
            category: 'sports',
            subcategory: 'Equipment',
            price: 28000,
            compareAtPrice: 35000,
            stock: 15,
            images: ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80'],
            location: { state: 'Lagos', city: 'Lekki', address: 'Lekki Phase 2' },
        },
        {
            name: 'Sports Water Bottle',
            description: 'Insulated sports water bottle 1L.',
            category: 'sports',
            subcategory: 'Accessories',
            price: 4500,
            stock: 70,
            images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80'],
            location: { state: 'Rivers', city: 'Port Harcourt', address: 'GRA' },
        },
        {
            name: 'Resistance Bands',
            description: 'Set of 5 resistance bands for strength training.',
            category: 'sports',
            subcategory: 'Equipment',
            price: 8500,
            stock: 40,
            images: ['https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&q=80'],
            location: { state: 'Lagos', city: 'Ikeja', address: 'Allen Avenue' },
        },

        // HOME & LIVING (5 products)
        {
            name: 'Throw Pillows Set',
            description: 'Decorative throw pillows set of 4.',
            category: 'home',
            subcategory: 'Decor',
            price: 12000,
            stock: 25,
            images: ['https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80'],
            location: { state: 'Lagos', city: 'Yaba', address: 'Tejuosho Market' },
        },
        {
            name: 'Wall Clock',
            description: 'Modern wall clock with silent movement.',
            category: 'home',
            subcategory: 'Decor',
            price: 6500,
            stock: 35,
            images: ['https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&q=80'],
            location: { state: 'Abuja', city: 'Wuse', address: 'Wuse Market' },
        },
        {
            name: 'Kitchen Knife Set',
            description: 'Professional kitchen knife set with stand.',
            category: 'home',
            subcategory: 'Kitchen',
            price: 15500,
            compareAtPrice: 20000,
            stock: 20,
            images: ['https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&q=80'],
            location: { state: 'Lagos', city: 'Ikeja', address: 'Ikeja City Mall' },
        },
        {
            name: 'Bedsheet Set',
            description: 'Premium cotton bedsheet set with pillowcases.',
            category: 'home',
            subcategory: 'Bedding',
            price: 18000,
            stock: 30,
            images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80'],
            location: { state: 'Lagos', city: 'Surulere', address: 'Balogun Market' },
        },
        {
            name: 'Table Lamp',
            description: 'Elegant table lamp for bedroom or living room.',
            category: 'home',
            subcategory: 'Decor',
            price: 9500,
            stock: 28,
            images: ['https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80'],
            location: { state: 'Abuja', city: 'Garki', address: 'Garki Shopping Plaza' },
        },

        // BEAUTY & HEALTH (5 products)
        {
            name: 'Skincare Set',
            description: 'Complete skincare routine set for glowing skin.',
            category: 'beauty',
            subcategory: 'Skincare',
            price: 25000,
            compareAtPrice: 32000,
            stock: 22,
            images: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80'],
            location: { state: 'Lagos', city: 'Victoria Island', address: 'Adeola Odeku' },
        },
        {
            name: 'Hair Dryer',
            description: 'Professional hair dryer with multiple settings.',
            category: 'beauty',
            subcategory: 'Hair Care',
            price: 18500,
            stock: 18,
            images: ['https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&q=80'],
            location: { state: 'Lagos', city: 'Lekki', address: 'Lekki Phase 1' },
        },
        {
            name: 'Makeup Brush Set',
            description: 'Professional makeup brush set with case.',
            category: 'beauty',
            subcategory: 'Makeup',
            price: 12000,
            stock: 30,
            images: ['https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80'],
            location: { state: 'Abuja', city: 'Wuse', address: 'Wuse Zone 4' },
        },
        {
            name: 'Perfume Set',
            description: 'Luxury perfume gift set for men and women.',
            category: 'beauty',
            subcategory: 'Fragrances',
            price: 35000,
            compareAtPrice: 42000,
            stock: 15,
            images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80'],
            location: { state: 'Lagos', city: 'Victoria Island', address: 'Palms Shopping Mall' },
        },
        {
            name: 'Face Mask Pack',
            description: 'Hydrating face mask pack of 10.',
            category: 'beauty',
            subcategory: 'Skincare',
            price: 8500,
            stock: 45,
            images: ['https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80'],
            location: { state: 'Lagos', city: 'Ikeja', address: 'Ikeja City Mall' },
        },

        // BOOKS & MEDIA (3 products)
        {
            name: 'Business Strategy Book',
            description: 'Best-selling business strategy guide.',
            category: 'books',
            subcategory: 'Books',
            price: 5500,
            stock: 40,
            images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80'],
            location: { state: 'Lagos', city: 'Yaba', address: 'Yaba Market' },
        },
        {
            name: 'Motivational Book Set',
            description: 'Set of 3 motivational books.',
            category: 'books',
            subcategory: 'Books',
            price: 12000,
            compareAtPrice: 15000,
            stock: 25,
            images: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80'],
            location: { state: 'Abuja', city: 'Garki', address: 'Garki II' },
        },
        {
            name: 'Cookbook Collection',
            description: 'Nigerian cuisine cookbook collection.',
            category: 'books',
            subcategory: 'Books',
            price: 8500,
            stock: 30,
            images: ['https://images.unsplash.com/photo-1589998059171-988d887df646?w=800&q=80'],
            location: { state: 'Lagos', city: 'Surulere', address: 'Adeniran Ogunsanya' },
        },

        // VEHICLES (5 products)
        {
            name: 'Toyota Camry 2020',
            description: 'Clean foreign used Toyota Camry 2020. Automatic transmission, low mileage.',
            category: 'vehicles',
            subcategory: 'Cars',
            price: 8500000,
            stock: 2,
            images: ['https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?w=800&q=80'],
            location: { state: 'Lagos', city: 'Ikeja', address: 'Alausa' },
        },
        {
            name: 'Bajaj Tricycle (Keke)',
            description: 'Brand new Bajaj Tricycle. Durable and fuel efficient.',
            category: 'vehicles',
            subcategory: 'Tricycles',
            price: 1200000,
            stock: 10,
            images: ['https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80'],
            location: { state: 'Kano', city: 'Kano Municipal', address: 'Kano Market' },
        },
        {
            name: 'Yamaha Motorcycle',
            description: 'Sporty Yamaha motorcycle for daily commute.',
            category: 'vehicles',
            subcategory: 'Motorcycles',
            price: 1500000,
            stock: 5,
            images: ['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80'],
            location: { state: 'Abuja', city: 'Garki', address: 'Garki Area 3' },
        },
        {
            name: 'Toyota Corolla 2018',
            description: 'Reliable Toyota Corolla 2018. Very neat interior and exterior.',
            category: 'vehicles',
            subcategory: 'Cars',
            price: 6500000,
            stock: 3,
            images: ['https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800&q=80'],
            location: { state: 'Lagos', city: 'Lekki', address: 'Lekki Phase 1' },
        },
        {
            name: 'Honda Civic 2019',
            description: 'Sporty Honda Civic 2019 with sunroof and leather seats.',
            category: 'vehicles',
            subcategory: 'Cars',
            price: 7200000,
            stock: 4,
            images: ['https://images.unsplash.com/photo-1606152421811-aa91107bac82?w=800&q=80'],
            location: { state: 'Rivers', city: 'Port Harcourt', address: 'GRA Phase 2' },
        },

        // FOOD & GROCERIES (2 products)
        {
            name: 'Organic Honey 500g',
            description: 'Pure organic honey from local farms.',
            category: 'food',
            subcategory: 'Packaged Foods',
            price: 4500,
            stock: 50,
            images: ['https://images.unsplash.com/photo-1587049352846-4a222e784210?w=800&q=80'],
            location: { state: 'Lagos', city: 'Ikeja', address: 'Ikeja Market' },
        },
        {
            name: 'Spice Collection Set',
            description: 'Complete Nigerian spice collection.',
            category: 'food',
            subcategory: 'Packaged Foods',
            price: 6500,
            stock: 35,
            images: ['https://images.unsplash.com/photo-1596040033229-a0b3b83b6e9f?w=800&q=80'],
            location: { state: 'Abuja', city: 'Wuse', address: 'Wuse Market' },
        },
    ];

    productData.forEach((data, index) => {
        products.push({
            id: generateId('prod_'),
            vendorId: vendors[0],
            ...data,
            shipping: {
                pickupOnly: false,
                deliveryAvailable: true,
                deliveryFee: 2000,
            },
            rating: 4 + Math.random(),
            reviewCount: Math.floor(Math.random() * 50) + 10,
            status: 'published',
            createdAt: Date.now() - (30 - index) * 24 * 60 * 60 * 1000,
            views: Math.floor(Math.random() * 500) + 100,
            sales: Math.floor(Math.random() * 50) + 5,
        });
    });

    return products;
};

// Generate mock properties
export const generateMockProperties = (): Property[] => {
    const properties: Property[] = [];

    const propertyData = [
        {
            type: 'apartment' as const,
            title: '3 Bedroom Apartment in Lekki',
            description: 'Spacious 3-bedroom apartment with modern amenities in the heart of Lekki.',
            location: {
                state: 'Lagos',
                city: 'Lekki',
                address: '15 Admiralty Way, Lekki Phase 1',
                landmarks: 'Near Lekki Toll Gate',
            },
            pricing: {
                monthly: 500000,
                yearly: 5500000,
                cautionFee: 500000,
                agencyFee: 250000,
                monthlyOwnEnabled: true,
                ownershipDuration: 120,
            },
            specs: {
                bedrooms: 3,
                bathrooms: 3,
                toilets: 4,
                size: 120,
                furnishing: 'furnished' as const,
            },
            amenities: ['Swimming Pool', 'Parking Space', '24hr Electricity', 'Security', 'Gym'],
            images: [
                'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
                'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
            ],
        },
        {
            type: 'house' as const,
            title: '4 Bedroom Duplex in Ikeja',
            description: 'Beautiful 4-bedroom duplex with spacious compound and parking.',
            location: {
                state: 'Lagos',
                city: 'Ikeja',
                address: '45 Allen Avenue, Ikeja GRA',
            },
            pricing: {
                monthly: 750000,
                yearly: 8000000,
                cautionFee: 750000,
                agencyFee: 375000,
                monthlyOwnEnabled: false,
            },
            specs: {
                bedrooms: 4,
                bathrooms: 4,
                toilets: 5,
                size: 200,
                furnishing: 'semi-furnished' as const,
            },
            amenities: ['Parking Space', '24hr Electricity', 'Security', 'Generator', 'Water Supply'],
            images: [
                'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
                'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
            ],
        },
    ];

    propertyData.forEach((data, index) => {
        properties.push({
            id: generateId('prop_'),
            landlordId: 'user_landlord_1',
            ...data,
            images: ['/placeholder-property.jpg'],
            availability: {
                status: 'available',
                availableFrom: Date.now(),
                minimumPeriod: 12,
            },
            rating: 4.5 + Math.random() * 0.5,
            reviewCount: Math.floor(Math.random() * 20) + 5,
            createdAt: Date.now() - (20 - index) * 24 * 60 * 60 * 1000,
            views: Math.floor(Math.random() * 200) + 50,
        });
    });

    return properties;
};

// Initialize mock data in localStorage
export const initializeMockData = (): void => {
    if (typeof window === 'undefined') return;

    // Always reinitialize to ensure data is fresh
    // This ensures test accounts are always available

    // Generate and save mock data
    const users = generateMockUsers();
    const products = generateMockProducts();
    const properties = generateMockProperties();

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('properties', JSON.stringify(properties));

    // Only initialize these if they don't exist
    if (!localStorage.getItem('orders')) {
        localStorage.setItem('orders', JSON.stringify([]));
    }
    if (!localStorage.getItem('rentals')) {
        localStorage.setItem('rentals', JSON.stringify([]));
    }
    if (!localStorage.getItem('transactions')) {
        localStorage.setItem('transactions', JSON.stringify([]));
    }
    if (!localStorage.getItem('reviews')) {
        localStorage.setItem('reviews', JSON.stringify([]));
    }
    if (!localStorage.getItem('notifications')) {
        localStorage.setItem('notifications', JSON.stringify([]));
    }

    console.log('Mock data initialized successfully');
    console.log('Test accounts:', users.map(u => ({ email: u.email, password: u.password, type: u.userType })));
};
