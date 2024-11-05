import { configureStore } from '@reduxjs/toolkit';
import useReducer from './Slices/userSlice';
import productReducer from './Slices/productSlice';
import cartReducer from './Slices/cartSlice';


const store = configureStore({
    reducer: { 
        user: useReducer,
        products: productReducer,
        cart: cartReducer,
    },
    
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;