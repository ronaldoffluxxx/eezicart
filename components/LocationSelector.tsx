'use client';

import { useState } from 'react';
import { X, MapPin } from 'lucide-react';
import { NIGERIAN_STATES } from '@/lib/constants/data';

interface LocationSelectorProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectLocation: (location: string) => void;
    currentLocation?: string;
}

export default function LocationSelector({ isOpen, onClose, onSelectLocation, currentLocation }: LocationSelectorProps) {
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const currentStateObj = NIGERIAN_STATES.find(s => s.name === selectedState);

    const handleConfirm = () => {
        if (selectedState && selectedCity) {
            onSelectLocation(JSON.stringify({ state: selectedState, city: selectedCity }));
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-slide-up">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-6 h-6 text-primary" />
                        <h2 className="text-xl font-bold text-gray-900">Select Your Location</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    <p className="text-sm text-gray-600">
                        Choose your location to see products and properties available in your area
                    </p>

                    <div className="space-y-4">
                        {/* State Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                            <select
                                value={selectedState}
                                onChange={(e) => {
                                    setSelectedState(e.target.value);
                                    setSelectedCity('');
                                }}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
                            >
                                <option value="">Select State</option>
                                {NIGERIAN_STATES.map((state) => (
                                    <option key={state.name} value={state.name}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* City Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                            <select
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                                disabled={!selectedState}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                                <option value="">Select City</option>
                                {currentStateObj?.cities?.map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex gap-3 p-6 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={!selectedState}
                        className="flex-1 px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}
