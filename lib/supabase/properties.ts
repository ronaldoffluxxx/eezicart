import { supabase } from './client';

// Get all properties
export async function getProperties(filters?: {
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    state?: string;
    city?: string;
    bedrooms?: number;
}) {
    let query = supabase
        .from('properties')
        .select('*')
        .eq('status', 'available');

    if (filters?.type) {
        query = query.eq('type', filters.type);
    }

    if (filters?.minPrice) {
        query = query.gte('monthly_price', filters.minPrice);
    }

    if (filters?.maxPrice) {
        query = query.lte('monthly_price', filters.maxPrice);
    }

    if (filters?.state) {
        query = query.eq('location_state', filters.state);
    }

    if (filters?.city) {
        query = query.eq('location_city', filters.city);
    }

    if (filters?.bedrooms) {
        query = query.eq('bedrooms', filters.bedrooms);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    return { properties: data, error };
}

// Get single property
export async function getProperty(id: string) {
    const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

    return { property: data, error };
}

// Create property
export async function createProperty(propertyData: any) {
    const { data, error } = await supabase
        .from('properties')
        .insert(propertyData)
        .select()
        .single();

    return { property: data, error };
}

// Update property
export async function updateProperty(id: string, updates: any) {
    const { data, error } = await supabase
        .from('properties')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    return { property: data, error };
}

// Delete property
export async function deleteProperty(id: string) {
    const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

    return { error };
}

// Increment property views
export async function incrementPropertyViews(id: string) {
    const { data: property } = await supabase
        .from('properties')
        .select('views')
        .eq('id', id)
        .single();

    if (property) {
        await supabase
            .from('properties')
            .update({ views: (property.views || 0) + 1 })
            .eq('id', id);
    }
}
