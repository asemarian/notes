import React, { forwardRef } from 'react';
import ListItem from './ListItem';
import ListPlaceholder from './ListPlaceholder';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from '../styles/Sidebar.module.css';
import '../styles/slide.css';

const Sidebar = forwardRef(({ setCurrentNote, currentNote, notes, createNote, toggle, isMobile }, ref) => {
    return (
        <div className={`${styles.sidebar} ${isMobile ? styles.sidebar_mobile : ""}`} >
            <div className={styles.toolbar}>
                <button className={styles.button} title="Your Preferences" onClick={toggle}>
                    <i className="fas fa-cog"></i>
                </button>
                <button onClick={createNote} className={styles.button} title="Add Note">
                    <i className="fas fa-plus"></i>
                </button>
            </div>
            <div className={`${styles.list} ${isMobile ? styles.list_mobile : ""}`} ref={ref}>
                <TransitionGroup component={null}>
                    {notes.sort((a, b) => a.updatedAt > b.updatedAt ? -1 : 1).map((note, i) =>
                        <CSSTransition timeout={300} classNames="slide" key={note.id}>
                            <ListItem
                                note={note}
                                setCurrentNote={setCurrentNote}
                                key={i}
                                id={note.id}
                                selected={note.id === currentNote.id}
                            />
                        </CSSTransition>
                    )}
                </TransitionGroup>
                {notes.length === 0 && <ListPlaceholder />}
            </div>
        </div>
    )
})

export default Sidebar;