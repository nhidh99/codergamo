import React from "react";
import { Route, Switch } from "react-router";
import { PATHS } from "../../../../constants/paths";
import Introduction from "../../../../pages/Introduction";

export default function IntroductionRoute() {
    return (
        <Switch>
            <Route exact path={PATHS.INTRODUCTION} component={Introduction} />
        </Switch>
    );
}
