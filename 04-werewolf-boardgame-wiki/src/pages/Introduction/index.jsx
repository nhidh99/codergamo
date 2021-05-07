import styles from "./styles.module.scss";

export default function Introduction() {
    return (
        <>
            <section className={styles.section}>
                <h2 className={styles.h2}>Ultimate Werewolf</h2>
                <img
                    src="https://i.ibb.co/Bs2snFM/werewolf-intro.png"
                    alt="werewolf-intro-img"
                    height="300"
                    className={styles.img}
                />
                <p>
                    Ultimate Werewolf is a card game designed by Ted Alspach and
                    published by Bézier Games. It is based on the social
                    deduction game, Werewolf, which is Andrew Plotkin's
                    reinvention of Dimitry Davidoff's 1987 game, Mafia. The
                    Werewolf game appeared in many forms before Bézier Games
                    published Ultimate Werewolf in 2008.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.h2}>Mafia Game</h2>
                <img
                    src="https://i.ibb.co/z8qpVWd/beb4cd8cbf7cb24b7d1a50982330b2b9.png"
                    alt="mafia-img"
                    className={styles.img}
                />
                <p>
                    Mafia, also known as Werewolf, is a social deduction game,
                    created by Dimitry Davidoff in 1986. The game models a
                    conflict between two groups: an informed minority (the
                    mafiosi or the werewolves), and an uninformed majority (the
                    villagers).
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.h2}>The Battle</h2>
                <img
                    src="https://i.ibb.co/WtLZvwX/battle-png.png"
                    alt="battle-img"
                    className={styles.img}
                />
                <p>
                    At the start of the game, each player is secretly assigned a
                    role affiliated with one of these teams.
                </p>
                <p>
                    The game has two alternating phases: first, a night role,
                    during which those with night killing powers may covertly
                    kill other players, and second, a day role, in which
                    surviving players debate the identities of players and vote
                    to eliminate a suspect.
                </p>
                <p>
                    The game continues until a faction achieves its win
                    condition; for the village, this usually means eliminating
                    the evil minority, while for the minority this usually means
                    reaching numerical parity with the village and eliminating
                    any rival evil groups.
                </p>
            </section>
        </>
    );
}
