import { useEffect, useState } from 'react'

export const formatCountdown = (deadline: number) => {
    const time = deadline - new Date().getTime()
    if (time < 0) {
        return 'Finished'
    }

    const day = Math.floor(time / (1000 * 60 * 60 * 24))
        .toString()
        .padStart(2, '0')
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24)
        .toString()
        .padStart(2, '0')
    const minutes = Math.floor((time / (1000 * 60)) % 60)
        .toString()
        .padStart(2, '0')
    const seconds = Math.floor((time / 1000) % 60)
        .toString()
        .padStart(2, '0')

    return `${day} days ${hours}:${minutes}:${seconds}`
}

interface CountdownProps {
    deadline: number
}

const Countdown = ({ deadline }: CountdownProps) => {
    const [time, setTime] = useState(Date.now())

    useEffect(() => {
        const id = setInterval(() => setTime(Date.now()), 1000)
        return () => clearInterval(id)
    })

    return <>{formatCountdown(deadline)}</>
}

export default Countdown
