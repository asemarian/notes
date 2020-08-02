import React from 'react';
import styles from '../styles/ListPlaceholder.module.css';

const ListPlaceholder = () => {
    return (
        <div className={styles.container}>
            <div className={styles.text}>
                Click on <i className={`fas fa-plus ${styles.button}`}></i> to create a new note
            </div>
        </div>
    )
}

export default ListPlaceholder;