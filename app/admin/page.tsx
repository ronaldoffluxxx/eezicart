'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NextImage from 'next/image';
import { LayoutDashboard, Users, Package, Home as HomeIcon, ShoppingBag, LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import type { User } from '@/lib/types';

export default function AdminDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [stats, setStats] = useState({
        users: 0,
        products: 0,
        properties: 0,
        orders: 0,
    });

    useEffect(() => {
        // Check authentication and admin role
        const authToken = localStorage.getItem('authToken');
        const currentUserData = localStorage.getItem('currentUser');

        if (!authToken || !currentUserData) {
            router.push('/login');
            return;
        }

        let currentUser: User;
        try {
            currentUser = JSON.parse(currentUserData);
        } catch (error) {
            console.error('Failed to parse user data:', error);
            handleLogout();
            return;
        }

        // Verify admin role
        if (currentUser.userType !== 'admin') {
            router.push('/home');
            return;
        }

        setUser(currentUser);
        fetchStats();
    }, [router]);

    const fetchStats = async () => {
        try {
            // Fetch users count
            const { count: usersCount } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true });

            // Fetch products count
            const { count: productsCount } = await supabase
                .from('products')
                .select('*', { count: 'exact', head: true });

            // Fetch properties count
            const { count: propertiesCount } = await supabase
                .from('properties')
                .select('*', { count: 'exact', head: true });

            // Fetch orders count
            const { count: ordersCount } = await supabase
                .from('orders')
                .select('*', { count: 'exact', head: true });

            setStats({
                users: usersCount || 0,
                products: productsCount || 0,
                properties: propertiesCount || 0,
                orders: ordersCount || 0,
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        router.push('/login');
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-600">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-primary text-white sticky top-0 z-50 shadow-md">
                <div className="px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <NextImage
                                src="/logo-dashboard.png"
                                alt="EeziCart"
                                width={180}
                                height={60}
                                className="h-14 w-auto"
                                priority
                            />
                            <div>
                                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                                <p className="text-sm opacity-90">Welcome back, {user.name}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <LogOut className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            <main className="p-6 max-w-7xl mx-auto">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Total Users</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.users}</p>
                            </div>
                            <Users className="w-12 h-12 text-primary opacity-20" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Total Products</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.products}</p>
                            </div>
                            <Package className="w-12 h-12 text-primary opacity-20" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Total Properties</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.properties}</p>
                            </div>
                            <HomeIcon className="w-12 h-12 text-primary opacity-20" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Total Orders</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.orders}</p>
                            </div>
                            <ShoppingBag className="w-12 h-12 text-primary opacity-20" />
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <button
                            onClick={() => router.push('/admin/users')}
                            className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left"
                        >
                            <Users className="w-8 h-8 text-primary mb-2" />
                            <h3 className="font-semibold text-gray-900">Manage Users</h3>
                            <p className="text-sm text-gray-600">View and manage all users</p>
                        </button>

                        <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left">
                            <Package className="w-8 h-8 text-primary mb-2" />
                            <h3 className="font-semibold text-gray-900">Manage Products</h3>
                            <p className="text-sm text-gray-600">View and manage products</p>
                        </button>

                        <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left">
                            <HomeIcon className="w-8 h-8 text-primary mb-2" />
                            <h3 className="font-semibold text-gray-900">Manage Properties</h3>
                            <p className="text-sm text-gray-600">View and manage properties</p>
                        </button>

                        <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left">
                            <ShoppingBag className="w-8 h-8 text-primary mb-2" />
                            <h3 className="font-semibold text-gray-900">View Orders</h3>
                            <p className="text-sm text-gray-600">Monitor all orders</p>
                        </button>

                        <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left">
                            <LayoutDashboard className="w-8 h-8 text-primary mb-2" />
                            <h3 className="font-semibold text-gray-900">Reports</h3>
                            <p className="text-sm text-gray-600">View analytics and reports</p>
                        </button>

                        <button
                            onClick={() => router.push('/home')}
                            className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left"
                        >
                            <HomeIcon className="w-8 h-8 text-primary mb-2" />
                            <h3 className="font-semibold text-gray-900">View Site</h3>
                            <p className="text-sm text-gray-600">Go to main site</p>
                        </button>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                    <div className="text-center py-8">
                        <p className="text-gray-600">No recent activity</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
