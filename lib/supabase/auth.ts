import { supabase } from './client';
import type { User } from '@supabase/supabase-js';

export interface AuthUser {
    id: string;
    email: string;
    userType: string;
    name: string;
}

// Sign up new user
// Sign up new user
export async function signUp(email: string, password: string, userData: {
    name: string;
    phone: string;
    userType: 'tenant' | 'vendor' | 'landlord';
    locationState: string;
    locationCity: string;
}) {
    try {
        // 1. Create auth user with metadata
        // The trigger 'on_auth_user_created' will automatically create the profile row
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name: userData.name,
                    phone: userData.phone,
                    user_type: userData.userType, // snake_case for DB mapping
                    location_state: userData.locationState,
                    location_city: userData.locationCity,
                }
            }
        });

        if (authError) throw authError;
        if (!authData.user) throw new Error('No user returned from signup');

        // No need to manually insert profile anymore, the Trigger handles it.

        return { user: authData.user, error: null };
    } catch (error: any) {
        return { user: null, error: error.message };
    }
}

// Sign in user
export async function signIn(email: string, password: string) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;

        return { user: data.user, session: data.session, error: null };
    } catch (error: any) {
        return { user: null, session: null, error: error.message };
    }
}

// Sign out user
export async function signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
}

// Get current user
export async function getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

// Get user profile
export async function getUserProfile(userId: string) {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

    return { profile: data, error };
}

// Update user profile
export async function updateUserProfile(userId: string, updates: any) {
    const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

    return { profile: data, error };
}
