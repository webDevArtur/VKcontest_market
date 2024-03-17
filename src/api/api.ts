import axios from 'axios';
import { CartItem } from '../store/types';

export const fetchCartItems = async (): Promise<CartItem[]> => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products?limit=3');
        return response.data;
    } catch (error) {
        console.error('Error fetching cart items:', error);
        return [];
    }
};
