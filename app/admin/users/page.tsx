'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, Users as UsersIcon, User as UserIcon, Store, Home as HomeIcon, Shield } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import type { User } from '@/lib/types';

interface Profile {
    id: string;
    user_type: 'tenant' | 'vendor' | 'landlord' | 'admin';
    name: string;
    phone: string | null;
    location_state: string | null;
    location_city: string | null;
    status: 'active' | 'suspended';
    created_at: string;
}

export default function AdminUsersPage() {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<string>('all');

    useEffect(() => {
        // Check authentication and admin role
        const authToken = localStorage.getItem('authToken');
        const currentUserData = localStorage.getItem('currentUser');

        if (!authToken || !currentUserData) {
            router.push('/login');
            return;
        }

        let user: User;
        try {
            user = JSON.parse(currentUserData);
        } catch (error) {
            console.error('Failed to parse user data:', error);
            router.push('/login');
            return;
        }

        // Verify admin role
        if (user.userType !== 'admin') {
            router.push('/home');
            return;
        }

        setCurrentUser(user);
        fetchProfiles();
    }, [router]);

    const fetchProfiles = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching profiles:', error);
                return;
            }

            setProfiles(data || []);
            setFilteredProfiles(data || []);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Filter profiles based on search and type
    useEffect(() => {
        let filtered = profiles;

        // Filter by type
        if (selectedType !== 'all') {
            filtered = filtered.filter(p => p.user_type === selectedType);
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredProfiles(filtered);
    }, [searchQuery, selectedType, profiles]);

    const toggleUserStatus = async (userId: string, currentStatus: string) => {
        const newStatus = currentStatus === 'active' ? 'suspended' : 'active';

        try {
            const { error } = await supabase
                .from('profiles')
                .update({ status: newStatus })
                .eq('id', userId);

            if (error) {
                console.error('Error updating user status:', error);
                return;
            }

            // Update local state
            setProfiles(profiles.map(p =>
                p.id === userId ? { ...p, status: newStatus as 'active' | 'suspended' } : p
            ));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const getUserTypeIcon = (type: string) => {
        switch (type) {
            case 'admin': return <Shield className="w-4 h-4" />;
            case 'vendor': return <Store className="w-4 h-4" />;
            case 'landlord': return <HomeIcon className="w-4 h-4" />;
            default: return <UserIcon className="w-4 h-4" />;
        }
    };

    const getUserTypeColor = (type: string) => {
        switch (type) {
            case 'admin': return 'bg-purple-100 text-purple-700';
            case 'vendor': return 'bg-blue-100 text-blue-700';
            case 'landlord': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const userStats = {
        total: profiles.length,
        tenants: profiles.filter(p => p.user_type === 'tenant').length,
        vendors: profiles.filter(p => p.user_type === 'vendor').length,
        landlords: profiles.filter(p => p.user_type === 'landlord').length,
        admins: profiles.filter(p => p.user_type === 'admin').length,
    };

    if (!currentUser) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-600">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-50">
                <div className="px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <button
                                onClick={() => router.push('/admin')}
                                className="mr-3 p-2 hover:bg-gray-100 rounded-full"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">User Management</h1>
                                <p className="text-sm text-gray-600">{userStats.total} total users</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="p-6 max-w-7xl mx-auto">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <p className="text-sm text-gray-600">Total Users</p>
                        <p className="text-2xl font-bold text-gray-900">{userStats.total}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <p className="text-sm text-gray-600">Tenants</p>
                        <p className="text-2xl font-bold text-gray-900">{userStats.tenants}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <p className="text-sm text-gray-600">Vendors</p>
                        <p className="text-2xl font-bold text-blue-600">{userStats.vendors}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <p className="text-sm text-gray-600">Landlords</p>
                        <p className="text-2xl font-bold text-green-600">{userStats.landlords}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <p className="text-sm text-gray-600">Admins</p>
                        <p className="text-2xl font-bold text-purple-600">{userStats.admins}</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>

                        {/* Type Filter */}
                        <div className="flex gap-2 overflow-x-auto">
                            <button
                                onClick={() => setSelectedType('all')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${selectedType === 'all'
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setSelectedType('tenant')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${selectedType === 'tenant'
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Tenants
                            </button>
                            <button
                                onClick={() => setSelectedType('vendor')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${selectedType === 'vendor'
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Vendors
                            </button>
                            <button
                                onClick={() => setSelectedType('landlord')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${selectedType === 'landlord'
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Landlords
                            </button>
                            <button
                                onClick={() => setSelectedType('admin')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${selectedType === 'admin'
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Admins
                            </button>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="p-8 text-center">
                            <p className="text-gray-600">Loading users...</p>
                        </div>
                    ) : filteredProfiles.length === 0 ? (
                        <div className="p-8 text-center">
                            <UsersIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-600">No users found</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            User
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Type
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Location
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredProfiles.map((profile) => (
                                        <tr key={profile.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {profile.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {profile.phone || 'No phone'}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getUserTypeColor(profile.user_type)}`}>
                                                    {getUserTypeIcon(profile.user_type)}
                                                    {profile.user_type.charAt(0).toUpperCase() + profile.user_type.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {profile.location_city || 'N/A'}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {profile.location_state || 'N/A'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${profile.status === 'active'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                    }`}>
                                                    {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <button
                                                    onClick={() => toggleUserStatus(profile.id, profile.status)}
                                                    className={`px-3 py-1 rounded-lg text-xs font-medium ${profile.status === 'active'
                                                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                                                        }`}
                                                >
                                                    {profile.status === 'active' ? 'Suspend' : 'Activate'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Results count */}
                {!loading && filteredProfiles.length > 0 && (
                    <div className="mt-4 text-sm text-gray-600 text-center">
                        Showing {filteredProfiles.length} of {profiles.length} users
                    </div>
                )}
            </main>
        </div>
    );
}
