import { createSlice } from "@reduxjs/toolkit";

const SidebarSlice = createSlice({
    name: "Sidebar",
    initialState: { value: window.innerWidth >= 1024 },
    reducers: {
        closeSidebar(state) {
            state.value = false;
        },
        toggleSidebar(state) {
            state.value = !state.value;
        },
    },
});

export const { toggleSidebar, closeSidebar } = SidebarSlice.actions;

export default SidebarSlice.reducer;
