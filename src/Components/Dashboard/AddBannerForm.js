// src/components/Dashboard/AddBannerForm.js
import React, { useState } from 'react';
import axios from 'axios';
import styles from './AddBannerForm.module.css';
import Modal from '../UI/Modal/Modal';
import Loader from '../UI/Loader/Loader';
import AnimatedButton from '../UI/Button/AnimatedButton';

const AddBannerForm = ({ isOpen, onClose, onBannerAdded }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        endDateAndTime: '',
        link: '',
        isVisible: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        setIsLoading(!isLoading);
        e.preventDefault();
        axios.post('/api/banners', formData)
            .then(response => {
                alert('Banner added successfully');
                onBannerAdded(response.data);
                setIsLoading(!isLoading);
                onClose();
            })
            .catch(error => {
                console.error("There was an error adding the banner!", error);
            });
    };

    const formatDateTimeLocal = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const pad = (n) => (n < 10 ? '0' + n : n);

        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {!isLoading ? <form onSubmit={handleSubmit} className={styles.addForm}>
                <h2>Add New Banner</h2>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Expire Date and Time:
                    <input
                        type="datetime-local"
                        name="endDateAndTime"
                        value={formatDateTimeLocal(formData.endDateAndTime)}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Link:
                    <input
                        type="url"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Show Banner:
                    <input
                        type="checkbox"
                        name="isVisible"
                        checked={formData.isVisible}
                        onChange={handleChange}
                    />
                </label>
                <div className={styles.btn}>
                    <AnimatedButton title="Add Banner" onClick={handleSubmit} color="orange" />
                </div>

            </form> : <Loader />}
        </Modal>
    );
};

export default AddBannerForm;
