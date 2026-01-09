'use client';

import { useRouter } from 'next/navigation';
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
            <div className="px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Image
                            src="/logo-transparent.png"
                            alt="EeziCart"
                            width={160}
                            height={50}
                            className="h-12 w-auto"
                            priority
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        {showSearch && (
                            <button
                                onClick={handleSearchClick}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                aria-label="Search"
                            >
                                <Search className="w-6 h-6" />
                            </button>
                        )}
                        {showCart && (
                            <button
                                onClick={handleCartClick}
                                className="p-2 relative hover:bg-white/10 rounded-full transition-colors"
                                aria-label="Shopping cart"
                            >
                                <ShoppingCart className="w-6 h-6" />
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-white text-primary text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
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
