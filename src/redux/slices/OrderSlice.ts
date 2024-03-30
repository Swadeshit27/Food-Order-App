
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface OrderType {
    orderItems: foodType[],
    orderAddress: null | AddressType;
    paymentDetails: null | object;
    finalPrice: number;
}

interface orderPropsType {
    cartItems: foodType[],
    total: number
}

const initialState: OrderType = {
    orderItems: [],
    orderAddress: null,
    paymentDetails: null,
    finalPrice: 0,
}

export const OrderSlice = createSlice({
    name: 'Order',
    initialState,
    reducers: {
        AddOrderItems: (state, action: PayloadAction<orderPropsType>) => {
            const { cartItems, total } = action.payload;
            state.orderItems = cartItems;
            state.finalPrice = total;
        },
        AddAddress: (state, action: PayloadAction<AddressType>) => {
            console.log(action.payload);
            state.orderAddress = action.payload
        },
        SavePaymentDetails: (state, action: PayloadAction) => {
            console.log(action.payload);
        },
        ResetAll: (state) => {
            console.log("enter reset all state");
            state.orderItems = [];
            state.orderAddress = null;
            state.paymentDetails = null;
            state.finalPrice = 0;
        }
    },
})

export const { AddOrderItems, AddAddress, SavePaymentDetails, ResetAll } = OrderSlice.actions

export default OrderSlice.reducer