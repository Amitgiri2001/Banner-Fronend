// src/components/Dashboard/BannerList.js
import React from 'react';
import styles from './BannerList.module.css';
import Card from '../UI/Card/Card';

const BannerList = ({ banners, onEdit, onDelete }) => {
    return (
        <ul>
            {banners.map((banner) => (
                <Card>
                    <div key={banner.id} className={styles.bannerItem}>
                        <p><strong>Title:</strong> {banner.title}</p>
                        <p><strong>Description:</strong> {banner.description}</p>
                        <p><strong>Expired Date:</strong> {new Date(banner.endDateAndTime).toLocaleString()}</p>
                        <p><strong>Link:</strong> <a href={banner.link} target="_blank" rel="noopener noreferrer">{banner.link}</a></p>
                        <p><strong>Visible:</strong> {banner.isVisible ? 'Yes' : 'No'}</p>
                        <div className={styles.btn}>
                            <button className={styles.editBtn} onClick={() => onEdit(banner)}>Edit</button>
                            <button className={styles.deleteBtn} onClick={() => onDelete(banner.id)}>Delete</button>
                        </div>


                    </div>
                </Card>

            ))}
        </ul>
    );
};

export default BannerList;
