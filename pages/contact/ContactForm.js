import React from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import styles from '../../styles/ContactForm.module.scss';
import Header from "../../src/Header";

const ContactForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/api/send-email', data);
            console.log(response.data);
            // Handle success message or redirect here
        } catch (error) {
            console.error(error);
            // Handle error message here
        }
    };

    return (
        <>
            <Header/>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        {...register('name', {required: 'This field is required'})}
                        className={styles.input}
                    />
                    {errors.name && <span className={styles['error-message']}>{errors.name.message}</span>}

                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        {...register('email', {required: 'This field is required', pattern: /^\S+@\S+$/i})}
                        className={styles.input}
                    />
                    {errors.email && <span className={styles['error-message']}>{errors.email.message}</span>}

                    <textarea
                        name="message"
                        placeholder="Your Message"
                        {...register('message', {required: 'This field is required'})}
                        className={styles.textarea}
                    />
                    {errors.message && <span className={styles['error-message']}>{errors.message.message}</span>}

                    <button type="submit" className={styles.button}>Submit</button>
                </form>
            </div>
        </>
    );
};

export default ContactForm;
