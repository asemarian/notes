import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Form from '../components/Form';
import useAuth from '../hooks/useAuth';
import useDocumentTitle from '../hooks/useDocumentTitle';
import styles from '../styles/Signup.module.css';

const Signup = () => {
    const { token } = useAuth();
    useDocumentTitle("Sign up for a Notes account");

    return (
        token ? <Redirect to="/" /> :
            <div className={styles.container}>
                <div className={styles.logo}>
                    <i className="fas fa-sticky-note" ></i>
                </div>
                <h1 className={styles.title}>Sign Up</h1>
                <Form action="signup" />
                <div className={styles.partition}></div>
                <p className={styles.paragraph}>
                    Already have an account? <Link to="/login">Log in.</Link>
                </p>
            </div>
    )
}

export default Signup;