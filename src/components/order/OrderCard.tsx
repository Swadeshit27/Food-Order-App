import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Antd from "react-native-vector-icons/AntDesign"
import { colors } from '../../utils/Constants'

const OrderCard = ({ data }: { data: foodType }) => {
    return (
        <View style={styles.orderBox}>
            <Image source={{ uri: data.imgSrc }} style={{ width: 100, height: 100, zIndex: 99, objectFit: "contain" }} />
            <View style={styles.content}>
                <View>
                    <Text
                        style={{
                            color: colors.para,
                            fontSize: 15,
                            fontWeight: "400",
                            marginBottom: 5,
                        }}
                    >Delivered</Text>
                    <Text
                        style={{
                            color: colors.title,
                            fontSize: 18,
                            fontWeight: "500",
                            marginBottom: 8,
                        }}
                    >{data.title}</Text>
                    <TouchableOpacity>
                        <Text
                            style={{
                                color: colors.green_1,
                                fontSize: 16,
                                fontWeight: "500"
                            }}
                        >Give Feedback</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginStart: 10 }}>
                    <Antd name='right' color={colors.para} size={20} />
                </View>
            </View>
        </View>
    )
}

export default OrderCard

const styles = StyleSheet.create({
    orderBox: {
        width: "100%",
        height: 150,
        backgroundColor: "white",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    content: {
        paddingHorizontal: 20,
        width: "75%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
})