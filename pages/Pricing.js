import React from 'react';
import styles from '../styles/Pricing.module.scss';
import Header from "../src/Header";

const Pricing = () => {
    return (
        <>
            <Header />
            <div className={styles.pricing}>
                <div className={styles.planWrapper}>
                    <div className={styles.planCard}>
                        <div className={styles.planFront}>
                            <h2 className={styles.planTitle}>HTML and CSS</h2>
                            <p className={styles.planPrice}>26000AMD/month</p>
                            <div className={styles.planFeatures}>
                                <ul>
                                    <li>Duration: 2 months</li>
                                    <li>Group lessons</li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.planBack}>
                            <div className={styles.planDescription}>
                                <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.planWrapper}>
                    <div className={styles.planCard}>
                        <div className={styles.planFront}>
                            <h2 className={styles.planTitle}>JavaScript</h2>
                            <p className={styles.planPrice}>35000AMD/month</p>
                            <div className={styles.planFeatures}>
                                <ul>
                                    <li>Duration: 3 months</li>
                                    <li>Group lessons</li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.planBack}>
                            <div className={styles.planDescription}>
                                <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.planWrapper}>
                    <div className={styles.planCard}>
                        <div className={styles.planFront}>
                            <h2 className={styles.planTitle}>React.JS</h2>
                            <p className={styles.planPrice}>44000AMD/month</p>
                            <div className={styles.planFeatures}>
                                <ul>
                                    <li>Duration: 2 months</li>
                                    <li>Group lessons</li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.planBack}>
                            <div className={styles.planDescription}>
                                <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Pricing;
