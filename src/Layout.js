import React from 'react';
import Header from './Header';
import Home from "../pages/Home";

const Layout = ({children}) => {
    return (
        <div>
            <Home />
            <main>{children}</main>
        </div>
    );
};

export default Layout;
