import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Form from '../components/Form';
import styles from '../styles/Login.module.css';
import useAuth from '../hooks/useAuth';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Login = () => {
    const { token } = useAuth();
    useDocumentTitle("Log in to Notes");

    return (
        token ? <Redirect to="/notes" /> :
            <div className={styles.container}>
                <div className={styles.logo}>
                    <i className="fas fa-sticky-note" ></i>
                </div>
                <h1 className={styles.title}>Log In</h1>
                <Form action="login" />
                <div className={styles.partition}></div>
                <p className={styles.paragraph}>
                    Don't have an account? <Link to="/signup">Sign up.</Link>
                </p>
            </div>
    )
}

export default Login;