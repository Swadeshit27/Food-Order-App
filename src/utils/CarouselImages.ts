import { ImageSourcePropType } from "react-native";
import Food1 from "../assets/food-1.jpg";
import Food2 from "../assets/food-2.jpg";
import Food3 from "../assets/food-3.jpg"; 

export interface ImagType {
    id: string;
    imgSrc: ImageSourcePropType
}

export const CarouselImages: ImagType[] = [
    {
        id: '1',
        imgSrc: Food1
    },
    {
        id: '2',
        imgSrc: Food2
    },
    {
        id: '3',
        imgSrc: Food3
    },
    {
        id: '4',
        imgSrc: Food2
    },
]