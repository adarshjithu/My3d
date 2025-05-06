
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '../fetures/user/productSlice';
import authReducer from '../fetures/user/authSlice'
import profileReducer from '../fetures/user/profileSlice'
import categoryReducer from '../fetures/admin/categorySlice'
import sizeReducer from '../fetures/admin/sizeSlice'
import baseReducer from '../fetures/admin/baseSlice'
import frameReducer from '../fetures/admin/frameSlice'
import adminProductsReducer from '../fetures/admin/productSlice'
import bannerReducer from '../fetures/admin/bannerSlice'
import personalizReducer from '../fetures/user/personalizeSlice'
export interface IRootState{
   product:Record<string,any>;
   auth:Record<string,any>;
   profile:Record<string,any>;
   category:Record<string,any>;
   size:Record<string,any>;
   base:Record<string,any>;
   frame:Record<string,any>;
   adminProducts:Record<string,any>;
   banner:Record<string,any>;
   personalize:Record<string,any>
}
export const store  = configureStore({
    reducer:{product:productsReducer,auth:authReducer,profile:profileReducer,category:categoryReducer,
        size:sizeReducer,base:baseReducer,frame:frameReducer,adminProducts:adminProductsReducer,
        banner:bannerReducer,
        personalize:personalizReducer
    }
})