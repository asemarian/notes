import React, { useState, useContext } from 'react';
import styles from '../stylesheets/Settings.module.css';
import ThemeContext from '../context/ThemeContext';


const Settings = () => {
    const { theme, setDarkMode } = useContext(ThemeContext);
    // const [isDarkMode, setIsDarkMode] = useState(true);

    const handleClick = (e) => {
        if (e.target.textContent === "Light") {
            setDarkMode("light");
            // setIsDarkMode(false);
        } else {
            // setIsDarkMode(true);
            setDarkMode("dark");

        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <p className={styles.title}>Username</p>
                <div className={styles.box}>
                    asemarianasemarian
                </div>
            </div>
            <div className={styles.section}>
                <p className={styles.title}>Status</p>
                <div className={styles.box}>Last sync at June 21st, 2020, 06:30 PM</div>
            </div>
            <div className={styles.section}>
                <p className={styles.title}>Theme</p>
                <div>
                    <button onClick={handleClick} className={`${styles.toggle} ${styles.light} ${theme === "light" ? styles.selected : ""}`}>Light</button>
                    <button onClick={handleClick} className={`${styles.toggle} ${styles.dark} ${theme === "dark" ? styles.selected : ""} `}>Dark</button>
                </div>


            </div>
            <div className={styles.section}>
                <p className={styles.title}>Log Out</p>
                <button className={styles.button}>Log Out</button>
                <button className={styles.button}>Log Out Everywhere</button>
            </div>
        </div>
    )
}

export default Settings