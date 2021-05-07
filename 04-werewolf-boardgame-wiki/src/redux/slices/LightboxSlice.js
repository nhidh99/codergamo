import { createSlice } from "@reduxjs/toolkit";
import { CARDS } from "../../constants/cards";

const initialState = {
    isOpen: false,
    photoIndex: 0,
};

const photoUrls = CARDS.map((c) => c.url);

const LightboxSlice = createSlice({
    name: "Lightbox",
    initialState: initialState,
    reducers: {
        openLightbox(state, action) {
            const photoIndex = photoUrls.indexOf(action.payload);
            return { isOpen: true, photoIndex: photoIndex };
        },

        closeLightbox(state) {
            return { ...state, isOpen: false };
        },

        setPhotoIndex(state, action) {
            return { ...state, photoIndex: action.payload };
        },
    },
});

export const { openLightbox, closeLightbox, setPhotoIndex } = LightboxSlice.actions;

export default LightboxSlice.reducer;
