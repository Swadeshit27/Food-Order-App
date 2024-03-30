
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Snackbar from 'react-native-snackbar';
import { colors } from '../../utils/Constants';

interface foodType extends foodItemType {
    qty: number;
}

interface cartType {
    cartItems: foodType[],
    total: number,
    originalPrice: number,
}

const initialState: cartType = {
    cartItems: [],
    total: 0,
    originalPrice: 0,
}

export const CartSlice = createSlice({
    name: 'Cart',
    initialState,
    reducers: {
        AddToCart: (state, action: PayloadAction<foodItemType>) => {
            const { id, price, originalPrice } = action.payload;
            const index = state.cartItems.findIndex(
                product => product.id === id,
            );
            if (index != -1) {
                state.cartItems[index].qty += 1;
            }
            else {
                const tempData = { ...action.payload, qty: 1 }
                state.cartItems.push(tempData);
            }
            state.total += price;
            state.originalPrice += originalPrice;
            Snackbar.show({
                text: "Item is added to the cart",
                backgroundColor: colors.green_1,
                textColor: colors.white,
                duration: Snackbar.LENGTH_SHORT,
            });
        },
        RemoveItems: (state, action: PayloadAction<foodType>) => {
            const { id, price, originalPrice, qty } = action.payload;
            state.total -= (price * qty);
            state.originalPrice -= (originalPrice * qty);
            const updateItems = state.cartItems.filter(val => val.id !== id);
            state.cartItems = updateItems;
            Snackbar.show({
                text: "Item is removed from cart",
                backgroundColor: colors.green_1,
                textColor: colors.white,
                duration: Snackbar.LENGTH_SHORT,
            });
        },
        increaseQty: (state, action: PayloadAction<foodType>) => {
            const { id, price, originalPrice, qty } = action.payload;
            const index = state.cartItems.findIndex(
                product => product.id === id,
            );
            if (qty < 10) {
                state.cartItems[index].qty += 1;
                state.total += price;
                state.originalPrice += originalPrice;
            }
            else {
                Snackbar.show({
                    text: "Maximum quantity should be 10",
                    backgroundColor: colors.red_1,
                    textColor: colors.white,
                    duration: Snackbar.LENGTH_SHORT,
                });
            }
        },
        decreaseQty: (state, action: PayloadAction<foodType>) => {
            const { id, price, originalPrice, qty } = action.payload;
            const index = state.cartItems.findIndex(
                product => product.id === id,
            );
            if (qty > 1) {
                state.cartItems[index].qty -= 1;
                state.total -= price;
                state.originalPrice -= originalPrice;
            }
            else {
                Snackbar.show({
                    text: "Minimum quantity should be 1",
                    backgroundColor: colors.red_1,
                    textColor: colors.white,
                    duration: Snackbar.LENGTH_SHORT,
                });
            }
        },
        resetCart: (state) => {
            state.cartItems = [];
            state.total = 0;
            state.originalPrice = 0;
        }
    },
})

export const { AddToCart, RemoveItems, increaseQty, decreaseQty, resetCart } = CartSlice.actions

export default CartSlice.reducer