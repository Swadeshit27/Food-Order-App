import {
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';
import Antd from 'react-native-vector-icons/AntDesign';
import { colors } from '../../utils/Constants';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { decreaseQty, increaseQty, RemoveItems, resetCart } from '../../redux/slices/CartSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { AddOrderItems } from '../../redux/slices/OrderSlice';


export type cartStackParamList = {
    CartItem: undefined;
    Address: undefined;
    Payment: undefined;
    PaymentSuccess: { amount: number };
};

export type cartProps = StackNavigationProp<cartStackParamList>;

const CartCard = ({ navigation }: { navigation: cartProps }) => {
    const { cartItems, total } = useAppSelector(state => state.food.Cart);
    const dispatch = useAppDispatch();
    const PlaceOrder = () => {
        dispatch(AddOrderItems({ cartItems, total }));
        dispatch(resetCart());
        navigation.navigate('Address');
    }



    const ShowCard = ({ item }: { item: foodType }) => {
        const { title, deliveryTime, imgSrc, price, originalPrice, rating, qty } = item;
        return (
            <View style={styles.cardContainer}>
                <View style={styles.cartContainer}>
                    <View style={{ marginEnd: 20 }}>
                        <Image
                            source={{
                                uri: imgSrc,
                            }}
                            width={120}
                            height={70}
                            style={{ objectFit: 'contain' }}
                        />
                        <View style={styles.incDecBtnContainer}>
                            <TouchableOpacity
                                style={styles.commonBtn}
                                onPress={() => dispatch(decreaseQty(item))}
                            >
                                <Text style={{ color: colors.title, fontSize: 14 }}>-</Text>
                            </TouchableOpacity>
                            <Text style={{ color: colors.title, fontSize: 16 }}>{qty}</Text>
                            <TouchableOpacity
                                style={styles.commonBtn}
                                onPress={() => dispatch(increaseQty(item))}
                            >
                                <Text style={{ color: colors.title, fontSize: 14 }}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.title}>{title}</Text>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 6,
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
                            <Text style={{ color: colors.para, marginStart: 10 }}>({Math.floor(Math.random() * 1000)})</Text>
                        </View>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 6,
                            }}>
                            <Text style={{ color: 'green', fontWeight: '500', marginEnd: 10 }}>
                                {Math.floor(((originalPrice - price) / originalPrice) * 100)}% off
                            </Text>
                            <Text
                                style={{
                                    color: colors.para,
                                    textDecorationLine: 'line-through',
                                    marginEnd: 10,
                                }}>
                                ₹{originalPrice}
                            </Text>
                            <Text
                                style={{ color: colors.title, fontSize: 18, fontWeight: '600' }}>
                                ₹{price}
                            </Text>
                        </View>
                        <Text style={{ fontSize: 13, color: colors.para }}>Delivery within {deliveryTime}</Text>
                    </View>
                </View>
                <View style={styles.action}>
                    <Pressable
                        style={[styles.flexProp, { width: "50%" }]}
                        onPress={() => dispatch(RemoveItems(item))}
                    >
                        <Antd name='delete' color={colors.para} size={18} />
                        <Text style={styles.btnText}>Remove Item</Text>
                    </Pressable>
                    <Pressable style={[styles.flexProp, { width: "50%" }]}>
                        <Antd name='shoppingcart' color={colors.para} size={18} />
                        <Text style={styles.btnText}>Buy This</Text>
                    </Pressable>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {cartItems.length <= 0 ?
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >
                    <Text style={{ fontSize: 24, fontWeight: "600", color: colors.para }}>Sorry, Cart is empty</Text>
                </View>
                :
                <>
                    <FlatList
                        data={cartItems}
                        renderItem={ShowCard}
                        keyExtractor={item => item.id}
                    />
                    <View style={styles.orderContainer}>
                        <Text style={{ fontSize: 32, fontWeight: "700", color: colors.title }}>{total}</Text>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={PlaceOrder}
                        >
                            <Text style={{ fontSize: 18, fontWeight: "500", color: colors.white }}>Place order</Text>
                        </TouchableOpacity>
                    </View>
                </>
            }
        </SafeAreaView >
    );
};

export default CartCard;

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        backgroundColor: colors.white,
        height: 200,
        marginTop: 15,
        padding: 20,
    },
    flexProp: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    cartContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    incDecBtnContainer: {
        width: 100,
        height: 35,
        borderRadius: 4,
        backgroundColor: colors.inputBg,
        marginVertical: 15,
        padding: 4,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    commonBtn: {
        width: 30,
        height: 30,
        backgroundColor: 'white',
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: colors.title,
        fontSize: 18,
        fontWeight: '600',
        textTransform: 'capitalize',
        marginBottom: 6,
    },
    action: {
        width: "100%",
        height: 40,
        borderTopColor: colors.bg_2,
        borderTopWidth: 1,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        // backgroundColor:"red"
    },
    btnText: {
        color: colors.para,
        fontSize: 16,
        marginStart: 6,
        fontWeight: "500"
    },
    orderContainer: {
        width: "100%",
        height: 80,
        paddingHorizontal: 20,
        backgroundColor: colors.white,
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    btn: {
        width: 200,
        height: 50,
        borderRadius: 10,
        backgroundColor: colors.red_1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
});
