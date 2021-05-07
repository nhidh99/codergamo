import React from "react";
import { Route, Switch } from "react-router";
import { PATHS } from "../../../../constants/paths";
import Gameplay from "../../../../pages/Gameplay";

export default function GameplayRoute() {
    return (
        <Switch>
            <Route exact path={PATHS.GAMEPLAY} component={Gameplay} />
        </Switch>
    );
}
