import { useEffect, useState } from "react";

const CountDown = (props) => {

    const [duration, setDuration] = useState(15);

    useEffect(() => {
        if (duration === 0) {
            props.timeUpAction()
            return;
        }
        const timer = setInterval(() => {
            setDuration(duration - 1)
        }, 1000)

        return (() => {
            clearInterval(timer)
        })
    }, [duration])

    var toHHMMSS = (secs) => {
        var sec_num = parseInt(secs, 10)
        var hours = Math.floor(sec_num / 3600)
        var minutes = Math.floor(sec_num / 60) % 60
        var seconds = sec_num % 60

        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":")
    }
    return (
        <div className="time-text">{toHHMMSS(duration)}</div>
    )
}

export default CountDown;