import React from "react";
import { GiHamburgerMenu, GiWolfHowl } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../redux/slices/SidebarSlice";
import styles from "./styles.module.scss";

export default function Header() {
    const dispatch = useDispatch();
    return (
        <header className={styles.header}>
            <div>{<GiWolfHowl className={styles.icon} />} Werewolf Boardgame Wiki</div>
            <div className={styles.menu}>
                <GiHamburgerMenu
                    className={styles.icon}
                    onClick={() => dispatch(toggleSidebar())}
                />
            </div>
        </header>
    );
}
