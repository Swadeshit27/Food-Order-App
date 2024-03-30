import { 
    Image, 
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../utils/Constants';
import Carousel from '../components/Home/Carousel';
import { MenuList } from '../utils/MenuBar';
import Card from '../components/Home/Card';
import { SafeAreaView } from 'react-native-safe-area-context';
import { foodApi } from '../utils/Foodlist';

const Home = () => {
    const [active, setActive] = useState(1);
    const [category, setCategory] = useState("Burger");

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.Header}>
                        <View style={styles.searchContainer}>
                            <View style={styles.icon}>
                                <Icon name="search" size={20} color={colors.para} />
                            </View>
                            <TextInput placeholder="Search food..." style={styles.search} />
                        </View>
                    </View>
                    <Carousel />
                    <View style={styles.menuContainer}>
                        <ScrollView horizontal={true}>
                            {MenuList.map(item => (
                                <Pressable
                                    style={[
                                        styles.menuBox,
                                        active == item.id && { backgroundColor: colors.red_1 },
                                    ]}
                                    key={item.id}
                                    onPress={() => (setCategory(item.name), setActive(item.id))}>
                                    <Image
                                        source={item.imgSrc}
                                        style={{ width: 50, height: 40, objectFit: 'contain' }}
                                    />
                                    <Text
                                        style={[
                                            styles.text,
                                            active == item.id && { color: colors.white },
                                        ]}>
                                        {item.name}
                                    </Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>
                    <View style={styles.cardContainer}>
                        {
                            foodApi.filter(ele => ele.category === category).map(item => <Card data={item} key={item.id} />)
                        }
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(241 245 249)',
    },
    Header: {
        width: '100%',
        backgroundColor: 'white',
        height: 80,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    searchContainer: {
        width: '90%',
        marginHorizontal: '5%',
        height: 50,
        borderWidth: 1,
        borderColor: colors.border,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.bg_2,
        borderRadius: 50,
        overflow: 'hidden',
        // shadowColor: colors.bg1,
        // shadowOffset: {
        //     width: 5,
        //     height: 20,
        // },
        // shadowOpacity: 0.25,
        // elevation: 2,
    },
    search: {
        fontSize: 18,
        color: colors.title,
        paddingLeft: 10,
    },
    icon: {
        width: 50,
        height: '100%',
        backgroundColor: colors.white,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuContainer: {
        width: '100%',
        height: 100,
        backgroundColor: colors.white,
        display: 'flex',
        flexDirection: 'row',
        overflow: 'scroll',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    menuBox: {
        width: 100,
        height: 80,
        borderRadius: 15,
        backgroundColor: colors.bg_2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    text: {
        fontSize: 12,
        fontWeight: '500',
        color: colors.title,
        marginVertical: 6,
    },
    cardContainer: {
        width: '100%',
        height: 'auto',
        marginVertical: 10,
    },
});
