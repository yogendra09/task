import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Reducers/userReducer'
import  cartReducer  from './Reducers/cartReducer'
import  productReducer  from './Reducers/productReducer'

export const store = configureStore({
  reducer: {
    userReducer,
    cartReducer,    
    productReducer
  },
})