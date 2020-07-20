import React from 'react';
import styles from '../stylesheets/NoteInfo.module.css';

const NoteInfo = () => {
    return (
        <div className={styles.container}>
            <div className={`${styles.box} ${styles.date}`}>
                Created June 21st, 2020, 5:30 PM
            </div>
            <div className={`${styles.box} ${styles.date}`}>
                Modified July 19th, 2020, 7:00 PM
            </div>
            <div className={`${styles.box} ${styles.stat1}`}>
                0 Words
            </div>
            <div className={`${styles.box} ${styles.stat2}`}>
                0 Characters
            </div>
        </div>
    )
}

export default NoteInfo;