import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to get public URL for uploaded images
export const getPublicUrl = (bucket: string, path: string): string => {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
};

// Helper function to upload image
export const uploadImage = async (
    bucket: string,
    file: File,
    path?: string
): Promise<{ url: string; path: string } | null> => {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = path || `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from(bucket)
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false,
            });

        if (uploadError) {
            console.error('Upload error:', uploadError);
            return null;
        }

        const url = getPublicUrl(bucket, filePath);
        return { url, path: filePath };
    } catch (error) {
        console.error('Upload error:', error);
        return null;
    }
};

// Helper function to delete image
export const deleteImage = async (bucket: string, path: string): Promise<boolean> => {
    try {
        const { error } = await supabase.storage.from(bucket).remove([path]);
        if (error) {
            console.error('Delete error:', error);
            return false;
        }
        return true;
    } catch (error) {
        console.error('Delete error:', error);
        return false;
    }
};

