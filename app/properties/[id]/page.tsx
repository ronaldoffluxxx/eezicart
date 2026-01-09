'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, MapPin, Bed, Bath, Square, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import InstallmentCalculator from '@/components/InstallmentCalculator';
import { formatCurrency } from '@/lib/utils/formatting';
import { safeLocalStorageGet } from '@/lib/utils/safeStorage';
import type { Property, User } from '@/lib/types';

export default function PropertyDetailPage() {
    const router = useRouter();
    const params = useParams();
    const propertyId = params.id as string;

    const [property, setProperty] = useState<Property | null>(null);
    const [landlord, setLandlord] = useState<User | null>(null);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        // Load property
        const properties = safeLocalStorageGet<Property[]>('properties', []);
        if (properties) {
            const foundProperty = properties.find(p => p.id === propertyId);
            if (foundProperty) {
                setProperty(foundProperty);

                // Load landlord info
                const users = safeLocalStorageGet<User[]>('users', []);
                if (users) {
                    const foundLandlord = users.find(u => u.id === foundProperty.landlordId);
                    if (foundLandlord) {
                        setLandlord(foundLandlord);
                    }
                }
            }
        }
    }, [propertyId]);

    if (!property) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Loading property...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="pb-20">
                {/* Back Button */}
                <div className="bg-white px-4 py-3 border-b border-gray-200">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-gray-700 hover:text-primary"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        <span className="font-medium">Back</span>
                    </button>
                </div>

                {/* Property Images */}
                <div className="bg-white">
                    <div className="relative h-80">
                        {property.images && property.images.length > 0 ? (
                            <Image
                                src={property.images[selectedImage]}
                                alt={property.title}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <MapPin className="w-16 h-16 text-gray-400" />
                            </div>
                        )}
                    </div>

                    {/* Image Thumbnails */}
                    {property.images && property.images.length > 1 && (
                        <div className="flex gap-2 p-4 overflow-x-auto">
                            {property.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${selectedImage === index ? 'border-primary' : 'border-gray-200'
                                        }`}
                                >
                                    <Image
                                        src={image}
                                        alt={`${property.title} ${index + 1}`}
                                        width={80}
                                        height={80}
                                        className="object-cover w-full h-full"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Property Info */}
                <div className="bg-white mt-2 p-4">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h1>

                    {/* Location */}
                    <div className="flex items-center text-gray-600 mb-4">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{property.location?.address}, {property.location?.city}, {property.location?.state}</span>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                        <div className="text-3xl font-bold text-primary">
                            {formatCurrency(property.pricing.monthly)}
                            <span className="text-base text-gray-600 font-normal">/month</span>
                        </div>
                    </div>

                    {/* Property Features */}
                    <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-200">
                        <div className="text-center">
                            <Bed className="w-6 h-6 mx-auto text-gray-600 mb-1" />
                            <p className="text-sm text-gray-600">{property.specs.bedrooms} Beds</p>
                        </div>
                        <div className="text-center">
                            <Bath className="w-6 h-6 mx-auto text-gray-600 mb-1" />
                            <p className="text-sm text-gray-600">{property.specs.bathrooms} Baths</p>
                        </div>
                        <div className="text-center">
                            <Square className="w-6 h-6 mx-auto text-gray-600 mb-1" />
                            <p className="text-sm text-gray-600">{property.specs.size} sqm</p>
                        </div>
                    </div>

                    {/* Installment Calculator */}
                    <div className="py-4 border-b border-gray-200">
                        <InstallmentCalculator productPrice={property.pricing.yearly} />
                    </div>

                    {/* Description */}
                    <div className="mt-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-2">Description</h2>
                        <p className="text-gray-700 leading-relaxed">{property.description}</p>
                    </div>

                    {/* Amenities */}
                    {property.amenities && property.amenities.length > 0 && (
                        <div className="mt-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-3">Amenities</h2>
                            <div className="grid grid-cols-2 gap-2">
                                {property.amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center text-gray-700">
                                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                                        <span className="text-sm">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Landlord Info */}
                    {landlord && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                            <h2 className="text-lg font-bold text-gray-900 mb-3">Landlord</h2>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-3">
                                    {landlord.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{landlord.name}</p>
                                    <p className="text-sm text-gray-600">{landlord.email}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4">
                    <div className="flex gap-3 max-w-screen-xl mx-auto">
                        <button className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors">
                            Contact Landlord
                        </button>
                        <button className="flex-1 bg-gray-100 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                            Schedule Tour
                        </button>
                    </div>
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
