import { supabase } from './client';

// Get all products
export async function getProducts(filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    state?: string;
    city?: string;
}) {
    let query = supabase
        .from('products')
        .select('*')
        .eq('status', 'published');

    if (filters?.category) {
        query = query.eq('category', filters.category);
    }

    if (filters?.minPrice) {
        query = query.gte('price', filters.minPrice);
    }

    if (filters?.maxPrice) {
        query = query.lte('price', filters.maxPrice);
    }

    if (filters?.state) {
        query = query.eq('location_state', filters.state);
    }

    if (filters?.city) {
        query = query.eq('location_city', filters.city);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    return { products: data, error };
}

// Get single product
export async function getProduct(id: string) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    return { product: data, error };
}

// Create product
export async function createProduct(productData: any) {
    const { data, error } = await supabase
        .from('products')
        .insert(productData)
        .select()
        .single();

    return { product: data, error };
}

// Update product
export async function updateProduct(id: string, updates: any) {
    const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    return { product: data, error };
}

// Delete product
export async function deleteProduct(id: string) {
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    return { error };
}

// Increment product views
export async function incrementProductViews(id: string) {
    const { data: product } = await supabase
        .from('products')
        .select('views')
        .eq('id', id)
        .single();

    if (product) {
        await supabase
            .from('products')
            .update({ views: (product.views || 0) + 1 })
            .eq('id', id);
    }
}
