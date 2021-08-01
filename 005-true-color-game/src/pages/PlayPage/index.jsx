import { Link } from "react-router-dom";
import PATHS from "../../constants/paths";
import "./style.css";
import usePlayPage from "./usePlayPage";

const PlayPage = () => {
    const { state, pressTrue, pressFalse, pressAgain } = usePlayPage();
    const { status, text, score, best, curQuiz } = state;

    return (
        <>
            {status === "RUNNING" && (
                <em
                    key={`em_${score}`}
                    className="w-full underlined-animated"
                ></em>
            )}

            <div className="fixed px-10 pt-8 select-none">
                <div className="font-bold">
                    SCORE : {score}
                    <br />
                    BEST : {best}
                </div>
            </div>

            <div
                className={`flex flex-col items-center justify-center text-2xl font-bold text-center h-1/2 select-none ${
                    curQuiz?.textColor ?? "text-black"
                }`}
            >
                {text}
            </div>

            {status === "OVER" ? (
                <div className="flex items-start justify-center px-10 pb-8 h-1/2">
                    <Link
                        to={PATHS.HOME}
                        className="w-full py-5 mr-2 text-2xl text-center text-white bg-blue-600 rounded select-none"
                    >
                        ⌂
                    </Link>
                    <div
                        className="w-full py-5 ml-2 text-2xl text-center text-white bg-green-600 rounded cursor-pointer select-none"
                        onClick={pressAgain}
                    >
                        ↺
                    </div>
                </div>
            ) : (
                <div className="flex items-end justify-center px-10 pb-8 select-none h-1/2">
                    <div
                        className="w-full py-5 mr-2 text-2xl text-center text-white bg-green-600 rounded cursor-pointer"
                        onClick={pressTrue}
                    >
                        ✔
                    </div>
                    <div
                        className="w-full py-5 ml-2 text-2xl text-center text-white bg-red-600 rounded cursor-pointer select-none"
                        onClick={pressFalse}
                    >
                        ✘
                    </div>
                </div>
            )}
        </>
    );
};

export default PlayPage;
