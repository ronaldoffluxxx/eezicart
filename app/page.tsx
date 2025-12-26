'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function HomePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initialize mock data on first load
        import('@/lib/utils/mockData').then(({ initializeMockData }) => {
            initializeMockData();
        });

        // Check if first launch
        const isFirstLaunch = localStorage.getItem('isFirstLaunch');

        setTimeout(() => {
            if (isFirstLaunch === null) {
                localStorage.setItem('isFirstLaunch', 'false');
                router.push('/onboarding');
            } else {
                // Check if user is logged in
                const authToken = localStorage.getItem('authToken');
                if (authToken) {
                    router.push('/home');
                } else {
                    router.push('/login');
                }
            }
        }, 2500); // Splash screen duration
    }, [router]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
            <div className="text-center animate-fade-in">
                {/* Logo */}
                <div className="w-64 h-64 mx-auto mb-8 relative flex items-center justify-center">
                    <Image
                        src="/logo-loading.png"
                        alt="EeziCart"
                        width={300}
                        height={300}
                        className="w-auto h-48"
                        priority
                    />
                </div>

                {/* Loading indicator */}
                <div className="flex justify-center items-center space-x-2">
                    <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <p className="text-white mt-4 text-lg">Loading...</p>
            </div>
        </div>
    );
}
