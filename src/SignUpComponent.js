import React, { useState, useEffect } from 'react';
import {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth';
import { firebaseConfig } from './firebase';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import styles from '../styles/AuthForm.module.scss';

const auth = getAuth(firebaseConfig);
const db = getFirestore();

const SignUpComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    const [verificationSent, setVerificationSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignUp = async () => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            sendEmailVerification(auth.currentUser)
                .then(() => {
                    setVerificationSent(true);
                })
                .catch((error) => {
                    console.log(error);
                });

            const userId = user.uid;

            await setDoc(doc(db, 'users', userId), {
                username: username,
                isAdmin: false,
                email: email,
                attendance: [{ course: '', date: '', status: '' }], // Add an object with empty values
            });

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setErrorMessage('User already exists. Please sign in instead.');
            } else {
                setErrorMessage('An error occurred. Please try again later.');
            }
        }
    };



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && user.emailVerified) {
                setSuccessMessage(true);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleSignIn = async () => {
        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password);
            if (user) {
                if (user.emailVerified) {
                    // Redirect to desired page after successful sign-in
                } else {
                    // Display an error message or prevent login
                    console.log('Email not verified. Unable to login.');
                }
            }
        } catch (error) {
            // Handle error
        }
    };

    return (
        <div>
            {!successMessage && (
                <div className={styles.authForm}>
                    {!verificationSent ? (
                        <>
                            <h2 className={styles.authFormTitle}>Sign Up</h2>
                            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                            <div className={styles.authFormField}>
                                <label className={styles.authFormFieldLabel}>Email</label>
                                <input
                                    type="email"
                                    className={styles.authFormFieldInput}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className={styles.authFormField}>
                                <label className={styles.authFormFieldLabel}>Username</label>
                                <input
                                    type="text"
                                    className={styles.authFormFieldInput}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className={styles.authFormField}>
                                <label className={styles.authFormFieldLabel}>Password</label>
                                <input
                                    type="password"
                                    className={styles.authFormFieldInput}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button className={styles.authFormButton} onClick={handleSignUp}>
                                Sign Up
                            </button>
                        </>
                    ) : (
                        <p className={styles.successMessage}>
                            Verification email has been sent. Please check your email to complete the sign-up process.
                        </p>
                    )}
                </div>
            )}
            {successMessage && (
                <div className={styles.authForm}>
                    <p className={styles.successMessage}>
                        Sign up successful! You can now{' '}
                        <button className={styles.authFormButton} onClick={handleSignIn}>
                            Sign In
                        </button>
                    </p>
                </div>
            )}
        </div>
    );
};

export default SignUpComponent;
