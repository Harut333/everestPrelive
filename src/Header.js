import React from 'react';
import Link from 'next/link';
import Navbar from "../src/Navbar"
import styles from "../styles/_header.module.scss"

const Header = () => {
    return (
        <header className={styles.header}>
            <div className="logo">
                <Link href="/">
                    {/*<a>Logo</a>*/}
                </Link>
            </div>
            <Navbar/>
        </header>
    );
};

export default Header;
