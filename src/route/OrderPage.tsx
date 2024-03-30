
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderDetails from '../screen/OrderDetails';
import OrderHistory from '../screen/OrderHistory';
const Stack = createNativeStackNavigator();

const OrderPage = () => {
    return (
        <Stack.Navigator initialRouteName='OrderHistory' >
            <Stack.Screen
                name='OrderHistory'
                component={OrderHistory}
                options={{
                    title: 'Order History',
                    headerTitleAlign: "center",
                }}
            />
            <Stack.Screen
                name='OrderDetails'
                component={OrderDetails}
                options={{
                    title: 'Order Details',
                    headerTitleAlign: "center",
                }}
            />
        </Stack.Navigator>
    )
}

export default OrderPage

