import React from 'react';
import wordCounter from '../utils/wordCounter';
import charCounter from '../utils/charCounter';
import styles from '../styles/NoteInfo.module.css';

const NoteInfo = ({ notes, id }) => {
    const { createdAt, updatedAt, title, body } = notes.find(note => note.id === id);
    const words = wordCounter(title) + wordCounter(body);
    const chars = charCounter(title) + charCounter(body);

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                Created {(new Date(createdAt)).toLocaleString()}
            </div>
            <div className={styles.box}>
                Modified {(new Date(updatedAt)).toLocaleString()}
            </div>
            <div className={styles.box}>
                {`${words} ${words === 1 ? "Word" : "Words"}`}
            </div>
            <div className={styles.box}>
                {`${chars} ${chars === 1 ? "Character" : "Characters"}`}
            </div>
        </div>
    )
}

export default NoteInfo;