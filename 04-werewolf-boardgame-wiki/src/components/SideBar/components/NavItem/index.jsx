import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export default function NavItem({ title, icon, href }) {
    return (
        <li className={styles.li}>
            <Link to={href} className={styles.link}>
                <div>{icon}</div>
                <div>{title}</div>
            </Link>
        </li>
    );
}
