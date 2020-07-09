import React from 'react';
import styles from '../stylesheets/Statusbar.module.css';

const Statusbar = ({ children }) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}

export default Statusbar;