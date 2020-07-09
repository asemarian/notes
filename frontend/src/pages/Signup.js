import React, { useContext } from 'react';
import Form from '../components/Form';
import styles from '../stylesheets/Signup.module.css';
import { Link, Redirect } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Signup = () => {
    const { token } = useContext(AuthContext);
    return (
        token ? <Redirect to="/notes" /> :
            <div className={styles.container}>
                <div className={styles.logo}>
                    <i className="fas fa-sticky-note" ></i>
                </div>
                <h1 className={styles.title}>Sign Up</h1>
                <Form action="signup" />
                <hr className={styles.partition} />
                <p className={styles.paragraph}>
                    Already have an account? <Link to="/login">Log in.</Link>
                </p>
            </div>
    )
}

export default Signup;