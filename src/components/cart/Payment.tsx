import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../../utils/Constants'
import Antd from 'react-native-vector-icons/AntDesign';
import { cartProps } from './CartCard'
import axios from 'axios'
import Snackbar from 'react-native-snackbar'
import Loading from '../Loading'
import { ResetAll } from '../../redux/slices/OrderSlice'

const Payment = ({ navigation }: { navigation: cartProps }) => {
  const [loading, setLoading] = useState(false);
  const { finalPrice, orderAddress, orderItems } = useAppSelector(state => state.food.Order)
  const dispatch = useAppDispatch();
  const handelCheckOut = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('https://food-delivery-app-backend-7q06.onrender.com/order', { finalPrice, orderAddress, orderItems });
      console.log(data);
      dispatch(ResetAll());
      Snackbar.show({
        text: data.message,
        backgroundColor: colors.green_1,
        textColor: colors.white,
        duration: Snackbar.LENGTH_SHORT,
      });
      navigation.navigate('PaymentSuccess', { amount: finalPrice })
    } catch (error) {
      let errorData = "internal error";
      // @ts-ignore
      errorData = error?.response?.data?.message;
      Snackbar.show({
        text: errorData,
        backgroundColor: colors.red_1,
        textColor: colors.white,
        duration: Snackbar.LENGTH_SHORT,
      });
    } finally {
      setLoading(false);
    }
  }

  const ShowCard = ({ item }: { item: foodType }) => {
    const { title, imgSrc, price, originalPrice, rating, qty } = item;
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
            <Text style={{ color: colors.para, fontSize: 16, marginTop: 8, textAlign: "center" }}> Qty- {qty}</Text>
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
          </View>
        </View>
      </View>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {
        loading ? <Loading /> :
          <>
            <FlatList
              data={orderItems}
              renderItem={ShowCard}
              keyExtractor={item => item.id}
            />
            <View style={styles.addressBox}>
              <Text
                style={{ color: colors.title, fontSize: 18, fontWeight: "600", marginBottom: 8, }}
              >Delivery Address </Text>
              <Text
                style={{ color: colors.title, fontSize: 16, fontWeight: "500" }}
              >{orderAddress?.name} {orderAddress?.mobile} {orderAddress?.pin}</Text>
              <Text
                style={{ color: colors.para, fontSize: 16, fontWeight: "500" }}
              >{orderAddress?.city} {orderAddress?.state}</Text>
              <Text
                style={{ color: colors.para, fontSize: 16, fontWeight: "500" }}
              >{orderAddress?.location}</Text>
            </View>
            <View style={styles.orderContainer}>
              <Text style={{ fontSize: 32, fontWeight: "700", color: colors.title }}>{finalPrice}</Text>
              <TouchableOpacity
                style={styles.btn}
                onPress={handelCheckOut}
              >
                <Text style={{ fontSize: 18, fontWeight: "500", color: colors.white }}>Pay Now</Text>
              </TouchableOpacity>
            </View>
          </>
      }
    </SafeAreaView>
  )
}

export default Payment

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    backgroundColor: colors.white,
    height: 140,
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
    borderTopColor: colors.border,
    borderTopWidth: 1,
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
  },
  addressBox: {
    width: "100%",
    height: 150,
    backgroundColor: "white",
    paddingHorizontal: 30,
    paddingVertical: 15,
  }
})