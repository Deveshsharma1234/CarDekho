import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice"
import toggleSideBarReducer from "../slice/toggleSideBarSlice"
import carReducer from "../slice/carSlice"
import locationReducer from "../slice/LocationSlice"

const AppStore = configureStore({
    reducer :{
        "car": carReducer,
        "user": userReducer,
        "toggleSideBar": toggleSideBarReducer,
        "location": locationReducer,
    }
})

export default AppStore;