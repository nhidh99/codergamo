import styles from "./styles.module.scss";
import { GiBookmarklet, GiCardPick, GiVillage } from "react-icons/gi";
import Section from "./components/Section";
import { PATHS } from "../../constants/paths";

export default function Home() {
    return (
        <div className={styles.home}>
            <Section
                icon={<GiBookmarklet size={50} />}
                title="Introduction"
                href={PATHS.INTRODUCTION}
            />
            <Section
                icon={<GiVillage size={50} />}
                title="Gameplay"
                href={PATHS.GAMEPLAY}
            />
            <Section
                icon={<GiCardPick size={50} />}
                title="Cards"
                href={PATHS.CARDS}
            />
        </div>
    );
}
