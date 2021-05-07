import React, { useEffect, useState } from "react";
import { GiBookmarklet, GiCardPick, GiVillage } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { PATHS } from "../../constants/paths";
import { closeSidebar } from "../../redux/slices/SidebarSlice";
import NavItem from "./components/NavItem";
import styles from "./styles.module.scss";

function useScreenWidth() {
    const [width, setWidth] = useState(undefined);
    const dispatch = useDispatch();

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
            if (window.innerWidth >= 1024) {
                dispatch(closeSidebar());
            }
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return width;
}

export default function SideBar() {
    const isOpenSidebar = useSelector((state) => state.isOpenSidebar.value);
    const width = useScreenWidth();

    return (
        (width >= 1024 || (width < 1024 && isOpenSidebar)) && (
            <nav className={styles.nav} id="sidebar">
                <ul className={styles.ul}>
                    <NavItem
                        icon={<GiBookmarklet size={30} />}
                        title="Introduction"
                        href={PATHS.INTRODUCTION}
                    />
                    <NavItem
                        icon={<GiVillage size={30} />}
                        title="Gameplay"
                        href={PATHS.GAMEPLAY}
                    />
                    <NavItem icon={<GiCardPick size={30} />} title="Cards" href={PATHS.CARDS} />
                </ul>
            </nav>
        )
    );
}
