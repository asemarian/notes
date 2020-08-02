import React from 'react';
import wordCounter from '../utils/wordCounter';
import charCounter from '../utils/charCounter';
import styles from '../styles/NoteInfo.module.css';

const NoteInfo = ({ notes, id, isMobile }) => {
    const { createdAt, updatedAt, title, body } = notes.find(note => note.id === id);
    const words = wordCounter(title) + wordCounter(body);
    const chars = charCounter(title) + charCounter(body);

    return (
        <div className={`${styles.container} ${isMobile ? styles.container_mobile : ''}`}>
            <div className={`${styles.box} ${isMobile ? styles.box_mobile : ''}`}>
                Created {(new Date(createdAt)).toLocaleString()}
            </div>
            <div className={`${styles.box} ${isMobile ? styles.box_mobile : ''}`}>
                Modified {(new Date(updatedAt)).toLocaleString()}
            </div>
            <div className={`${styles.stats} ${isMobile ? styles.stats_mobile : ''}`}>
                <div className={`${styles.stat_box} ${isMobile ? styles.stat_box_mobile : ''}`}>
                    {`${words} ${words === 1 ? "Word" : "Words"}`}
                </div>
                <div className={`${styles.stat_box} ${isMobile ? styles.stat_box_mobile : ''}`}>
                    {`${chars} ${chars === 1 ? "Character" : "Characters"}`}
                </div>
            </div>
        </div>
    )
}

export default NoteInfo;