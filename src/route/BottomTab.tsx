
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from "react-native-vector-icons/Entypo"
import Fontawasom from "react-native-vector-icons/FontAwesome5"
import Material from "react-native-vector-icons/MaterialIcons"
import { colors } from '../utils/Constants';
import Home from '../screen/Home'; 
import Profile from '../screen/Profile';
import CartPage from './CartPage';
import OrderPage from './OrderPage';
const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    tabBarInactiveTintColor: colors.para,
                    tabBarActiveTintColor: colors.red_1,
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: "500"
                    },
                    tabBarStyle: {
                        paddingVertical: 12,
                        height: 60,
                    }
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <Entypo name='home' size={24} color={focused ? colors.red_1 : colors.para} />
                        ),
                    }} />
                <Tab.Screen
                    name="Cart"
                    component={CartPage}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Fontawasom name='shopping-bag' size={22} color={focused ? colors.red_1 : colors.para} />
                        ),
                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name="Order"
                    component={OrderPage}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <Fontawasom name='shopping-cart' size={20} color={focused ? colors.red_1 : colors.para} />
                        ),
                    }} />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        title: "My profile",
                        headerTitleAlign: "center",
                        tabBarIcon: ({ focused }) => (
                            <Material name='person' size={28} color={focused ? colors.red_1 : colors.para} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </>
    )
}

export default BottomTab 