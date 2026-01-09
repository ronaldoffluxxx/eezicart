import type { Metadata } from "next";
import { Inter, Sniglet } from "next/font/google";
import { ToastProvider } from "@/components/ToastProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const sniglet = Sniglet({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-sniglet",
});

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
            <body className={`${inter.className} ${sniglet.variable} antialiased`} suppressHydrationWarning>
                <ToastProvider>
                    {children}
                </ToastProvider>
            </body>
        </html>
    );
}
