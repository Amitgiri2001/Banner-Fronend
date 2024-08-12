// src/components/Dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../UI/Modal/Modal';
import styles from './Dashboard.module.css';
import BannerList from './BannerList';
import AddBannerForm from './AddBannerForm'; // Import AddBannerForm
import Loader from '../UI/Loader/Loader';
import AnimatedButton from '../UI/Button/AnimatedButton';

const Dashboard = () => {
    const [banners, setBanners] = useState([]);
    const [selectedBanner, setSelectedBanner] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const [addBannerModalOpen, setAddBannerModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [isSaveChangesClicked, setSaveChangesClicked] = useState(false);
    useEffect(() => {
        axios.get('http://13.232.173.108:3001/api/banners')
            .then(response => {
                setBanners(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the banners!", error);
            });
    }, []);

    const handleEditClick = (banner) => {
        setSelectedBanner(banner);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedBanner(null);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSelectedBanner(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        setSaveChangesClicked(true);
        e.preventDefault();
        axios.put(`http://13.232.173.108:3001/api/banners/${selectedBanner.id}`, selectedBanner)
            .then(response => {
                alert('Banner updated successfully');
                handleModalClose();
                setBanners(prev => prev.map(b => b.id === selectedBanner.id ? response.data : b));
                setSaveChangesClicked(false);

            })
            .catch(error => {
                console.error("There was an error updating the banner!", error);
            });
    };

    const formatDateTimeLocal = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const pad = (n) => (n < 10 ? '0' + n : n);

        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    };

    const onDeleteClick = (id) => {
        setConfirmationModalOpen(true);
        setSelectedId(id);
    };

    const onConfirmClick = () => {
        setLoading(true);
        axios.delete(`http://13.232.173.108:3001/api/banners/${selectedId}`).then((response) => {
            console.log(response.data);
            alert(response.data.message);
            setBanners(prevBanners => prevBanners.filter(banner => banner.id !== selectedId));
            setLoading(false);
        }).catch((error) => {
            console.log(error.message);
        });
        setConfirmationModalOpen(false);
    };

    const handleBannerAdded = (newBanner) => {
        setBanners(prevBanners => [...prevBanners, newBanner]);
    };

    return (
        <div className={styles.dashboard}>
            <h1 className={styles.title}>Dashboard</h1>
            <div className={styles.addBannerButton} >
                <AnimatedButton onClick={() => setAddBannerModalOpen(true)} title="Add Banner" color="blue" />
            </div>

            {!isLoading && <BannerList banners={banners} onEdit={handleEditClick} onDelete={onDeleteClick} />}
            {isLoading && <Loader />}
            <Modal isOpen={confirmationModalOpen} onClose={() => setConfirmationModalOpen(false)}>
                <h4>The Data will be deleted forever..</h4>
                <button className={styles.confirm} onClick={onConfirmClick}>Confirm</button>
                <button className={styles.cancel} onClick={() => setConfirmationModalOpen(false)}>Cancel</button>
            </Modal>
            <Modal isOpen={modalOpen} onClose={handleModalClose}>
                {selectedBanner && (
                    <form className={styles.editForm}>
                        <h2>Edit Banner</h2>
                        {!isSaveChangesClicked ? <div>
                            <label>
                                Title:
                                <input
                                    type="text"
                                    name="title"
                                    value={selectedBanner.title}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Description:
                                <input
                                    type="text"
                                    name="description"
                                    value={selectedBanner.description}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Expire Date and Time:
                                <input
                                    type="datetime-local"
                                    name="endDateAndTime"
                                    value={formatDateTimeLocal(selectedBanner.endDateAndTime)}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Link:
                                <input
                                    type="url"
                                    name="link"
                                    value={selectedBanner.link}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Show Banner:
                                <input
                                    type="checkbox"
                                    name="isVisible"
                                    checked={selectedBanner.isVisible}
                                    onChange={handleChange}
                                />
                            </label>
                            <AnimatedButton title="Save Changes" onClick={handleSubmit} color="orange" />
                        </div> : <Loader />}
                    </form>
                )}
            </Modal>
            <AddBannerForm isOpen={addBannerModalOpen} onClose={() => setAddBannerModalOpen(false)} onBannerAdded={handleBannerAdded} />
        </div>
    );
};

export default Dashboard;
