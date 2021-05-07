import { useDispatch } from "react-redux";
import { openLightbox } from "../../../../redux/slices/LightboxSlice";
import styles from "./styles.module.scss";
import { Img } from "react-image";

export default function CardItem({ key, imgSrc }) {
    const dispatch = useDispatch();
    return (
        <div className={styles.card} key={key} onClick={() => dispatch(openLightbox(imgSrc))}>
            <Img
                src={imgSrc}
                alt={key}
                className={styles.img}
                loading="lazy"
            />
        </div>
    );
}
