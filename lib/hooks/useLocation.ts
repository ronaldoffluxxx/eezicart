'use client';

import { useState, useEffect } from 'react';
import { safeJSONParse } from '@/lib/utils/safeStorage';

interface LocationState {
    state: string;
    city: string;
}

export function useLocation() {
    const [location, setLocation] = useState<LocationState | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedLocation = localStorage.getItem('userLocation');
            if (savedLocation) {
                const parsed = safeJSONParse<LocationState>(savedLocation);
                if (parsed) {
                    setLocation(parsed);
                }
            }
        }
    }, []);

    const updateLocation = (state: string, city: string) => {
        const newLocation = { state, city };
        setLocation(newLocation);
        localStorage.setItem('userLocation', JSON.stringify(newLocation));
    };

    const detectLocation = async () => {
        try {
            // Simplified IP-based location detection mock
            // In a real app, you'd use a geolocation API
            // For now, we'll default to Lagos/Lagos or use browser geolocation api if needed

            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    // Reverse geocoding would happen here
                    // For now, let's mock a successful detection
                    console.log("Coordinates detected:", position.coords);
                    // updateLocation('Lagos', 'Ikeja'); 
                });
            }
        } catch (error) {
            console.error('Error detecting location:', error);
        }
    };

    return {
        location,
        updateLocation,
        detectLocation
    };
}
