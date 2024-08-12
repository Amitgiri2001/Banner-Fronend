// src/pages/DashboardPage.js
import React from 'react';
import Dashboard from '../Components/Dashboard/Dashboard';
import NavigationBar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const DashboardPage = () => {
    return (
        <div>
            <NavigationBar />
            <Dashboard />
            <Footer />
        </div>
    );
};

export default DashboardPage;
