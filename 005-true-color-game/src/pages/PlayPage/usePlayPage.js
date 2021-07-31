/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react"

const PENDING_TEXTS = ['READY!', 'SET!', 'GO!']
const COLOR_TEXTS = ["BLACK", "YELLOW", "RED", "GREEN", "BLUE", "PURPLE"]
const CLASS_TEXTS = ["text-black", "text-yellow-600", "text-red-600", "text-green-600", "text-blue-600", "text-purple-600"]
const POOL_SIZE = 80
const COUNTDOWN_MILISECONDS = 1000
const TIME_OUT_MILISECONDS = 2000

const usePlayPage = () => {
    const pendingTextIndex = useRef(0)
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

    const { status, score, best, quizIndex, curQuiz } = state;

    useEffect(() => {
        const prepareColorPool = () => {
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
            setState({
                ...state,
                text: "GAME OVER",
                curQuiz: null
            })

            if (score > best) {
                setState({ ...state, best: score })
                localStorage.setItem('best', score)
            }

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
        console.log(status)
        if (status === "RUNNING") {
            if (curQuiz.isTrueColor) {
                const newQuizIndex = quizIndex === POOL_SIZE - 1 ? 0 : quizIndex + 1
                const newQuiz = quizPool.current[newQuizIndex]
                setState({
                    ...state,
                    score: score + 1,
                    text: newQuiz.textDisplay,
                    quizIndex: newQuizIndex,
                    curQuiz: newQuiz
                })
            } else {
                clearTimeout(timeout.current)
                setState({ ...state, status: "OVER", })
            }
        }
    }

    const pressFalse = () => {
        if (status === "RUNNING") {
            if (!curQuiz.isTrueColor) {
                const newQuizIndex = quizIndex === POOL_SIZE - 1 ? 0 : quizIndex + 1
                const newQuiz = quizPool.current[newQuizIndex]
                setState({
                    ...state,
                    score: score + 1,
                    text: newQuiz.textDisplay,
                    quizIndex: newQuizIndex,
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