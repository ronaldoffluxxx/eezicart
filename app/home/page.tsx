'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, ChevronDown } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import ProductCard from '@/components/ProductCard';
import PropertyCard from '@/components/PropertyCard';
import LocationSelector from '@/components/LocationSelector';
import { useCart } from '@/lib/hooks/useCart';
import { useToast } from '@/components/ToastProvider';
import { safeLocalStorageGet, safeJSONParse } from '@/lib/utils/safeStorage';
import type { Product, Property, User } from '@/lib/types';

const categories = [
    { id: 'fashion', name: 'Fashion', emoji: '👗' },
    { id: 'electronics', name: 'Electronics', emoji: '📱' },
    { id: 'food', name: 'Food', emoji: '🍔' },
    { id: 'home', name: 'Properties', emoji: '🏠' },
];

// Helper function to get time-based greeting
function getTimeBasedGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
}

export default function HomePage() {
    const router = useRouter();
    const { cart, addItem } = useCart();
    const { showToast } = useToast();
    const [products, setProducts] = useState<Product[]>([]);
    const [properties, setProperties] = useState<Property[]>([]);
    const [wishlist, setWishlist] = useState<string[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isFirstVisit, setIsFirstVisit] = useState(true);
    const [location, setLocation] = useState<string>('');
    const [showLocationSelector, setShowLocationSelector] = useState(false);

    useEffect(() => {
        // Check if user is logged in
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            router.push('/login');
            return;
        }

        // Load current user
        const user = safeLocalStorageGet<User>('currentUser');
        if (user) {
            setCurrentUser(user);
        }

        // Check if this is first visit (after login)
        const hasVisited = localStorage.getItem('hasVisitedHome');
        setIsFirstVisit(!hasVisited);
        if (!hasVisited) {
            localStorage.setItem('hasVisitedHome', 'true');
        }

        // Load saved location safely
        const savedLocation = localStorage.getItem('userLocation');
        let locationFilter = {};
        if (savedLocation) {
            const loc = safeJSONParse<{ city?: string; state?: string }>(savedLocation);
            if (loc && typeof loc === 'object') {
                setLocation(`${loc.city || ''}, ${loc.state || ''}`);
                locationFilter = { state: loc.state, city: loc.city };
            }
        }

        // Fetch data from Supabase
        const fetchData = async () => {
            try {
                const { getProducts } = await import('@/lib/supabase/database');
                const productsData = await getProducts({ status: 'published', ...locationFilter });
                setProducts(productsData.slice(0, 4));

                const { getProperties } = await import('@/lib/supabase/database');
                const propertiesData = await getProperties({ status: 'available', ...locationFilter });
                setProperties(propertiesData.slice(0, 2));

                const wishlist = safeLocalStorageGet<string[]>('wishlist', []) || [];
                setWishlist(wishlist);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [router]);

    const handleAddToCart = (product: Product) => {
        addItem(product, 1);
        showToast(`${product.name} added to cart!`, 'success');
    };

    const handleToggleWishlist = (productId: string) => {
        const newWishlist = wishlist.includes(productId)
            ? wishlist.filter(id => id !== productId)
            : [...wishlist, productId];

        setWishlist(newWishlist);
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    };

    const handleCategoryClick = (categoryId: string) => {
        if (categoryId === 'home') {
            router.push('/properties');
        } else {
            router.push(`/products?category=${categoryId}`);
        }
    };

    const handleSelectLocation = (selectedLocation: string) => {
        // Fix: Persist selection to localStorage so it survives reload
        localStorage.setItem('userLocation', selectedLocation);

        let displayLoc = '';
        const loc = safeJSONParse<{ city: string; state: string }>(selectedLocation);
        if (loc) {
            displayLoc = `${loc.city}, ${loc.state}`;
        } else {
            displayLoc = selectedLocation;
        }

        setLocation(displayLoc);
        window.location.reload();
    };

    // Get personalized greeting
    const greeting = isFirstVisit
        ? `Welcome to EeziCart, ${currentUser?.name || 'Guest'}!`
        : `${getTimeBasedGreeting()}, ${currentUser?.name || 'Guest'}!`;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header cartItemCount={cart.itemCount} />

            {/* Location Selector Modal */}
            <LocationSelector
                isOpen={showLocationSelector}
                onClose={() => setShowLocationSelector(false)}
                onSelectLocation={handleSelectLocation}
                currentLocation={location}
            />

            {/* Main Content */}
            <main className="pb-20">
                {/* Search Bar */}
                <div className="px-4 py-4 bg-white">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const query = formData.get('search') as string;
                            if (query.trim()) {
                                router.push(`/search?q=${encodeURIComponent(query)}`);
                            }
                        }}
                        className="relative"
                    >
                        <input
                            type="text"
                            name="search"
                            placeholder="What are you looking for?"
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </form>
                </div>

                {/* Hero Section with Glassmorphism */}
                <div className="px-4 py-4">
                    <div
                        className="relative rounded-2xl p-6 text-white overflow-hidden min-h-[200px] flex flex-col justify-between"
                        style={{
                            backgroundImage: 'url(/shopping-bg.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {/* Red overlay */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.55) 0%, rgba(185, 28, 28, 0.55) 100%)',
                            }}
                        />
                        {/* Decorative overlay pattern */}
                        <div
                            className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                            }}
                        />

                        {/* Content with enhanced glassmorphism for better legibility */}
                        <div
                            className="relative z-10 rounded-xl p-5 backdrop-blur-lg"
                            style={{
                                background: 'rgba(255, 255, 255, 0.25)',
                                border: '1px solid rgba(255, 255, 255, 0.4)',
                                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <h2 className="text-2xl font-bold mb-2 drop-shadow-lg">{greeting}</h2>
                            <p className="text-sm drop-shadow-md">Shop products and rent properties with ease</p>
                        </div>

                        {/* Location Selector */}
                        <div className="relative z-10 mt-4">
                            <p className="text-sm font-medium mb-2 drop-shadow-md">What are you looking for?</p>
                            <button
                                onClick={() => setShowLocationSelector(true)}
                                className="w-full rounded-lg px-4 py-3 flex items-center justify-between hover:bg-white/30 transition-all backdrop-blur-lg"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.25)',
                                    border: '1px solid rgba(255, 255, 255, 0.4)',
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 drop-shadow-md" />
                                    <span className="font-medium drop-shadow-md">
                                        {location || 'Select your location'}
                                    </span>
                                </div>
                                <ChevronDown className="w-5 h-5 drop-shadow-md" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Pay Small Small Banner */}
                <div className="px-4 mb-4">
                    <button
                        onClick={() => router.push('/pay-small-small')}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-4 text-white shadow-lg relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05 1.18 1.91 2.53 1.91 1.29 0 2.13-.81 2.13-1.88 0-1.09-.86-1.72-2.46-2.09-1.4-.35-3.24-1.13-3.24-3.29 0-1.85 1.34-2.88 2.89-3.32V4h2.68v1.89c1.68.32 2.92 1.38 3.11 3.01h-2.05c-.17-.9-1.14-1.57-2.22-1.57-1.17 0-2.03.74-2.03 1.76 0 1.05.8 1.63 2.56 2.05 1.76.4 3.12 1.15 3.12 3.32 0 1.71-1.28 2.85-2.91 3.24z" />
                            </svg>
                        </div>
                        <div className="relative z-10 flex items-center justify-between">
                            <div className="text-left">
                                <h3 className="text-lg font-bold mb-1">Pay Small Small</h3>
                                <p className="text-sm opacity-90">Own cars & properties with ease</p>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </button>
                </div>

                {/* Categories */}
                <div className="px-4 py-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
                    <div className="grid grid-cols-4 gap-4">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryClick(category.id)}
                                className="flex flex-col items-center hover:opacity-80 transition-opacity"
                            >
                                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-2">
                                    <span className="text-2xl">{category.emoji}</span>
                                </div>
                                <span className="text-xs text-gray-700 text-center">{category.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Featured Properties */}
                {properties.length > 0 && (
                    <div className="px-4 py-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Featured Properties</h3>
                            <button
                                onClick={() => router.push('/properties')}
                                className="text-primary text-sm font-semibold hover:underline"
                            >
                                View All
                            </button>
                        </div>
                        <div className="space-y-4">
                            {properties.map((property) => (
                                <PropertyCard key={property.id} property={property} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Trending Products */}
                {products.length > 0 && (
                    <div className="px-4 py-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Trending Products</h3>
                            <button
                                onClick={() => router.push('/products')}
                                className="text-primary text-sm font-semibold hover:underline"
                            >
                                View All
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={handleAddToCart}
                                    onToggleWishlist={handleToggleWishlist}
                                    isInWishlist={wishlist.includes(product.id)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    );
}

