# Fix User Registration Database Error

## Problem
Getting "Database error saving new user" when trying to register.

## Cause
The database trigger that automatically creates user profiles on registration hasn't been set up in your Supabase database.

## Solution

Run the trigger setup script in your Supabase SQL Editor:

### Steps:

1. **Open Supabase Dashboard**
   - Go to your Supabase project
   - Click on **SQL Editor** in the left sidebar

2. **Run the Fix Script**
   - Click "New Query"
   - Copy the entire contents of `supabase/fix_rls.sql`
   - Paste into the SQL Editor
   - Click **Run** or press `Ctrl+Enter`

3. **Verify**
   - You should see "Success. No rows returned"
   - Try registering a new user again

## What This Does

The script creates:
- A database function `handle_new_user()` that creates a profile row
- A trigger `on_auth_user_created` that runs after each new user signs up
- RLS policies to allow users to view and update profiles

## After Running

Registration should work perfectly! The trigger will automatically:
1. Create a profile row when a user signs up
2. Copy user data (name, phone, location) from signup form to profile
3. Set the correct user_type (tenant/vendor/landlord)

## Troubleshooting

**Still getting errors?**
- Check browser console for specific error messages
- Verify your Supabase environment variables in `.env.local`
- Make sure you ran the main schema.sql file first

**Error: "relation auth.users does not exist"**
- This is a Supabase-specific table, make sure you're running this in Supabase SQL Editor, not a local database
