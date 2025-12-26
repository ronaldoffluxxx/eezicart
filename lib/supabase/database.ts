import { supabase } from '../supabase/client';
import type { User, Product, Property, Order, Rental, Transaction, Review } from '../types';

// ============================================
// USER OPERATIONS
// ============================================

export const getUsers = async (): Promise<User[]> => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching users:', error);
        return [];
    }
    return data || [];
};

export const getUserById = async (id: string): Promise<User | null> => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching user:', error);
        return null;
    }
    return data;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

    if (error) {
        console.error('Error fetching user:', error);
        return null;
    }
    return data;
};

export const createUser = async (user: Omit<User, 'id' | 'created_at'>): Promise<User | null> => {
    const { data, error } = await supabase
        .from('users')
        .insert([user])
        .select()
        .single();

    if (error) {
        console.error('Error creating user:', error);
        return null;
    }
    return data;
};

export const updateUser = async (id: string, updates: Partial<User>): Promise<User | null> => {
    const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating user:', error);
        return null;
    }
    return data;
};

export const updateWalletBalance = async (userId: string, amount: number): Promise<boolean> => {
    const user = await getUserById(userId);
    if (!user) return false;

    const newBalance = user.walletBalance + amount;
    const updated = await updateUser(userId, { walletBalance: newBalance });
    return !!updated;
};

// ============================================
// PRODUCT OPERATIONS
// ============================================

export const getProducts = async (filters?: {
    category?: string;
    vendorId?: string;
    status?: string;
    state?: string;
    city?: string;
}): Promise<Product[]> => {
    let query = supabase.from('products').select('*');

    if (filters?.category) {
        query = query.eq('category', filters.category);
    }
    if (filters?.vendorId) {
        query = query.eq('vendor_id', filters.vendorId);
    }
    if (filters?.status) {
        query = query.eq('status', filters.status);
    }
    if (filters?.state) {
        query = query.eq('location_state', filters.state);
    }
    if (filters?.city) {
        query = query.eq('location_city', filters.city);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }
    return data || [];
};

export const getProductById = async (id: string): Promise<Product | null> => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }

    // Increment views
    await supabase
        .from('products')
        .update({ views: (data.views || 0) + 1 })
        .eq('id', id);

    return data;
};

export const createProduct = async (product: Omit<Product, 'id' | 'created_at'>): Promise<Product | null> => {
    const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

    if (error) {
        console.error('Error creating product:', error);
        return null;
    }
    return data;
};

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product | null> => {
    const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating product:', error);
        return null;
    }
    return data;
};

export const deleteProduct = async (id: string): Promise<boolean> => {
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting product:', error);
        return false;
    }
    return true;
};

// ============================================
// PROPERTY OPERATIONS
// ============================================

export const getProperties = async (filters?: {
    type?: string;
    landlordId?: string;
    status?: string;
    state?: string;
    city?: string;
}): Promise<Property[]> => {
    let query = supabase.from('properties').select('*');

    if (filters?.type) {
        query = query.eq('type', filters.type);
    }
    if (filters?.landlordId) {
        query = query.eq('landlord_id', filters.landlordId);
    }
    if (filters?.status) {
        query = query.eq('status', filters.status);
    }
    if (filters?.state) {
        query = query.eq('location_state', filters.state);
    }
    if (filters?.city) {
        query = query.eq('location_city', filters.city);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching properties:', error);
        return [];
    }
    return data || [];
};

export const getPropertyById = async (id: string): Promise<Property | null> => {
    const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching property:', error);
        return null;
    }

    // Increment views
    await supabase
        .from('properties')
        .update({ views: (data.views || 0) + 1 })
        .eq('id', id);

    return data;
};

export const createProperty = async (property: Omit<Property, 'id' | 'created_at'>): Promise<Property | null> => {
    const { data, error } = await supabase
        .from('properties')
        .insert([property])
        .select()
        .single();

    if (error) {
        console.error('Error creating property:', error);
        return null;
    }
    return data;
};

export const updateProperty = async (id: string, updates: Partial<Property>): Promise<Property | null> => {
    const { data, error } = await supabase
        .from('properties')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating property:', error);
        return null;
    }
    return data;
};

export const deleteProperty = async (id: string): Promise<boolean> => {
    const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting property:', error);
        return false;
    }
    return true;
};

// ============================================
// ORDER OPERATIONS
// ============================================

export const getOrders = async (filters?: {
    buyerId?: string;
    vendorId?: string;
    status?: string;
}): Promise<Order[]> => {
    let query = supabase.from('orders').select('*');

    if (filters?.buyerId) {
        query = query.eq('buyer_id', filters.buyerId);
    }
    if (filters?.vendorId) {
        query = query.eq('vendor_id', filters.vendorId);
    }
    if (filters?.status) {
        query = query.eq('status', filters.status);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
    return data || [];
};

export const getOrderById = async (id: string): Promise<Order | null> => {
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching order:', error);
        return null;
    }
    return data;
};

export const createOrder = async (order: Order): Promise<Order | null> => {
    const { data, error } = await supabase
        .from('orders')
        .insert([order])
        .select()
        .single();

    if (error) {
        console.error('Error creating order:', error);
        return null;
    }
    return data;
};

export const updateOrder = async (id: string, updates: Partial<Order>): Promise<Order | null> => {
    const { data, error } = await supabase
        .from('orders')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating order:', error);
        return null;
    }
    return data;
};

// ============================================
// TRANSACTION OPERATIONS
// ============================================

export const getTransactions = async (userId: string): Promise<Transaction[]> => {
    const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching transactions:', error);
        return [];
    }
    return data || [];
};

export const createTransaction = async (transaction: Omit<Transaction, 'id' | 'created_at'>): Promise<Transaction | null> => {
    const { data, error } = await supabase
        .from('transactions')
        .insert([transaction])
        .select()
        .single();

    if (error) {
        console.error('Error creating transaction:', error);
        return null;
    }
    return data;
};

// ============================================
// RENTAL OPERATIONS
// ============================================

export const getRentals = async (filters?: {
    tenantId?: string;
    landlordId?: string;
    propertyId?: string;
    status?: string;
}): Promise<Rental[]> => {
    let query = supabase.from('rentals').select('*');

    if (filters?.tenantId) {
        query = query.eq('tenant_id', filters.tenantId);
    }
    if (filters?.landlordId) {
        query = query.eq('landlord_id', filters.landlordId);
    }
    if (filters?.propertyId) {
        query = query.eq('property_id', filters.propertyId);
    }
    if (filters?.status) {
        query = query.eq('status', filters.status);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching rentals:', error);
        return [];
    }
    return data || [];
};

export const createRental = async (rental: Omit<Rental, 'id' | 'created_at'>): Promise<Rental | null> => {
    const { data, error } = await supabase
        .from('rentals')
        .insert([rental])
        .select()
        .single();

    if (error) {
        console.error('Error creating rental:', error);
        return null;
    }
    return data;
};

export const updateRental = async (id: string, updates: Partial<Rental>): Promise<Rental | null> => {
    const { data, error } = await supabase
        .from('rentals')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating rental:', error);
        return null;
    }
    return data;
};

// ============================================
// REVIEW OPERATIONS
// ============================================

export const getReviews = async (filters?: {
    productId?: string;
    propertyId?: string;
    userId?: string;
}): Promise<Review[]> => {
    let query = supabase.from('reviews').select('*');

    if (filters?.productId) {
        query = query.eq('product_id', filters.productId);
    }
    if (filters?.propertyId) {
        query = query.eq('property_id', filters.propertyId);
    }
    if (filters?.userId) {
        query = query.eq('user_id', filters.userId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching reviews:', error);
        return [];
    }
    return data || [];
};

export const createReview = async (review: Omit<Review, 'id' | 'created_at'>): Promise<Review | null> => {
    const { data, error } = await supabase
        .from('reviews')
        .insert([review])
        .select()
        .single();

    if (error) {
        console.error('Error creating review:', error);
        return null;
    }

    // Update product/property rating
    // Update product/property rating
    if (review.productId) {
        const reviews = await getReviews({ productId: review.productId });
        const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        await updateProduct(review.productId, {
            rating: avgRating,
            reviewCount: reviews.length,
        });
    } else if (review.propertyId) {
        const reviews = await getReviews({ propertyId: review.propertyId });
        const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        await updateProperty(review.propertyId, {
            rating: avgRating,
            reviewCount: reviews.length,
        });
    }

    return data;
};
