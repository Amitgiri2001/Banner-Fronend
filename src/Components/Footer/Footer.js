// src/components/Footer/Footer.js
import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-light text-center text-lg-start">
            <Container className="p-4">
                <div className="text-center p-3">
                    © 2024. Made with ❤️
                    <a className="text-dark" href="https://www.linkedin.com/in/amit-giri2001/"> Amit Giri</a>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
