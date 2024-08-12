import React, { useState, useEffect } from 'react';
import styles from './Countdown.module.css';

const Countdown = ({ initialTime, onCountdownEnd }) => {
    const [timeLeft, setTimeLeft] = useState(parseInt(initialTime));
    const [hasEnded, setHasEnded] = useState(false); // New state to track if countdown has ended

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);

            return () => clearInterval(timer); // Cleanup the timer on unmount
        } else if (!hasEnded) { // Check if countdown has not ended
            onCountdownEnd(); // Trigger the callback when the countdown ends
            setHasEnded(true); // Mark countdown as ended
        }
    }, [timeLeft, hasEnded, onCountdownEnd]); // Include hasEnded in dependency array

    if (timeLeft <= 0) return null;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeLeft / (3600 * 24));
    const hours = Math.floor((timeLeft % (3600 * 24)) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    return (
        <p>
            <span className={styles.time}>Time left:</span>
            <span className={styles.box}>{days} D</span>
            <span className={styles.box}>{hours} H</span>
            <span className={styles.box}>{minutes} Min</span>
            <span className={styles.box}>{seconds} Sec</span>
        </p>
    );
};

export default Countdown;
