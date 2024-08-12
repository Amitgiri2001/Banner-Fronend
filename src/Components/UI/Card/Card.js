import React, { children } from 'react'
import styles from "./Card.module.css"
const Card = ({ children, isCenter }) => {
    return (
        <div className={styles.card}>
            {children}
        </div>
    )
}

export default Card