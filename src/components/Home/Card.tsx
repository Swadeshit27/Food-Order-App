
import React from 'react'
import { colors } from '../../utils/Constants'
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Antd from 'react-native-vector-icons/AntDesign'; 
import { useAppDispatch } from '../../redux/store';
import { AddToCart } from '../../redux/slices/CartSlice';


const Card = ({ data }: { data: foodItemType }) => {
    const { title, imgSrc, rating, price } = data;
    const dispatch = useAppDispatch();
    return (
        <View style={styles.card}>
            <Image
                source={{
                    uri: imgSrc,
                }}
                style={{ width: '100%', height: 200, objectFit: 'cover' }}
            />
            <Antd name='heart' style={styles.heart} size={20} />
            <View style={{ padding: 15, }}>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: "space-between",
                        alignItems: 'center',
                        marginBottom: 10,
                    }}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: "space-between",
                        alignItems: 'center',
                    }}>
                        <Text
                            style={{
                                color: colors.para,
                                fontWeight: '600',
                                fontSize: 16,
                                marginEnd: 6,
                            }}>
                            {rating}
                        </Text>
                        <Antd name="star" color={colors.red_1} size={18} />
                    </View>
                </View>
                <View style={styles.btnContainer}>
                    <Text style={styles.title}>₹{price}</Text>
                    <TouchableOpacity style={styles.buyBtn}>
                        <Icon name="shopping-cart" color={'white'} size={20} />
                        <Text
                            style={{
                                fontSize: 18,
                                color: colors.white,
                                marginStart: 10,
                            }}>Buy Now</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cartBtn} onPress={() => dispatch(AddToCart(data))} >
                        <Icon name="shopping-bag" color={colors.red_1} size={20} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    card: {
        width: '90%',
        marginHorizontal: '5%',
        height: "auto",
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 20,
        backgroundColor: colors.white,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    title: {
        color: colors.title,
        fontSize: 20,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-around",
        marginVertical: 10,
    },
    cartBtn: {
        width: 60,
        height: 50,
        borderWidth: 2,
        borderColor: colors.red_1,
        borderRadius: 6,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    buyBtn: {
        width: 150,
        height: 50,
        backgroundColor: colors.red_1,
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    heart: {
        position: "absolute",
        top: 10,
        right: 10,
        color: colors.red_1
    }
})