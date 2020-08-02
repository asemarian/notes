import React, { useRef } from 'react';
import styles from '../styles/ListItem.module.css';

const ListItem = ({ note: { title, body }, setCurrentNote, id, selected }) => {
    const ref = useRef();

    const handleClick = () => {
        setCurrentNote({ title, body, id });
        ref.current.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <div
            className={selected ? `${styles.selected} ${styles.container}` : `${styles.container}`}
            onClick={handleClick}
            ref={ref}
        >
            <p className={styles.title}>{title || "Untitled Note"}</p>
            <p className={styles.body}>{body || "No Additional Text"}</p>
        </div>
    )
}

export default ListItem;