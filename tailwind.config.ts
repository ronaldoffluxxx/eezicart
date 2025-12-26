import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#DC2626',
                    dark: '#B91C1C',
                    light: '#EF4444',
                },
                gray: {
                    50: '#F9FAFB',
                    100: '#F3F4F6',
                    200: '#E5E7EB',
                    300: '#D1D5DB',
                    400: '#9CA3AF',
                    500: '#6B7280',
                    600: '#4B5563',
                    700: '#374151',
                    800: '#1F2937',
                    900: '#111827',
                },
            },
            spacing: {
                'xs': '4px',
                'sm': '8px',
                'md': '16px',
                'lg': '24px',
                'xl': '32px',
                'xxl': '48px',
            },
            fontSize: {
                'xs': '12px',
                'sm': '14px',
                'md': '16px',
                'lg': '18px',
                'xl': '24px',
                'xxl': '32px',
                'xxxl': '40px',
            },
            fontFamily: {
                sans: ['Mr Dodo', 'sans-serif'],
            },
        },
    },
    plugins: [],
};

export default config;
