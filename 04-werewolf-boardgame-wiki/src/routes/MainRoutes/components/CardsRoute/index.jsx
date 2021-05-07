import React from "react";
import { Route, Switch } from "react-router";
import { PATHS } from "../../../../constants/paths";
import Cards from "../../../../pages/Cards";

export default function CardsRoute() {
    return (
        <Switch>
            <Route exact path={PATHS.CARDS} component={Cards} />
        </Switch>
    );
}
