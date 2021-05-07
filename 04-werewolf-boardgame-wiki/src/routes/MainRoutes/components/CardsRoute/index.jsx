import React from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router";
import { PATHS } from "../../../../constants/paths";
import Cards from "../../../../pages/Cards";
import { resetResult } from "../../../../redux/slices/CardResultSlice";

export default function CardsRoute() {
    const dispatch = useDispatch();
    return (
        <Switch>
            <Route
                exact
                path={PATHS.CARDS}
                component={() => {
                    dispatch(resetResult());
                    return <Cards />;
                }}
            />
        </Switch>
    );
}
