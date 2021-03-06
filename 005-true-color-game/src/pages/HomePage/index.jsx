import { Link } from "react-router-dom";
import PATHS from "../../constants/paths";

const HomePage = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center text-2xl font-bold text-center h-1/2">
                TRUE COLOR
            </div>

            <div className="flex flex-col items-center justify-between w-full gap-4 pb-8 h-1/2">
                <div className="flex flex-col items-center w-full gap-4">
                    <Link
                        to={PATHS.PLAY}
                        className="w-1/2 py-2 font-bold text-center text-white bg-red-600 rounded animation-ping"
                    >
                        PLAY
                    </Link>
                    <div className="font-bold text-blue-600">
                        BEST : {parseInt(localStorage.getItem("best") ?? 0)}
                    </div>
                </div>

                <div className="w-1/2 p-5 font-bold text-center border border-black rounded-md">
                    <div className="mb-2">HINT</div>
                    <div className="mb-2 text-red-600 ">
                        RED <span className="text-black">=</span> ✅
                    </div>
                    <div className="text-blue-600 ">
                        RED <span className="text-black">=</span> ❌
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
