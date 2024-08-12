// src/pages/HomePage.js
import React from 'react';
import Banner from '../Components/Banner/Banner';
import NavigationBar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const HomePage = () => {
    return (
        <div>
            <NavigationBar />
            <Banner />
            <Footer />
            {/* Other homepage content */}
        </div>
    );
};

export default HomePage;
