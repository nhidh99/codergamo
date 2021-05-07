import Header from "../components/Header";
import styles from "./styles.module.scss";

export default function MainLayout({ children }) {
    return (
        <div className={styles.app}>
            <Header />
            <div className={styles.container}>{children}</div>
        </div>
    );
}
