import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { FormEvent, useRef, useState } from 'react';
import axios from 'axios';

const Home: NextPage = () => {
    const emailInputRef = useRef<any>(null);
    const feedbackInputRef = useRef<any>(null);
    const [feedbackItems, setFeedbackItems] = useState<any[]>([]);

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

    function loadFeedbackHandler() {
        axios.get('/api/feedback').then((response) => setFeedbackItems(response.data.feedback));
    }

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
            <hr />
            <button onClick={loadFeedbackHandler}>Load Feedback</button>
            <ul>
                {feedbackItems.map((item) => (
                    <li key={item.id}>{item.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
