/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react"

const PENDING_TEXTS = ['READY!', 'SET!', 'GO!']
const COLOR_TEXTS = ["BLACK", "YELLOW", "RED", "GREEN", "BLUE", "PURPLE"]
const CLASS_TEXTS = ["text-black", "text-yellow-400", "text-red-600", "text-green-600", "text-blue-600", "text-purple-600"]
const POOL_SIZE = 80
const COUNTDOWN_MILISECONDS = 1000
const TIME_OUT_MILISECONDS = 3100

const usePlayPage = () => {
    const pendingTextIndex = useRef(0)
    const quizIndex = useRef(0)
    const timeout = useRef(null)
    const quizPool = useRef([])

    const [state, setState] = useState({
        status: "PENDING",
        text: PENDING_TEXTS[pendingTextIndex.current],
        score: 0,
        best: parseInt(localStorage.getItem('best') ?? 0),
        quizIndex: 0,
        curQuiz: null,
    })

    const { status, score, best, curQuiz } = state;

    useEffect(() => {
        const prepareColorPool = () => {
            quizPool.current = []
            for (let i = 0; i < POOL_SIZE; i++) {
                let colorQuiz;
                const colorIndex = Math.floor(Math.random() * COLOR_TEXTS.length)

                if (Math.floor(Math.random() * 2) > 0) {
                    colorQuiz = {
                        textDisplay: COLOR_TEXTS[colorIndex],
                        textColor: CLASS_TEXTS[colorIndex],
                        isTrueColor: true,
                    }
                } else {
                    const classTexts = CLASS_TEXTS.filter(x => x !== CLASS_TEXTS[colorIndex])
                    const classIndex = Math.floor(Math.random() * classTexts.length)
                    colorQuiz = {
                        textDisplay: COLOR_TEXTS[colorIndex],
                        textColor: classTexts[classIndex],
                        isTrueColor: false,
                    }
                }

                quizPool.current.push(colorQuiz)
            }
        }

        const countdown = () => {
            const interval = setInterval(() => {
                pendingTextIndex.current++;
                setState({ ...state, text: PENDING_TEXTS[pendingTextIndex.current] })

                if (pendingTextIndex.current === PENDING_TEXTS.length) {
                    clearInterval(interval)
                    const newQuiz = quizPool.current[0]
                    setState({
                        ...state,
                        status: "RUNNING",
                        text: newQuiz.textDisplay,
                        curQuiz: newQuiz,
                    })
                }
            }, COUNTDOWN_MILISECONDS)
        }

        const resetTimeout = () => {
            timeout.current = setTimeout(() => {
                setState({ ...state, status: "OVER" })
            }, TIME_OUT_MILISECONDS)
        }

        const handleGameOver = () => {
            const newBest = score > best ? score : best;
            localStorage.setItem('best', newBest)
            setState({
                ...state,
                text: "GAME OVER",
                best: newBest,
                curQuiz: null
            })

            if (timeout.current) {
                clearTimeout(timeout.current)
            }

        }

        switch (status) {
            case "PENDING":
                prepareColorPool();
                countdown();
                break;
            case "RUNNING":
                resetTimeout();
                break;
            case "OVER":
                handleGameOver();
                break;
            default:
                return;
        }
    }, [status])

    useEffect(() => {
        if (status === "RUNNING") {
            clearTimeout(timeout.current)
            timeout.current = setTimeout(() => {
                setState({ ...state, status: "OVER" })
            }, TIME_OUT_MILISECONDS)
        }
    }, [score])

    const pressAgain = () => {
        pendingTextIndex.current = 0;
        setState({ ...state, score: 0, status: "PENDING", text: PENDING_TEXTS[0] })
    }

    const pressTrue = () => {
        if (status === "RUNNING") {
            if (curQuiz.isTrueColor) {
                quizIndex.current = quizIndex.current === POOL_SIZE - 1 ? 0 : quizIndex.current + 1
                const newQuiz = quizPool.current[quizIndex.current]
                setState({
                    ...state,
                    score: score + 1,
                    text: newQuiz.textDisplay,
                    curQuiz: newQuiz
                })
            } else {
                clearTimeout(timeout.current)
                setState({ ...state, status: "OVER" })
            }
        }
    }

    const pressFalse = () => {
        if (status === "RUNNING") {
            if (!curQuiz.isTrueColor) {
                quizIndex.current = quizIndex.current === POOL_SIZE - 1 ? 0 : quizIndex.current + 1
                const newQuiz = quizPool.current[quizIndex.current]
                setState({
                    ...state,
                    score: score + 1,
                    text: newQuiz.textDisplay,
                    curQuiz: newQuiz
                })
            } else {
                clearTimeout(timeout.current)
                setState({ ...state, status: "OVER" })
            }
        }
    }

    return { state, pressTrue, pressFalse, pressAgain }
}

export default usePlayPage