import { configureStore } from "@reduxjs/toolkit";
import authReducer from './reducer/authReducer'
import productReducer from './reducer/productReducer'
import reviewReducer from './reducer/reviewReducer'
import orderReducer from './reducer/orderReducer'
import cartReducer from './reducer/cartReducer'
import wishlistReducer from './reducer/wishlistReducer'
import giftReducer from './reducer/giftReducer'
import dashboardReducer from './reducer/dashboardReducer'
/**
 * Steps for State Management
 * submit action
 * handle action in its reducer
 * register here -> Reducer
 */

export const store = configureStore({
    reducer  : {
       auth: authReducer,
       product : productReducer,
       review : reviewReducer,
       order : orderReducer,
       cart : cartReducer,
       wishlist : wishlistReducer,
       gifts : giftReducer,
       dashboard : dashboardReducer
    }
});
