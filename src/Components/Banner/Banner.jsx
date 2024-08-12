import React, { useState, useEffect } from 'react';
import Countdown from './Countdown';
import styles from './Banner.module.css';
import axios from 'axios';
import Loader from '../UI/Loader/Loader';
import BannerCard from '../UI/Card/BannerCard';

const Banner = () => {
    const [banners, setBanners] = useState([]);
    const [isLoading, setLoading] = useState(true);

    // Fetch all banners when the component mounts
    useEffect(() => {
        const fetchBanners = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://13.232.173.108:3001/api/banners');

                const sortedBanners = response.data.sort((a, b) => {
                    const currentTime = new Date().getTime();

                    const timeRemainingA = new Date(a.endDateAndTime).getTime() - currentTime;
                    const timeRemainingB = new Date(b.endDateAndTime).getTime() - currentTime;

                    // If both banners are expired
                    if (timeRemainingA < 0 && timeRemainingB < 0) {
                        return timeRemainingA - timeRemainingB;
                    }

                    // If one banner is expired, move it to the last position
                    if (timeRemainingA < 0) return 1;
                    if (timeRemainingB < 0) return -1;

                    // Otherwise, sort by time remaining in ascending order
                    return timeRemainingA - timeRemainingB;
                });

                setBanners(sortedBanners);
            } catch (error) {
                console.error("There was an error fetching the banners!", error);

                // Fallback to dummy data
                const dummyData = [
                    {
                        id: 1,
                        title: 'Sample Banner 1',
                        description: 'This is a sample banner.',
                        endDateAndTime: new Date(Date.now() + 600000).toISOString(), // 10 minutes from now
                        startDate: new Date(Date.now()).toISOString(),
                        isExpired: false,
                        isVisible: true
                    },
                    {
                        id: 2,
                        title: 'Sample Banner 2',
                        description: 'This is another sample banner.',
                        endDateAndTime: new Date(Date.now() + 1200000).toISOString(), // 20 minutes from now
                        startDate: new Date(Date.now()).toISOString(),
                        isExpired: false,
                        isVisible: true
                    }
                ];

                setBanners(dummyData);
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);
    // Empty dependency array ensures this runs only once

    const handleCountdownEnd = async (bannerId) => {
        try {
            await axios.patch(`http://13.232.173.108:3001/api/banners/${bannerId}/expire`);
            console.log(`Banner with ID ${bannerId} expired and backend notified.`);

            // Update the state only if necessary to reduce re-renders
            const updatedBanners = banners.map(banner =>
                banner.id === bannerId ? { ...banner, isExpired: true } : banner
            );
            setBanners(updatedBanners);
        } catch (error) {
            console.error(`There was an error notifying the backend about banner ${bannerId} expiration!`, error);
        }
    };

    if (!banners || banners.length === 0) return null;

    return (
        <div className={styles.container}>

            <h1 className={styles.heading}>All Banners</h1>
            {!isLoading ? (
                <div className="banners-container">
                    {banners.map(banner => (
                        banner.isVisible && (
                            <BannerCard
                                id={banner.id}
                                key={banner.id}
                                title={banner.title}
                                description={banner.description}
                                endDateAndTime={banner.endDateAndTime}
                                link={banner.link}
                                isExpired={banner.isExpired}
                                onCountdownEnd={handleCountdownEnd}
                            />
                        )
                    ))}
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default Banner;
