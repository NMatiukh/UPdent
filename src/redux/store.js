import {configureStore} from "@reduxjs/toolkit";
import {messageReducer} from "./reducers/messageReducer";
import {staffReducer} from "./reducers/staffReducer";
import {galleryReducer} from "./reducers/galleryPreducer";
import {priceListReducer} from "./reducers/priceListReducer";

export default configureStore({
    reducer: {
        messages: messageReducer,
        staff: staffReducer,
        gallery: galleryReducer,
        priceList: priceListReducer,
    }
});