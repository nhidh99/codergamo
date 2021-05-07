import React from "react";
import { Route, Switch } from "react-router";
import { NAV_PATHS } from "../../../../constants/paths";
import SideBar from "../../../../components/SideBar";

export default function SidebarRoute() {
    return (
        <Switch>
            <Route exact path={NAV_PATHS} component={SideBar} />
        </Switch>
    );
}
