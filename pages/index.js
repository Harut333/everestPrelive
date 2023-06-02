import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Home";
import SignInComponent from "../src/SignInComponent";
import ProfilePage from "./ProfilePage";

const Layout = ({ children }) => {
    return (
        <Router>
            <div>
                <Home />
                <main>{children}</main>
            </div>
        </Router>
    );
};

const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<SignInComponent />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </Layout>
    );
};

export default App;
