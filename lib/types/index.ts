// User Types
export type UserType = 'tenant' | 'vendor' | 'landlord' | 'admin';
export type UserStatus = 'active' | 'suspended';

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    password: string; // Hashed (mock)
    userType: UserType;
    location: {
        state: string;
        city: string;
    };
    avatar?: string;
    walletBalance: number;

    // Vendor-specific
    businessName?: string;
    businessCategory?: string;
    businessAddress?: string;
    businessDescription?: string;

    // Bank details (vendors/landlords)
    bankDetails?: {
        bankName: string;
        accountNumber: string;
        accountName: string;
        bvn?: string;
    };

    createdAt: number;
    status: UserStatus;
}

// Product Types
export type ProductStatus = 'draft' | 'published' | 'out_of_stock';

export interface ProductVariation {
    type: string; // 'Size', 'Color', etc.
    options: {
        name: string;
        priceAdjustment: number;
        stock: number;
        image?: string;
    }[];
}

export interface Product {
    id: string;
    vendorId: string;
    name: string;
    description: string;
    category: string;
    subcategory: string;
    price: number;
    compareAtPrice?: number;
    stock: number;
    images: string[];

    variations?: ProductVariation[];

    location: {
        state: string;
        city: string;
        address: string;
    };

    shipping: {
        pickupOnly: boolean;
        deliveryAvailable: boolean;
        deliveryFee?: number;
    };

    rating: number;
    reviewCount: number;
    status: ProductStatus;
    createdAt: number;
    views: number;
    sales: number;
}

// Property Types
export type PropertyType = 'apartment' | 'house' | 'studio' | 'duplex' | 'bungalow' | 'penthouse';
export type PropertyStatus = 'available' | 'rented' | 'maintenance';
export type FurnishingType = 'furnished' | 'semi-furnished' | 'unfurnished';

export interface Property {
    id: string;
    landlordId: string;
    type: PropertyType;
    title: string;
    description: string;

    location: {
        state: string;
        city: string;
        address: string;
        landmarks?: string;
    };

    pricing: {
        monthly: number;
        yearly: number;
        cautionFee: number;
        agencyFee: number;
        monthlyOwnEnabled: boolean;
        ownershipDuration?: number; // months
    };

    specs: {
        bedrooms: number;
        bathrooms: number;
        toilets: number;
        size: number; // sqm
        furnishing: FurnishingType;
    };

    amenities: string[];
    images: string[];

    availability: {
        status: PropertyStatus;
        availableFrom: number;
        minimumPeriod: number; // months
    };

    rating: number;
    reviewCount: number;
    createdAt: number;
    views: number;
}

// Order Types
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
    productId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    variation?: Record<string, string>;
}

export interface Address {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    state: string;
    city: string;
    landmark?: string;
    isDefault?: boolean;
}

export interface Order {
    id: string; // 'ORD-12345'
    buyerId: string;
    vendorId: string;

    items: OrderItem[];

    subtotal: number;
    deliveryFee: number;
    total: number;

    paymentMethod: string;
    paymentStatus: PaymentStatus;

    deliveryAddress: Address;

    status: OrderStatus;
    trackingNumber?: string;

    createdAt: number;
    updatedAt: number;
}

// Rental Types
export type RentalStatus = 'active' | 'ended' | 'cancelled';
export type PaymentPlan = 'monthly' | 'yearly';

export interface RentalPayment {
    id: string;
    amount: number;
    date: number;
    status: PaymentStatus;
    method: string;
    transactionRef: string;
}

export interface Rental {
    id: string;
    propertyId: string;
    landlordId: string;
    tenantId: string;

    paymentPlan: PaymentPlan;
    amount: number;

    startDate: number;
    endDate: number;

    monthlyOwnEnabled: boolean;
    ownershipProgress?: number; // percentage

    payments: RentalPayment[];

    status: RentalStatus;
    createdAt: number;
}

// Transaction Types
export type TransactionType =
    | 'wallet_funding'
    | 'purchase'
    | 'rent_payment'
    | 'refund'
    | 'withdrawal'
    | 'vendor_payout';

export type TransactionStatus = 'pending' | 'completed' | 'failed';

export interface Transaction {
    id: string;
    userId: string;
    type: TransactionType;
    amount: number;
    balanceBefore: number;
    balanceAfter: number;
    description: string;
    reference?: string;
    relatedId?: string; // orderId, rentalId, etc.
    paymentMethod?: string;
    status: TransactionStatus;
    timestamp: number;
}

// Cart Types
export interface CartItem {
    id: string;
    productId: string;
    vendorId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    variation?: Record<string, string>;
    stock: number;
}


// Review Types
export interface Review {
    id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    productId?: string;
    propertyId?: string;
    rating: number;
    title: string;
    comment: string;
    images?: string[];
    createdAt: number;
    helpful: number;
}

// Notification Types
export type NotificationType =
    | 'order_update'
    | 'new_order'
    | 'payment_received'
    | 'rental_due'
    | 'property_approved'
    | 'new_message'
    | 'promotion';

export interface Notification {
    id: string;
    userId: string;
    type: NotificationType;
    title: string;
    description: string;
    read: boolean;
    relatedId?: string;
    createdAt: number;
}
