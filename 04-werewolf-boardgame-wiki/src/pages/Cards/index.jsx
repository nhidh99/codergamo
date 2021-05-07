import CardItem from "./components/CardItem";
import styles from "./styles.module.scss";
import CardSearch from "./components/CardSearch";
import { useSelector } from "react-redux";
import SearchShortcut from "./components/SearchShortcut";
import CardLightbox from "./components/CardLightbox";

export default function Cards() {
    const cards = useSelector((state) => state.cardResult.value);
    return (
        <>
            <CardLightbox />
            <CardSearch />
            <SearchShortcut />
            <div className={styles.cards}>
                {cards.map((card) => (
                    <CardItem key={card.key} imgSrc={card.url} thumbnail={card.thumbnail} />
                ))}
            </div>
        </>
    );
}
