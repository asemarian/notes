import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../stylesheets/Note.module.css';

const Note = ({ currentNote: { title, body, id }, updateNote, deleteNote, setCurrentNote }) => {
    const [noteTitle, setNoteTitle] = useState(title);
    const [noteBody, setNoteBody] = useState(body);

    useEffect(() => {
        setNoteTitle(title);
        setNoteBody(body);
    }, [title, body, id]);

    const handleTitleChange = (e) => {
        setNoteTitle(e.target.value);
        updateNote(id, e.target.value, noteBody, "title");
    }

    const handleBodyChange = (e) => {
        setNoteBody(e.target.value);
        updateNote(id, noteTitle, e.target.value, "body");
    }

    const handleDelete = () => {
        deleteNote(id);
        setCurrentNote({ title: "", body: "", id: "" });
    }

    return (
        <div className={styles.container}>
            <div className={styles.toolbar}>
                <button className={styles.button} title="Note Info">
                    <i className="fas fa-info-circle"></i>
                </button>
                <button onClick={handleDelete} className={styles.button} title="Delete Note">
                    <i className="fas fa-trash-alt"></i>
                </button>
            </div>
            <div className={styles.wrapper}>
                <input type="text" value={noteTitle} onChange={handleTitleChange} className={styles.title} />
            </div>
            <textarea className={styles.body} onChange={handleBodyChange} value={noteBody} ></textarea>
        </div>
    )
}

export default Note;

/* todo:
    * save the new note whenever it changes to localstorage if user is offline
    * add placeholder to show place of title and body
    * make api call to store the new note, whenever it changes, to the database

*/