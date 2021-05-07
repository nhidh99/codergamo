/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, Fragment } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { closeSidebar } from "../../redux/slices/SidebarSlice";

function ScrollToTop({ history, children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        const unlisten = history.listen(() => {
            dispatch(closeSidebar());
            window.scrollTo(0, 0);
        });
        return () => {
            unlisten();
        };
    }, []);

    return <Fragment>{children}</Fragment>;
}

export default withRouter(ScrollToTop);
