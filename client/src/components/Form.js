import React, { useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import useAuth from '../hooks/useAuth';
import styles from '../styles/Form.module.css';

const Form = ({ action }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { setToken } = useAuth();

    const handleChange = (e) => {
        if (e.target.type === "text") {
            setUsername(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!username) return setMessage("Please enter your username");
        if (!password) return setMessage("Please enter your password");

        setIsLoading(true);

        try {
            const { data: { token, username: user } } = await axios.post(`/users/${action}`, {
                username,
                password
            });
            setToken(token);
            localStorage.setItem("token", token);
            localStorage.setItem("username", user);
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
            setMessage(e.response.status === 500 ? e.response.statusText : e.response.data.error);
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.message}>
                {isLoading ? <Spinner /> : message ? <p>{message}</p> : null}
            </div>
            <input type="text" placeholder="Username" value={username} onChange={handleChange} className={styles.input} autoFocus />
            <input type="password" placeholder="Password" value={password} className={styles.input} onChange={handleChange} />
            <button type="submit" className={styles.button}>
                {`${action === "login" ? "Log In" : "Sign Up"}`}
            </button>
        </form>
    )
}

export default Form;