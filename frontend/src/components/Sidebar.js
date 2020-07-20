import React, { forwardRef } from 'react';
import ListItem from './ListItem';
import ListPlaceholder from './ListPlaceholder';
import styles from '../stylesheets/Sidebar.module.css';

const Sidebar = forwardRef(({ setCurrentNote, currentNote, notes, createNote, selectedId, toggle }, ref) => {
    return (
        <div className={styles.sidebar} >
            <div className={styles.toolbar}>
                <button className={styles.button} title="Your Preferences" onClick={toggle}>
                    <i className="fas fa-cog"></i>
                </button>
                <button onClick={createNote} className={styles.button} title="Add Note">
                    <i className="fas fa-plus"></i>
                </button>
            </div>
            <div className={styles.list} ref={ref}>
                {!notes.length ? <ListPlaceholder /> : notes.sort((a, b) => a.updatedAt > b.updatedAt ? -1 : 1).map((note, i) => {
                    return <ListItem
                        note={note}
                        setCurrentNote={setCurrentNote}
                        key={i}
                        id={note.id}
                        selected={note.id === selectedId ? true : false}
                    />
                })}
            </div>
        </div>
    )
})

export default Sidebar;