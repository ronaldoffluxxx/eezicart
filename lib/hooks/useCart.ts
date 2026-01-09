'use client';

import { useState, useEffect } from 'react';
import type { CartItem, Product } from '@/lib/types';

interface CartState {
    items: CartItem[];
    itemCount: number;
    subtotal: number;
    deliveryFee: number;
    total: number;
}

export function useCart() {
    const [cart, setCart] = useState<CartState>({
        items: [],
        itemCount: 0,
        subtotal: 0,
        deliveryFee: 0,
        total: 0,
    });

    // Load cart from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                try {
                    const items: CartItem[] = JSON.parse(savedCart);
                    updateCartState(items);
                } catch (e) {
                    console.error('Failed to parse cart data:', e);
                    localStorage.removeItem('cart');
                }
            }
        }
    }, []);

    // Calculate cart totals
    const calculateTotals = (items: CartItem[]) => {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Group items by vendor to calculate delivery fees
        const vendorGroups = items.reduce((groups, item) => {
            if (!groups[item.vendorId]) {
                groups[item.vendorId] = [];
            }
            groups[item.vendorId].push(item);
            return groups;
        }, {} as Record<string, CartItem[]>);

        // Delivery fee: 2000 per vendor
        const deliveryFee = Object.keys(vendorGroups).length * 2000;
        const total = subtotal + deliveryFee;
        const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

        return { subtotal, deliveryFee, total, itemCount };
    };

    // Update cart state and localStorage
    const updateCartState = (items: CartItem[]) => {
        const totals = calculateTotals(items);
        setCart({
            items,
            ...totals,
        });
        localStorage.setItem('cart', JSON.stringify(items));
    };

    // Add item to cart
    const addItem = (product: Product, quantity: number = 1, variation?: Record<string, string>) => {
        const existingItemIndex = cart.items.findIndex(
            item => item.productId === product.id &&
                JSON.stringify(item.variation) === JSON.stringify(variation)
        );

        let newItems: CartItem[];

        if (existingItemIndex > -1) {
            // Update quantity of existing item
            newItems = [...cart.items];
            const newQuantity = newItems[existingItemIndex].quantity + quantity;

            // Check stock limit
            if (newQuantity > product.stock) {
                alert(`Only ${product.stock} items available in stock`);
                return;
            }

            newItems[existingItemIndex].quantity = newQuantity;
        } else {
            // Add new item
            if (quantity > product.stock) {
                alert(`Only ${product.stock} items available in stock`);
                return;
            }

            const newItem: CartItem = {
                id: `${product.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                productId: product.id,
                vendorId: product.vendorId,
                name: product.name,
                image: product.images[0] || '',
                price: product.price,
                quantity,
                variation,
                stock: product.stock,
            };

            newItems = [...cart.items, newItem];
        }

        updateCartState(newItems);
    };

    // Remove item from cart
    const removeItem = (productId: string, variation?: Record<string, string>) => {
        const newItems = cart.items.filter(
            item => !(item.productId === productId &&
                JSON.stringify(item.variation) === JSON.stringify(variation))
        );
        updateCartState(newItems);
    };

    // Update item quantity
    const updateQuantity = (productId: string, quantity: number, variation?: Record<string, string>) => {
        if (quantity <= 0) {
            removeItem(productId, variation);
            return;
        }

        const newItems = cart.items.map(item => {
            if (item.productId === productId &&
                JSON.stringify(item.variation) === JSON.stringify(variation)) {

                // Check stock limit
                if (quantity > item.stock) {
                    alert(`Only ${item.stock} items available in stock`);
                    return item;
                }

                return { ...item, quantity };
            }
            return item;
        });

        updateCartState(newItems);
    };

    // Clear entire cart
    const clearCart = () => {
        updateCartState([]);
    };

    // Get items grouped by vendor
    const getItemsByVendor = () => {
        return cart.items.reduce((groups, item) => {
            if (!groups[item.vendorId]) {
                groups[item.vendorId] = [];
            }
            groups[item.vendorId].push(item);
            return groups;
        }, {} as Record<string, CartItem[]>);
    };

    return {
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItemsByVendor,
    };
}
