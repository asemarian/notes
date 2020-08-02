import React, { useContext } from 'react';
import styles from '../styles/Settings.module.css';
import { ThemeContext } from '../context/theme';


const Settings = ({ logOut, syncStatus, isMobile }) => {
    const { darkMode, setDarkMode } = useContext(ThemeContext);

    const handleClick = (e) => {
        if (e.target.textContent === "Dark") {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }
    }

    return (
        <div className={`${styles.container} ${isMobile ? styles.container_mobile : ''}`}>
            <div className={styles.section}>
                <p className={styles.title}>Username</p>
                <div className={styles.box}>
                    {localStorage.getItem("username") || ""}
                </div>
            </div>
            <div className={styles.section}>
                <p className={styles.title}>Status</p>
                <div className={styles.box}>
                    {syncStatus}
                </div>
            </div>
            <div className={styles.section}>
                <p className={styles.title}>Theme</p>
                <div>
                    <button onClick={handleClick} className={`${styles.toggle} ${styles.light} ${!darkMode ? styles.selected : ""}`}>Light</button>
                    <button onClick={handleClick} className={`${styles.toggle} ${styles.dark} ${darkMode ? styles.selected : ""} `}>Dark</button>
                </div>


            </div>
            <div className={styles.section}>
                <p className={styles.title}>Log Out</p>
                <button className={styles.button} onClick={logOut}>Log Out</button>
                <button className={styles.button} onClick={logOut}>Log Out Everywhere</button>
            </div>
        </div>
    )
}

export default Settings