import { combineReducers } from "@reduxjs/toolkit";
import CardResultSlice from "../slices/CardResultSlice";
import LightboxSlice from "../slices/LightboxSlice";
import SidebarSlice from "../slices/SidebarSlice";

const rootReducer = combineReducers({
    cardResult: CardResultSlice,
    lightbox: LightboxSlice,
    isOpenSidebar: SidebarSlice,
});

export default rootReducer;
