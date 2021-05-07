import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../../../redux/slices/SidebarSlice";
import styles from "./styles.module.scss";

export default function HeaderMenu() {
    const dispatch = useDispatch();
    return (
        <div className={styles.menu}>
            <GiHamburgerMenu className={styles.icon} onClick={() => dispatch(toggleSidebar())} />
        </div>
    );
}
