
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartCard from '../components/cart/CartCard';
import Address from '../components/cart/Address';
import Payment from '../components/cart/Payment';
import PaymentSuccess from '../components/cart/PaymentSuccess';
const Stack = createNativeStackNavigator();

const CartPage = () => {
    return (
        <Stack.Navigator initialRouteName='CartItem' >
            <Stack.Screen
                name='CartItem'
                component={CartCard}
                options={{
                    title: "Cart Items",
                    headerTitleAlign: "center",
                }}
            />
            <Stack.Screen
                name='Address'
                component={Address}
                options={{
                    headerTitleAlign: "center",
                }}
            />
            <Stack.Screen
                name='Payment'
                component={Payment}
                options={{
                    title: "Order Preview",
                    headerTitleAlign: "center",
                }}
            />
            <Stack.Screen
                name='PaymentSuccess'
                component={PaymentSuccess}
                options={{
                    title: "Payment confirmation",
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: "#00FA76",
                    },
                }}
            />
        </Stack.Navigator>
    )
}

export default CartPage

