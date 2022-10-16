import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { FormEvent, useRef } from 'react';
import axios from 'axios';

const Home: NextPage = () => {
    const emailInputRef = useRef<any>(null);
    const feedbackInputRef = useRef<any>(null);

    const submitFormHandler = (event: FormEvent) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredFeedback = feedbackInputRef.current.value;
        const reqBody = {
            email: enteredEmail,
            text: enteredFeedback,
        };
        axios
            .post(
                '/api/feedback',
                {
                    email: enteredEmail,
                    text: enteredFeedback,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((response) => response)
            .then((data) => console.log(data));
    };

    return (
        <div className={styles.container}>
            <h1>The Home Page</h1>
            <form onSubmit={submitFormHandler}>
                <div>
                    <label htmlFor={'email'}>Your Email Address</label>
                    <input type={'email'} id={'email'} ref={emailInputRef} />
                </div>
                <div>
                    <label htmlFor={'feedback'}>Your Feedback</label>
                    <textarea id={'feedback'} rows={5} ref={feedbackInputRef}></textarea>
                </div>
                <button>Send Feedback</button>
            </form>
        </div>
    );
};

export default Home;

