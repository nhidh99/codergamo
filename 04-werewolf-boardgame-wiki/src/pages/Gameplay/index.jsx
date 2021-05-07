import {
	GiAcousticMegaphone,
	GiCardPickup,

	GiDiscussion,

	GiMoonBats,
	GiPodiumWinner,
	GiPointing,
	GiVillage,
	GiVote
} from "react-icons/gi";
import GameplayItem from "./GameplayItem";
import styles from "./styles.module.scss";

export default function Gameplay() {
    return (
        <>
            <section className={styles.section}>
                <h2 className={styles.h2}>[ How To Play ]</h2>
                <GameplayItem
                    icon={<GiAcousticMegaphone />}
                    title="Gather Players"
                    content={`Werewolf is a great party game. You need at least 7 people to play. 
					Gather up your village, and let's setup your character deck. An odd number of players works best, although it's not mandatory.`}
                />
                <GameplayItem
                    icon={<GiVillage />}
                    title="Build The Deck"
                    content={`Every player gets a character card. You always have 1 Moderator, 1 Seer, 1 Doctor, and 2 Werewolves.
					The rest of the players should all be Villagers. Have more than 15 players? Add a Werewolf for every 4 players`}
                />
                <GameplayItem
                    icon={<GiCardPickup />}
                    title="Shuffle & Deal"
                    content={`Once you have a complete character deck, shuffle and deal them out face down.
					Each player should look at their card, but they must keep it a secret. Learn more about characters, 
					including special ones on Cards page.`}
                />
            </section>

            <section className={styles.section}>
                <h2 className={styles.h2}>[ The Night ]</h2>
                <GameplayItem
                    icon={<GiMoonBats />}
                    title="Wake Up"
                    content={`The game alternates between Night and Day rounds, starting with the Night. 
					At the start of Night, the Moderator tells all players, "Close your eyes." 
					Everyone begins slapping their knees (or table) to cover up any noises of the Night. 
					Then, the moderator prompts the following characters to wake up one by one...`}
                />
            </section>

            <section className={styles.section}>
                <h2 className={styles.h2}>[ Day Time ]</h2>
                <GameplayItem
                    icon={<GiDiscussion />}
                    title="Discussion"
                    content={`Players discuss who they think are the Werewolves. Who's telling the truth or lying to survive? 
					Characters may choose to share or withhold information they've discovered, but but be careful, you may become a target.`}
                />
                <GameplayItem
                    icon={<GiPointing />}
                    title="Accusations"
                    content={`If someone is accused, and the accusation is supported by a second player, 
					the accused gets 30 seconds to defend themselves, and then it's put up to a vote to decide their fate.`}
                />
                <GameplayItem
                    icon={<GiVote />}
                    title="Voting"
                    content={`After a player has had a chance to defend themselves, a vote is held to decide whether or not to kill off the player.
					A majority vote is needed to do so. If not, the Village discussion continues.`}
                />
            </section>

            <section className={styles.section}>
                <h2 className={styles.h2}>[ Winning ]</h2>
                <GameplayItem
                    icon={<GiPodiumWinner />}
                    title="Winners"
                    content={`The Villagers win and saved the Village if they kill all of the Werewolves. 
					The Werewolves win if the number of Werewolves equal the number of Villagers left.`}
                />
            </section>
        </>
    );
}
