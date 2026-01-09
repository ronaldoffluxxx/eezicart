# Admin Users Management - Setup Instructions

Before testing the admin users page, you need to run the admin RLS policies in Supabase:

## Database Setup

1. **Open Supabase SQL Editor**
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor

2. **Run the Admin Policies**
   - Copy the contents of `supabase/admin_policies.sql`
   - Paste into SQL Editor
   - Click "Run"

This will allow admin users to view and update all profiles in the system.

## What Was Created

### Files Created:
- `/app/admin/users/page.tsx` - Admin users management page
- `/supabase/admin_policies.sql` - Database policies for admin access

### Files Modified:
- `/app/admin/page.tsx` - Added real stats and navigation to users page

## Features Implemented

✅ **User List Table**
- Displays all users from Supabase `profiles` table
- Shows name, phone, user type, location, and status
- Responsive table design

✅ **Search & Filters**
- Search by name
- Filter by user type (all, tenant, vendor, landlord, admin)
- Real-time filtering

✅ **User Statistics**
- Total users count
- Count by user type (tenants, vendors, landlords, admins)

✅ **Status Management**
- Toggle user status (active/suspended)
- Updates directly in Supabase

✅ **Admin Dashboard Updates**
- Real-time stats from Supabase
- Shows actual counts for users, products, properties, orders
- Navigation link to users page

## Testing Steps

1. **Run the admin policies SQL** (see above)
2. **Start the dev server**: `npm run dev`
3. **Login as admin**: `admin@eezicart.com` / `Admin123`
4. **Navigate to Admin Dashboard**: `/admin`
5. **Check stats** - Should show real counts
6. **Click "Manage Users"** - Should navigate to `/admin/users`
7. **Test search** - Type a name to filter
8. **Test filters** - Click user type buttons
9. **Test status toggle** - Click suspend/activate button
