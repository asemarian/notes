import React, { useRef } from 'react';
import styles from '../stylesheets/ListItem.module.css';

const ListItem = ({ note: { title, body }, setCurrentNote, id, selected }) => {
    const ref = useRef();

    const handleClick = (e) => {
        setCurrentNote({
            title,
            body,
            id
        });
        ref.current.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <div
            className={selected ? `${styles.selected} ${styles.container}` : `${styles.container}`}
            onClick={handleClick} ref={ref}
        >
            <h1 className={styles.title}>{title || "Untitled Note"}</h1>
            <p className={styles.body}>{body || "No Additional Text"}</p>
        </div>
    )
}

export default ListItem;