import styles from "./styles.module.scss";

export default function GameplayItem({ icon, title, content }) {
    return (
        <div className={styles.div}>
            <div className={styles.icon}>{icon}</div>
            <p className={styles.p}>
                <b>{title}</b> - {content}
            </p>
        </div>
    );
}
