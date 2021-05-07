import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomeRoutes from "./HomeRoutes";
import MainRoutes from "./MainRoutes";
import ScrollToTop from "./ScrollToTop";

export default function Routes() {
    return (
        <BrowserRouter>
            <MainLayout>
                <ScrollToTop>
                    <HomeRoutes />
                    <MainRoutes />
                </ScrollToTop>
            </MainLayout>
        </BrowserRouter>
    );
}
