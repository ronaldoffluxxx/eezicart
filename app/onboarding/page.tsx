'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

const onboardingSlides = [
    {
        title: 'Shop Everything in One Place',
        description: 'From fashion to groceries, electronics to real estate - discover thousands of products from trusted vendors near you',
        icon: '🛍️',
    },
    {
        title: 'Rent Your Dream Home',
        description: 'Find and rent properties with flexible payment options. Every monthly payment brings you closer to ownership!',
        icon: '🏠',
    },
    {
        title: 'Secure Payments & Wallet',
        description: 'Pay safely with your wallet, cards, or eNaira. Track all transactions in one place',
        icon: '💳',
    },
];

export default function OnboardingPage() {
    const router = useRouter();
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNext = () => {
        if (currentSlide < onboardingSlides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        } else {
            router.push('/login');
        }
    };

    const handleSkip = () => {
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Skip button */}
            <div className="absolute top-4 right-4 z-10">
                <button
                    onClick={handleSkip}
                    className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2"
                >
                    Skip
                </button>
            </div>

            {/* Slides */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
                <div className="w-full max-w-md text-center animate-fade-in">
                    {/* Icon */}
                    <div className="text-8xl mb-8">
                        {onboardingSlides[currentSlide].icon}
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        {onboardingSlides[currentSlide].title}
                    </h1>

                    {/* Description */}
                    <p className="text-lg text-gray-600 leading-relaxed">
                        {onboardingSlides[currentSlide].description}
                    </p>
                </div>
            </div>

            {/* Bottom section */}
            <div className="px-6 pb-8">
                {/* Dots indicator */}
                <div className="flex justify-center items-center space-x-2 mb-8">
                    {onboardingSlides.map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 rounded-full transition-all ${index === currentSlide
                                    ? 'w-8 bg-primary'
                                    : 'w-2 bg-gray-300'
                                }`}
                        />
                    ))}
                </div>

                {/* Next/Get Started button */}
                <button
                    onClick={handleNext}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                >
                    <span>
                        {currentSlide === onboardingSlides.length - 1 ? 'Get Started' : 'Next'}
                    </span>
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
