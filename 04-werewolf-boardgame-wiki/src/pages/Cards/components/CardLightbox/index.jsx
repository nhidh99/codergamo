import { useDispatch, useSelector } from "react-redux";
import Lightbox from "react-image-lightbox";
import { useMemo } from "react";
import { CARDS } from "../../../../constants/cards";
import { closeLightbox, setPhotoIndex } from "../../../../redux/slices/LightboxSlice";
import 'react-image-lightbox/style.css';

export default function CardLightbox() {
    const { photoIndex, isOpen } = useSelector((state) => state.lightbox);
    const photos = useMemo(() => CARDS.map((c) => c.url), []);
    const dispatch = useDispatch();

    return (
        isOpen && (
            <Lightbox
                mainSrc={photos[photoIndex]}
                nextSrc={photos[(photoIndex + 1) % photos.length]}
                prevSrc={photos[(photoIndex + photos.length - 1) % photos.length]}
                onCloseRequest={() => dispatch(closeLightbox())}
                onMovePrevRequest={() =>
                    dispatch(setPhotoIndex((photoIndex + photos.length - 1) % photos.length))
                }
                onMoveNextRequest={() =>
                    dispatch(setPhotoIndex((photoIndex + photos.length + 1) % photos.length))
                }
            />
        )
    );
}
