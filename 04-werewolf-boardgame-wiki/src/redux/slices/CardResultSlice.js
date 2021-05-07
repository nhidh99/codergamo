import { createSlice } from "@reduxjs/toolkit";
import { CARDS } from "../../constants/cards";

const CardResultSlice = createSlice({
    name: "CardResult",
    initialState: { value: CARDS },
    reducers: {
        resetResult(state) {
            state.value = CARDS;
        },

        filterResult(state, action) {
            const key = action.payload.trim().toLowerCase();
            state.value = CARDS.filter((c) => c.key.toLowerCase().includes(key));
        },
    },
});

export const { resetResult, filterResult } = CardResultSlice.actions;

export default CardResultSlice.reducer;
