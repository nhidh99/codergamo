import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomeRoutes from "./HomeRoutes";
import MainRoutes from "./MainRoutes";

export default function Routes() {
    return (
        <MainLayout>
            <BrowserRouter>
                <HomeRoutes />
                <MainRoutes />
            </BrowserRouter>
        </MainLayout>
    );
}
