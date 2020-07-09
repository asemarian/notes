import React, { useContext, useState, useRef, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import styles from '../stylesheets/Main.module.css';
import Note from '../components/Note';
import Sidebar from '../components/Sidebar';
import Placeholder from '../components/Placeholder';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import Statusbar from '../components/Statusbar';


const Main = () => {

    let noteList = []


    const auth = useContext(AuthContext);
    axios.defaults.headers.common['Authorization'] = "Bearer " + auth.token;


    const { id } = useParams();
    const [notes, setNotes] = useState(noteList);
    const [currentNote, setNote] = useState(id ? notes.find(note => note.id === id) : { title: "", body: "", id: "" });
    const [selectedId, setSelectedId] = useState(id);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const myNotes = await axios.get("/notes");
            setIsLoading(false)
            console.log(myNotes.data);
        }

    });
    const ref = useRef();
    const history = useHistory();

    const setCurrentNote = (note) => {
        if (!note.id && !note.title && !note.body) {
            setNote(note);
            history.push("/notes");
        } else {
            setNote(note);
            history.push(`/notes/${note.id}`);
            setSelectedId(note.id);
        }
    }
    const updateNote = async (id, title, body, action) => {
        ref.current.scrollTo({ top: 0, behavior: "smooth" });
        let updatedNotes;
        switch (action) {
            case "body":
                updatedNotes = notes.map(note => note.id === id ? { ...note, body, updatedAt: new Date() } : note);
                const note = updatedNotes.find(note => note.id === id);
                console.log(note);
                setIsLoading(true);
                try {
                    await axios.post("/notes", {
                        id: note.id,
                        title: note.title,
                        body: note.body,
                        createdAt: note.createdAt,
                        updatedAt: note.updatedAt
                    });
                } catch (e) {
                    console.log(e.response.data)
                }

                setIsLoading(false);
                setNotes(updatedNotes);
                return;
            case "title":
                updatedNotes = notes.map(note => note.id === id ? { ...note, title, updatedAt: new Date() } : note);
                const nota = updatedNotes.find(note => note.id === id);
                setIsLoading(true);
                await axios.post("/notes", {
                    id: nota.id,
                    title: nota.title,
                    body: nota.body,
                    createdAt: nota.createdAt,
                    updatedAt: nota.updatedAt
                });
                setIsLoading(false);
                setNotes(updatedNotes);
                return;
            default:
                return;
        }
    }

    const createNote = async () => {
        let note = { title: "", body: "", id: uuid(), createdAt: new Date(), updatedAt: new Date() };

        setNotes([note, ...notes]);
        setCurrentNote(note);
    }

    const deleteNote = (id) => {
        let newNotes = notes.filter(note => note.id !== id);
        setNotes(newNotes);
    }

    if (!auth.token) return <Redirect to="/login" />
    return (
        <div className={styles.container}>
            <Sidebar setCurrentNote={setCurrentNote} currentNote={currentNote} notes={notes} createNote={createNote} ref={ref} selectedId={selectedId} />
            {currentNote.title || currentNote.body || currentNote.id ?
                <Note setCurrentNote={setCurrentNote} currentNote={currentNote} updateNote={updateNote} deleteNote={deleteNote} selectedId={selectedId} />
                :
                <Placeholder />
            }
            <Statusbar>
                {isLoading ? "Syncing..." : "All Changes Synced"}
            </Statusbar>
        </div>
    )
}

export default Main;