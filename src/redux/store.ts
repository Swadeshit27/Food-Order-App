import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Count from "./slices/Cont"
import User from "./slices/userSlice"
import Cart from "./slices/CartSlice"
import Order from "./slices/OrderSlice"

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const combinedReducer = combineReducers({
    User, Count, Cart, Order
})
const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
    reducer: {
        food: persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
                ignoredPaths: ['some.path.to.ignore'],
            },
        }),
});

export const persistedStore = persistStore(store)
type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector