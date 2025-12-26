-- Fix all profiles with missing location data
-- This prevents crashes when users log in

UPDATE profiles 
SET 
    location_state = COALESCE(location_state, 'Lagos'),
    location_city = COALESCE(location_city, 'Ikeja')
WHERE 
    location_state IS NULL 
    OR location_city IS NULL
    OR location_state = ''
    OR location_city = '';
