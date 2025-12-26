-- Run this in Supabase SQL Editor to fix missing profiles
INSERT INTO public.profiles (id, name, user_type)
SELECT 
  id, 
  COALESCE(raw_user_meta_data->>'name', 'Fixed User'),
  COALESCE(raw_user_meta_data->>'user_type', 'vendor')
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles);
