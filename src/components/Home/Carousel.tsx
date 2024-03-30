
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { CarouselImages, ImagType } from '../../utils/CarouselImages';
import { colors } from '../../utils/Constants';

const screenWidth = Dimensions.get('window').width;

const Carousel: React.FC = () => {
  const [activeInd, setActiveInd] = useState<number>(0);
  const carouselRef = useRef<FlatList<ImagType>>(null); // Typing the ref

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPos = event.nativeEvent.contentOffset.x;
    const ind = Math.round(scrollPos / screenWidth);
    setActiveInd(ind);
  };

  const getItemLayout = (data: any, index: number) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeInd === CarouselImages.length - 1) {
        carouselRef.current?.scrollToIndex({
          index: 0,
          animated: true,
        });
      } else {
        carouselRef.current?.scrollToIndex({
          index: activeInd + 1,
          animated: true,
        });
      }
    }, 2000);
    return () => clearInterval(interval);  
  }, [activeInd]);

  const RenderDots: React.FC = () => (
    <>
      {CarouselImages.map((item, index) => (
        <View
          key={item.id}
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: activeInd === index ? colors.red_1 : colors.bg_2,
            marginHorizontal: 4,
          }}
        />
      ))}
    </>
  );

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        data={CarouselImages}
        renderItem={({ item }) => (
          <View>
            <Image
              source={item.imgSrc}
              style={{ width: screenWidth, height: 250 }} // Removed objectFit as it's not a valid style property in React Native
            />
          </View>
        )}
        keyExtractor={item => item.id}
        horizontal={true}
        onScroll={handleScroll}
        ref={carouselRef}
        getItemLayout={getItemLayout}
      />
      <View style={styles.dotContainer}>
        <RenderDots />
      </View>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  carouselContainer: {
    width: '100%',
    height: 250,
    position: 'relative',
  },
  dotContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 8,
    left: '45%',
  },
});
