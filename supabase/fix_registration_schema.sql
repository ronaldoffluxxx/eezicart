-- 1. Ensure profiles table has all necessary columns
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS full_name TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS location_state TEXT,
ADD COLUMN IF NOT EXISTS location_city TEXT,
ADD COLUMN IF NOT EXISTS start_date TEXT,
ADD COLUMN IF NOT EXISTS end_date TEXT,
ADD COLUMN IF NOT EXISTS wallet_balance DECIMAL(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS business_name TEXT,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active',
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- 2. Update the Trigger Function to use correct column names (full_name vs name)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    full_name, -- Use full_name explicitly
    user_type, 
    phone, 
    location_state, 
    location_city
  )
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name'), -- Handle both keys from metadata
    new.raw_user_meta_data->>'user_type',
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'location_state',
    new.raw_user_meta_data->>'location_city'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
