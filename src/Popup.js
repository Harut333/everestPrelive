import React from 'react';
import Modal from 'react-modal';
import SignInComponent from './SignInComponent';
import SignUpComponent from './SignUpComponent';


import styles from '../styles/Popup.module.scss';

// Set the app element for react-modal (required for accessibility)
Modal.setAppElement('#__next');

const Popup = ({ isOpen, onClose, mode }) => {
    const renderContent = () => {
        if (mode === 'signIn') {
            return <SignInComponent />;
        } else if (mode === 'signUp') {
            return <SignUpComponent />;
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className={styles.popup}
            overlayClassName={styles.overlay}
            contentLabel="Popup"
        >
            <div className={styles.popupContent}>{renderContent()}</div>
        </Modal>
    );
};

export default Popup;
