import React from 'react';
import Countdown from '../../Banner/Countdown';
import styles from './BannerCard.module.css';
import Card from './Card';

const BannerCard = ({ id, title, description, endDateAndTime, link, isExpired, onCountdownEnd }) => {
    const formatDateTimeLocal = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const pad = (n) => (n < 10 ? '0' + n : n);

        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    };
    return (
        <Card>
            <div className={styles.bannerCard}>
                {isExpired && (
                    <div className={styles.expiredOverlay}>
                        <h2>Expired</h2>
                        <div className={styles.clock}>🕒</div>
                        <h4>
                            Expired in: <span className={styles.expireTime}>{(endDateAndTime).substring(0, 10)}</span>
                        </h4>
                    </div>
                )}
                <div className={isExpired ? styles.contentBlurred : ''}>
                    <p className={styles.title}>{title}</p>
                    {endDateAndTime && (
                        <div className={styles.countdown}>
                            <Countdown initialTime={(new Date(endDateAndTime) - new Date()) / 1000} onCountdownEnd={() => onCountdownEnd(id)} />
                        </div>
                    )}
                    <div className={styles.content}>
                        <h1 className={styles.description}>{description}</h1>
                        {link && (
                            <a href={link} target="_blank" rel="noopener noreferrer" className={styles.button}>
                                Click here
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default BannerCard;
