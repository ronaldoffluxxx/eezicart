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
            location_state: 'Lagos',
            location_city: 'Ikeja',
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
            location_state: 'Lagos',
            location_city: 'Lekki',
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
            location_state: 'Lagos',
            location_city: 'Ikeja',
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
            location_state: 'Lagos',
            location_city: 'Victoria Island',
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
        {
            name: 'Men\'s Casual Shirt',
            description: 'Premium cotton casual shirt for men. Available in multiple colors and sizes.',
            category: 'fashion',
            subcategory: 'Men\'s Clothing',
            price: 8500,
            compareAtPrice: 12000,
            stock: 45,
            images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80'],
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
        },
        {
            name: 'Wireless Earbuds',
            description: 'High-quality wireless earbuds with noise cancellation.',
            category: 'electronics',
            subcategory: 'Audio',
            price: 25000,
            stock: 30,
            images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80'],
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
        },
        {
            name: 'Running Shoes',
            description: 'Comfortable running shoes for daily exercise.',
            category: 'sports',
            subcategory: 'Shoes',
            price: 18000,
            stock: 25,
            images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'],
        },
        {
            name: 'Laptop Backpack',
            description: 'Durable laptop backpack with multiple compartments.',
            category: 'fashion',
            subcategory: 'Bags',
            price: 12000,
            stock: 35,
            images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80'],
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
        },
        {
            name: 'Sunglasses',
            description: 'Stylish UV protection sunglasses.',
            category: 'fashion',
            subcategory: 'Accessories',
            price: 7500,
            stock: 50,
            images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80'],
        },
        {
            name: 'Yoga Mat',
            description: 'Non-slip yoga mat for comfortable workouts.',
            category: 'sports',
            subcategory: 'Fitness',
            price: 5500,
            stock: 60,
            images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80'],
        },
        {
            name: 'Phone Case',
            description: 'Protective phone case with stylish design.',
            category: 'electronics',
            subcategory: 'Accessories',
            price: 3500,
            stock: 100,
            images: ['https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80'],
        },
    ];

    productData.forEach((data, index) => {
        products.push({
            id: generateId('prod_'),
            vendorId: vendors[0],
            ...data,
            location_state: 'Lagos',
            location_city: 'Ikeja',
            location_address: '123 Allen Avenue, Ikeja',
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
            location_state: 'Lagos',
            location_city: 'Lekki',
            location_address: '15 Admiralty Way, Lekki Phase 1',
            location_landmarks: 'Near Lekki Toll Gate',
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
            location_state: 'Lagos',
            location_city: 'Ikeja',
            location_address: '45 Allen Avenue, Ikeja GRA',
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
