import React from "react";
import { Route, Switch } from "react-router";
import { PATHS } from "../../constants/paths";
import Home from "../../pages/Home";

export default function HomeRoutes() {
    return (
        <Switch>
            <Route exact path={PATHS.HOME} component={Home} />
        </Switch>
    );
}
