import { ScrollView, StyleSheet, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import OrderCard from '../components/order/OrderCard'
import axios from 'axios'
import Loading from '../components/Loading'

const OrderHistory = () => {
    const [loading, setLeading] = useState(false);
    const [orderList, setOrderList] = useState([]);
    const getOrderList = async () => {
        try {
            setLeading(true);
            const { data } = await axios.get("https://food-delivery-app-backend-7q06.onrender.com/order/get");
            console.log(data);

            setOrderList(data.order);
        } catch (error) {
            console.log(error);
        } finally {
            setLeading(false);
        }
    }
    useEffect(() => {
        getOrderList();
    }, [])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                loading ?
                    <Loading /> :
                    <ScrollView>
                        {
                            orderList.map(item => {
                                return item?.orderItems.map((ele: foodType, i: number) => <OrderCard data={ele} key={i} />)
                            })
                        }
                    </ScrollView>
            }
        </SafeAreaView>
    )
}
export default OrderHistory

const styles = StyleSheet.create({
})