import React from 'react';
import moment from 'moment';
import wordCounter from '../utils/wordCounter';
import charCounter from '../utils/charCounter';
import styles from '../styles/NoteInfo.module.css';

const NoteInfo = ({ notes, id, isMobile }) => {
    const { createdAt, updatedAt, title, body } = notes.find(note => note.id === id);
    const words = wordCounter(title) + wordCounter(body);
    const chars = charCounter(title) + charCounter(body);

    return (
        <div className={`${styles.container} ${isMobile ? styles.container_mobile : ''}`}>
            <div className={`${isMobile ? styles.box_mobile : ''}`}>
                Created {moment(createdAt).calendar(null, {
                sameDay: '[today at] h:mm A',
                lastDay: '[yesterday at] h:mm A',
                lastWeek: '[last] dddd, MMMM Do, YYYY [at] h:mm A',
                sameElse: '[on] MMMM Do, YYYY [at] h:mm A'
            })}
            </div>
            <div className={`${isMobile ? styles.box_mobile : ''}`}>
                Modified {moment(updatedAt).calendar(null, {
                sameDay: function () { return `[${this.fromNow()}]` },
                lastDay: '[yesterday at] h:mm:ss A',
                lastWeek: '[last] dddd, MMMM Do, YYYY [at] hh:mm:ss A',
                sameElse: '[on] MMMM Do, YYYY [at] hh:mm A'
            })}
            </div>
            <div className={`${isMobile ? styles.box_mobile : ''}`}>
                    {`${words} ${words === 1 ? "Word" : "Words"}`}
                </div>
            <div className={`${isMobile ? styles.box_mobile : ''}`}>
                    {`${chars} ${chars === 1 ? "Character" : "Characters"}`}
                </div>
        </div>
    )
}

export default NoteInfo;