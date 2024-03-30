declare module '*.jpg';
declare module '*.png';
declare module 'redux-persist/lib/storage' {
    const storage: any;
    export default storage;
}
// In your redux-persist-custom.d.ts file
declare module 'redux-persist/integration/react' {
    export const PersistGate: any;
}

interface User {
    _id?: string | any;
    name: string,
    email: string,
    password: string,
    mobile?: string,
    gender?: string,
    bio?: string,
}
interface ProfileData {
    name?: string,
    email?: string,
    mobile?: string,
    gender?: string,
    bio?: string,
}
interface foodItemType {
    imgSrc: string,
    title: string,
    description: string,
    price: number,
    rating: number,
    deliveryTime: string,
    originalPrice: number,
    id: string,
    category: string,
}

interface foodType extends foodItemType {
    qty: number;
}
interface AddressType{
    name: string,
    mobile: string | number,
    pin: string | number,
    state: string,
    city: string,
    location: string,
}