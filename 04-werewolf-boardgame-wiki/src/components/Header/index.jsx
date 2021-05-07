import React from "react";
import { Route, Switch } from "react-router-dom";
import { NAV_PATHS } from "../../constants/paths";
import HeaderLogo from "./components/HeaderLogo";
import HeaderMenu from "./components/HeaderMenu";
import styles from "./styles.module.scss";

export default function Header() {
    return (
        <header className={styles.header}>
            <HeaderLogo />
            <Switch>
                <Route path={NAV_PATHS} component={HeaderMenu} />
            </Switch>
        </header>
    );
}
