import React, { useContext, useState, useRef, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import styles from '../stylesheets/Main.module.css';
import Note from '../components/Note';
import Sidebar from '../components/Sidebar';
import Placeholder from '../components/Placeholder';
import Modal from '../components/Modal';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Settings from '../components/Settings';
import useModal from '../hooks/useModal';
import NoteInfo from '../components/NoteInfo';

const Main = () => {
    const auth = useContext(AuthContext);
    axios.defaults.headers.common['Authorization'] = "Bearer " + auth.token;
    const { id } = useParams();
    const [notes, setNotes] = useState([]);
    const [currentNote, setNote] = useState(id ? notes.find(note => note.id === id) : { title: "", body: "", id: "" });
    const [selectedId, setSelectedId] = useState(id);
    const [isLoading, setIsLoading] = useState(false);
    const ref = useRef();
    const history = useHistory();
    const { isShowing, toggle } = useModal();
    const { isShowing: infoIsShowing, toggle: toggleInfo } = useModal();
    // useEffect(() => {
    //     const fetchData = async () => {
    //         setIsLoading(true);
    //         const notes = await axios.get("/notes");
    //         setNotes(notes.data);
    //         console.log(notes.data);
    //         setIsLoading(false);
    //     }
    //     fetchData();
    // }, []);

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
    const updateNote = (id, title, body, action) => {
        ref.current.scrollTo({ top: 0, behavior: "smooth" });
        let updatedNotes;
        switch (action) {
            case "body":
                updatedNotes = notes.map(note => note.id === id ? { ...note, body, updatedAt: new Date() } : note);
                const note = updatedNotes.find(note => note.id === id);
                console.log(note);


                axios.patch(`/notes/${note._id}`, {
                    id: note.id,
                    title: note.title,
                    body: note.body,
                    createdAt: note.createdAt,
                    updatedAt: note.updatedAt
                }).then(res => {
                    console.log(res.data);

                });


                setNotes(updatedNotes);
                return;
            case "title":
                updatedNotes = notes.map(note => note.id === id ? { ...note, title, updatedAt: new Date() } : note);
                const nota = updatedNotes.find(note => note.id === id);

                axios.patch(`/notes/${nota._id}`, {
                    id: nota.id,
                    title: nota.title,
                    body: nota.body,
                    createdAt: nota.createdAt,
                    updatedAt: nota.updatedAt
                }).then(res => {
                    console.log(res.data);

                })
                setNotes(updatedNotes);
                return;
            default:
                return;
        }
    }

    const createNote = () => {
        let note = { title: "", body: "", id: uuid(), createdAt: new Date(), updatedAt: new Date() };
        axios.post("/notes", note).then(res => { note._id = res.data._id; })
        setNotes([note, ...notes]);
        setCurrentNote(note);
    }

    const deleteNote = async (id) => {
        let newNotes = notes.filter(note => note.id !== id);
        let note = notes.find(note => note.id === id);
        axios.delete(`/notes/${note._id}`).then(res => console.log(res.data));
        setNotes(newNotes);
    }

    if (!auth.token) return <Redirect to="/login" />
    if (isLoading) return <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}><Spinner /></div>

    return (
        <div className={styles.container}>
            <Modal isShowing={isShowing} toggle={toggle} title="Your Preferences" icon="cog">
                <Settings />
            </Modal>
            <Modal isShowing={infoIsShowing} toggle={toggleInfo} title="Note Info" icon="info-circle">
                <NoteInfo />
            </Modal>
            <Sidebar setCurrentNote={setCurrentNote} currentNote={currentNote} notes={notes} createNote={createNote} ref={ref} selectedId={selectedId} toggle={toggle} />
            {currentNote.title || currentNote.body || currentNote.id ?
                <Note setCurrentNote={setCurrentNote} currentNote={currentNote} updateNote={updateNote} deleteNote={deleteNote} selectedId={selectedId} toggleInfo={toggleInfo} />
                :
                <Placeholder />
            }
        </div>
    )
}

export default Main;