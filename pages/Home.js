import React from 'react';
import ContactForm from './contact/ContactForm';
import styles from '../styles/_home.module.scss';
import Header from "../src/Header";

import Link from "next/link";

const Home = () => {
    return (
        <section className={styles.main}>
            <Header />
            <div className={styles.container}>
                <h1 className={styles.title}>Welcome to Everest Academy</h1>
                <p className={styles.description}>
                    Learn the latest web technologies with our expert instructors.
                </p>
                <Link href="/contact/ContactForm" className={styles.heroButton}>
                    Get Started
                </Link>
            </div>
            {/*<footer className={styles.footer}>*/}
            {/*    <a*/}
            {/*        href="https://example.com"*/}
            {/*        target="_blank"*/}
            {/*        rel="noopener noreferrer"*/}
            {/*    >*/}
            {/*        Footer Link*/}
            {/*    </a>*/}
            {/*</footer>*/}
        </section>
    );
};

export default Home;
