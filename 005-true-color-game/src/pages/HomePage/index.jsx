import { Link } from "react-router-dom";
import PATHS from "../../constants/paths";

const HomePage = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center text-2xl font-bold text-center h-1/2">
                TRUE COLOR
            </div>

            <div className="flex flex-col items-center gap-4 h-1/2">
                <Link
                    to={PATHS.PLAY}
                    className="w-1/2 py-2 text-center text-white bg-red-600 rounded animation-ping"
                >
                    PLAY
                </Link>
                <div className="font-bold text-blue-600">
                    BEST: {parseInt(localStorage.getItem("best") ?? 0)}
                </div>
            </div>
        </>
    );
};

export default HomePage;
