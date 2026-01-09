'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ClearDataPage() {
    const router = useRouter();
    const [cleared, setCleared] = useState(false);

    const handleClear = () => {
        if (typeof window !== 'undefined') {
            localStorage.clear();
            setCleared(true);
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Clear All Data</h1>
                <p className="text-gray-600 mb-6">
                    This will clear all your local data including login session, cart, and preferences.
                </p>

                {cleared ? (
                    <div className="text-green-600 font-semibold">
                        ✓ Data cleared! Redirecting to login...
                    </div>
                ) : (
                    <button
                        onClick={handleClear}
                        className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                    >
                        Clear All Data
                    </button>
                )}
            </div>
        </div>
    );
}
