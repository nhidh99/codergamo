import { Route } from "react-router";
import { NAV_PATHS } from "../../constants/paths";
import CardsRoute from "./components/CardsRoute";
import GameplayRoute from "./components/GameplayRoute";
import IntroductionRoute from "./components/IntroductionRoute";
import SidebarRoute from "./components/SidebarRoutes";
import styles from "./styles.module.scss";

export default function MainRoutes() {
    return (
        <Route
            path={NAV_PATHS}
            component={() => (
                <main className={styles.main}>
                    <SidebarRoute />
                    <div className={styles.container}>
                        <IntroductionRoute />
                        <CardsRoute />
                        <GameplayRoute />
                    </div>
                </main>
            )}
        />
    );
}
