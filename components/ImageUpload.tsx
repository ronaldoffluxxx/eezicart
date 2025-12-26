'use client';

import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { uploadImage, deleteImage } from '@/lib/supabase/client';

interface ImageUploadProps {
    bucket: 'product-images' | 'property-images' | 'avatars';
    onUpload: (urls: string[]) => void;
    maxImages?: number;
    existingImages?: string[];
}

export default function ImageUpload({
    bucket,
    onUpload,
    maxImages = 10,
    existingImages = [],
}: ImageUploadProps) {
    const [images, setImages] = useState<string[]>(existingImages);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        if (images.length + files.length > maxImages) {
            alert(`You can only upload up to ${maxImages} images`);
            return;
        }

        setUploading(true);

        try {
            const uploadPromises = files.map((file) => uploadImage(bucket, file));
            const results = await Promise.all(uploadPromises);

            const successfulUploads = results
                .filter((result) => result !== null)
                .map((result) => result!.url);

            const newImages = [...images, ...successfulUploads];
            setImages(newImages);
            onUpload(newImages);
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload images. Please try again.');
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleRemove = async (index: number) => {
        const imageUrl = images[index];

        // Extract path from URL
        const path = imageUrl.split('/').pop();
        if (path) {
            await deleteImage(bucket, path);
        }

        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
        onUpload(newImages);
    };

    return (
        <div className="space-y-4">
            {/* Upload Button */}
            <div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={uploading || images.length >= maxImages}
                />
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading || images.length >= maxImages}
                    className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 font-medium mb-1">
                        {uploading ? 'Uploading...' : 'Click to upload images'}
                    </p>
                    <p className="text-sm text-gray-500">
                        {images.length}/{maxImages} images uploaded
                    </p>
                </button>
            </div>

            {/* Image Preview Grid */}
            {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={image}
                                alt={`Upload ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemove(index)}
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            {index === 0 && (
                                <div className="absolute bottom-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                                    Primary
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
