import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "EeziCart Virtual Market - Shop, Rent & Own",
    description: "Multi-vendor marketplace for products and property rentals with flexible payment options",
    keywords: "marketplace, e-commerce, property rental, Nigeria, shopping",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
