import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export default function Section({ title, icon, href }) {
    return (
        <Link to={href} className={styles.link}>
            <div>{icon}</div>
            <div>{title}</div>
        </Link>
    );
}