'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Search } from 'lucide-react';

interface HeaderProps {
    showSearch?: boolean;
    showCart?: boolean;
    cartItemCount?: number;
    onSearchClick?: () => void;
}

export default function Header({
    showSearch = true,
    showCart = true,
    cartItemCount = 0,
    onSearchClick
}: HeaderProps) {
    const router = useRouter();
    const [userLocation, setUserLocation] = useState<string>('');

    useEffect(() => {
        // Get user location from local storage
        try {
            const userStr = localStorage.getItem('currentUser');
            if (userStr) {
                const user = JSON.parse(userStr);
                if (user.location) {
                    setUserLocation(`${user.location.city}, ${user.location.state}`);
                }
            } else {
                // Fallback to simpler location if available
                const locStr = localStorage.getItem('userLocation');
                if (locStr) {
                    const loc = JSON.parse(locStr);
                    // Handle both format {city, state} and simple string if any
                    if (loc.city && loc.state) {
                        setUserLocation(`${loc.city}, ${loc.state}`);
                    }
                }
            }
        } catch (e) {
            console.error('Error parsing user location:', e);
        }
    }, []);

    const handleSearchClick = () => {
        if (onSearchClick) {
            onSearchClick();
        } else {
            router.push('/search');
        }
    };

    const handleCartClick = () => {
        router.push('/cart');
    };

    return (
        <header className="bg-primary text-white sticky top-0 z-50 shadow-md">
            <div className="px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col cursor-pointer" onClick={() => router.push('/home')}>
                        <Image
                            src="/dashboard-logo-new.png"
                            alt="EeziCart"
                            width={200}
                            height={60}
                            className="h-14 md:h-16 w-auto object-contain mb-1"
                            priority
                        />
                        {userLocation && (
                            <div className="flex items-center text-xs md:text-sm text-white/90 font-medium pl-1">
                                <span className="truncate max-w-[180px] md:max-w-none">
                                    {userLocation}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center space-x-3 md:space-x-4">
                        {showSearch && (
                            <button
                                onClick={handleSearchClick}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                aria-label="Search"
                            >
                                <Search className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                        )}
                        {showCart && (
                            <button
                                onClick={handleCartClick}
                                className="p-2 relative hover:bg-white/10 rounded-full transition-colors"
                                aria-label="Shopping cart"
                            >
                                <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-white text-primary text-xs w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center font-bold">
                                        {cartItemCount > 99 ? '99+' : cartItemCount}
                                    </span>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
