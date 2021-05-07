import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./styles.module.scss";

export default function SearchShortcut() {
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        window.onscroll = function () {
            setIsShow(
                document.body.scrollTop > 90 ||
                    document.documentElement.scrollTop > 90
            );
        };
    }, []);

    return (
        <div
            className={styles.div}
            style={{ display: isShow ? "block" : "none" }}
            onClick={() => {
                window.scrollTo(0, 0);
                document.getElementById("search").focus();
            }}
        >
            <FaSearch className={styles.icon} color="#c6c6c6" />
        </div>
    );
}
