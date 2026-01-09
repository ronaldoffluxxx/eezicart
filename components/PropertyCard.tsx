'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MapPin, Bed, Bath, Maximize } from 'lucide-react';
import type { Property } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/formatting';

interface PropertyCardProps {
    property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/properties/${property.id}`);
    };

    return (
        <div
            onClick={handleCardClick}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
            {/* Property Image */}
            <div className="relative h-48 bg-gray-200">
                {property.images && property.images.length > 0 ? (
                    <Image
                        src={property.images[0]}
                        alt={property.title}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <MapPin className="w-12 h-12" />
                    </div>
                )}

                {property.pricing?.monthlyOwnEnabled && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                        Monthly Own
                    </div>
                )}

                {/* Status Badge */}
                <div className={`absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded ${property.availability?.status === 'available' ? 'bg-green-600' :
                    property.availability?.status === 'rented' ? 'bg-red-600' :
                        'bg-yellow-600'
                    }`}>
                    {property.availability?.status?.charAt(0).toUpperCase() + property.availability?.status?.slice(1)}
                </div>
            </div>

            {/* Property Info */}
            <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-base mb-1 line-clamp-2 min-h-[3rem]">
                    {property.title}
                </h3>

                {/* Location */}
                <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.location?.city}, {property.location?.state}</span>
                </div>

                {/* Property Specs */}
                <div className="flex items-center space-x-4 mb-3 text-gray-700">
                    <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        <span className="text-sm">{property.specs?.bedrooms}</span>
                    </div>
                    <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-1" />
                        <span className="text-sm">{property.specs?.bathrooms}</span>
                    </div>
                    <div className="flex items-center">
                        <Maximize className="w-4 h-4 mr-1" />
                        <span className="text-sm">{property.specs?.size}m²</span>
                    </div>
                </div>

                {/* Furnishing Type */}
                <div className="mb-3">
                    <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        {property.specs?.furnishing?.charAt(0).toUpperCase() + property.specs?.furnishing?.slice(1)}
                    </span>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-3">
                    <div className="flex items-center">
                        <span className="text-yellow-500 text-sm">★</span>
                        <span className="text-sm text-gray-700 ml-1">
                            {property.rating.toFixed(1)}
                        </span>
                    </div>
                    <span className="text-sm text-gray-500 ml-1">
                        ({property.reviewCount} reviews)
                    </span>
                </div>

                {/* Price */}
                <div className="border-t pt-3">
                    <div className="flex items-baseline justify-between">
                        <div>
                            <span className="text-primary font-bold text-lg">
                                {formatCurrency(property.pricing?.monthly || 0)}
                            </span>
                            <span className="text-gray-600 text-sm">/month</span>
                        </div>
                        <div className="text-right">
                            <span className="text-gray-700 font-semibold text-sm">
                                {formatCurrency(property.pricing?.yearly || 0)}
                            </span>
                            <span className="text-gray-500 text-xs block">/year</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
