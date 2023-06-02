import React from 'react';
import Layout from '../src/Layout';
import styles from "../styles/_about.module.scss"
import Header from "../src/Header";

const AboutPage = () => {
    return (
        <div>
            <Header/>
            <section className={styles.aboutSection}>
                <h2 className={styles.aboutTitle}>About Everest Academy</h2>
                <p className={styles.aboutDescription}>
                    Everest Academy is a leading educational institution that specializes in
                    providing high-quality web development courses. Our expert instructors
                    are dedicated to helping students learn and excel in the field of web
                    development.
                </p>
            </section>
        </div>
    );
};

export default AboutPage;

