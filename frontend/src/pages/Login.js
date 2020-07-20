import React, { useContext } from 'react';
import Form from '../components/Form';
import styles from '../stylesheets/Login.module.css';
import { Link, Redirect } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {
    const { token } = useContext(AuthContext);
    return (
        token ? <Redirect to="/notes" /> :
            <div className={styles.container}>
                <div className={styles.logo}>
                    <i className="fas fa-sticky-note" ></i>
                </div>
                <h1 className={styles.title}>Log In</h1>
                <Form action="login" />
                <hr className={styles.partition} />
                <p className={styles.paragraph}>
                    Don't have an account? <Link to="/signup">Sign up.</Link>
                </p>
            </div>
    )

}

export default Login;