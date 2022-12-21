import { useState, useRef } from "react";

const useTimer = () => {
    const Ref = useRef(null);
    const [timer, setTimer] = useState("00:00");

    const getTimeRemaining = e => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        return {
            total,
            minutes,
            seconds,
        };
    };

    const startTimer = e => {
        let { total, minutes, seconds } = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (minutes > 2 ? minutes : "0" + minutes) +
                    ":" +
                    (seconds > 2 ? seconds : "0" + seconds)
            );
        }
    };

    const clearTimer = e => {
        setTimer("02:00");

        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000);
        Ref.current = id;
    };

    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 120);
        return deadline;
    };

    const onClickReset = () => {
        clearTimer(getDeadTime());
    };
    return { timer, onClickReset };
};
export default useTimer;
