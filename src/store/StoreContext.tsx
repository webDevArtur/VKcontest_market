import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { makeAutoObservable } from 'mobx';
import { fetchCartItems } from '../api/api';
import { CartItem } from './types';

export class CartStore {
    cartItems: CartItem[] = [];
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchCartItems() {
        try {
            const data = await fetchCartItems();
            this.cartItems = data.map(item => ({ ...item, quantity: 1 }));
        } catch (error) {
            console.error('Error fetching cart items:', error);
            this.error = 'Ошибка запроса к серверу';
        }
    }

    removeFromCart(productId: number) {
        this.cartItems = this.cartItems.filter(item => item.id !== productId);
    }

    changeQuantity(productId: number, newQuantity: number) {
        const itemIndex = this.cartItems.findIndex(item => item.id === productId);
        if (itemIndex !== -1) {
            if (newQuantity <= 10) {
                this.cartItems[itemIndex].quantity = newQuantity;
            } else {
                this.cartItems[itemIndex].quantity = 10;
            }
        }
    }

    get totalAmount() {
        return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    get totalItemsCount() {
        return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    }
}

const storeContext = createContext<CartStore | null>(null);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [store, setStore] = useState<CartStore | null>(null);

    useEffect(() => {
        const initializeStore = async () => {
            const newStore = new CartStore();
            await newStore.fetchCartItems();
            setStore(newStore);
        };

        initializeStore();
    }, []);

    return (
        <storeContext.Provider value={store}>
            {store ? children : null}
        </storeContext.Provider>
    );
};

export const useStore = (): CartStore => {
    const store = useContext(storeContext);
    if (!store) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return store;
};
