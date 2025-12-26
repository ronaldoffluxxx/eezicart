'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Home, ShoppingCart, Wallet, Package, User } from 'lucide-react';

const navItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: ShoppingCart, label: 'Categories', path: '/categories' },
    { icon: Wallet, label: 'Wallet', path: '/wallet' },
    { icon: Package, label: 'Orders', path: '/orders' },
    { icon: User, label: 'Profile', path: '/profile' },
];

export default function BottomNav() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-40">
            <div className="flex items-center justify-around max-w-screen-xl mx-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.path;

                    return (
                        <button
                            key={item.path}
                            onClick={() => router.push(item.path)}
                            className={`flex flex-col items-center transition-colors ${isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            <Icon className="w-6 h-6 mb-1" />
                            <span className={`text-xs ${isActive ? 'font-medium' : ''}`}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
