import {configureStore} from "@reduxjs/toolkit";
import {priceListReducer} from "./reducers/priceListReducer";

export default configureStore({
    reducer: {
        priceList: priceListReducer,
    }
});