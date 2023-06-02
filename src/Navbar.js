import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/_navbar.module.scss';
import Popup from './Popup';

const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isSignInOpen, setSignInOpen] = useState(false);
    const [isSignUpOpen, setSignUpOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const openSignInPopup = () => {
        setSignInOpen(true);
        setMobileMenuOpen(false); // Close the mobile menu when sign-in popup opens
    };

    const openSignUpPopup = () => {
        setSignUpOpen(true);
        setMobileMenuOpen(false); // Close the mobile menu when sign-up popup opens
    };

    const closePopup = () => {
        setSignInOpen(false);
        setSignUpOpen(false);
    };

    const handleLinkClick = () => {
        setMobileMenuOpen(false); // Close the mobile menu when a link is clicked
    };

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.burgerMenu} onClick={toggleMobileMenu}>
                    &#9776;
                </div>
                <ul className={`${styles.navbarMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
                    <li className={styles.navbarMenuItem}>
                        <Link href="/" passHref>
                            <span className={styles.navbarMenuLink} onClick={handleLinkClick}>
                                Home
                            </span>
                        </Link>
                    </li>
                    <li className={styles.navbarMenuItem}>
                        <Link href="/AboutPage" passHref>
                            <span className={styles.navbarMenuLink} onClick={handleLinkClick}>
                                About
                            </span>
                        </Link>
                    </li>
                    <li className={styles.navbarMenuItem}>
                        <Link href="/Pricing" passHref>
                            <span className={styles.navbarMenuLink} onClick={handleLinkClick}>
                                Pricing
                            </span>
                        </Link>
                    </li>
                    <li className={styles.navbarMenuItem}>
                        <Link href="/contact/ContactForm" passHref>
                            <span className={styles.navbarMenuLink} onClick={handleLinkClick}>
                                Contact Form
                            </span>
                        </Link>
                    </li>
                    <li className={styles.navbarMenuItem}>
                        <Link href="/QuizComponent" passHref>
                            <span className={styles.navbarMenuLink} onClick={handleLinkClick}>
                                Quiz
                            </span>
                        </Link>
                    </li>
                    <li className={styles.navbarMenuItem}>
                        <span className={styles.navbarMenuLink} onClick={openSignInPopup}>
                            Sign In
                        </span>
                    </li>
                    <li className={styles.navbarMenuItem}>
                        <span className={styles.navbarMenuLink} onClick={openSignUpPopup}>
                            Sign Up
                        </span>
                    </li>
                </ul>
            </nav>
            <Popup isOpen={isSignInOpen} onClose={closePopup} mode="signIn" />
            <Popup isOpen={isSignUpOpen} onClose={closePopup} mode="signUp" />
        </>
    );
};

export default Navbar;
