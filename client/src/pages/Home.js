import React, { useState, useRef, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { v4 as uuid } from "uuid";
import axios from "axios";
import moment from "moment";
import Note from "../components/Note";
import Sidebar from "../components/Sidebar";
import NotePlaceholder from "../components/NotePlaceholder";
import Modal from "../components/Modal";
import Spinner from "../components/Spinner";
import Settings from "../components/Settings";
import NoteInfo from "../components/NoteInfo";
import useModal from "../hooks/useModal";
import useAuth from "../hooks/useAuth";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useWindowSize from "../hooks/useWindowSize";
import styles from "../styles/Home.module.css";
import "../styles/_transitions.css";

const Home = () => {
	const { token, setToken } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [notes, setNotes] = useState([]);
	const [currentNote, setCurrentNote] = useState({
		title: "",
		body: "",
		id: "",
	});
	const [syncStatus, setSyncStatus] = useState("");
	const [isSettingsShowing, toggleSettings] = useModal();
	const [isInfoShowing, toggleInfo] = useModal();
	const ref = useRef();
	const history = useHistory();
	const { width } = useWindowSize();

	useDocumentTitle("Your Notes");

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const { data } = await axios.get("/notes");
				setNotes(data);
				setSyncStatus(`Last synced: ${moment().calendar()}`);
			} catch (e) {
				setSyncStatus(`Error fetching your notes from the server.`);
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);

	const createNote = () => {
		const note = {
			title: "",
			body: "",
			id: uuid(),
			createdAt: new Date().getTime(),
			updatedAt: new Date().getTime(),
		};

		setSyncStatus("Syncing...");

		axios
			.post("/notes", note)
			.then((res) => {
				note._id = res.data._id;
				setSyncStatus(`Last synced: ${moment().calendar()}`);
			})
			.catch((e) => {
				setSyncStatus(`Error syncing your changes.`);
				console.error(e.response.data);
			});

		setNotes([note, ...notes]);
		setCurrentNote(note);
	};

	const updateNote = (id, title, body) => {
		if (width >= 775) {
			ref.current.scrollTo({ top: 0, behavior: "smooth" });
		}

		const note = notes.find((note) => note.id === id);
		const newNote = {
			...note,
			title: title === undefined ? note.title : title,
			body: body === undefined ? note.body : body,
			updatedAt: new Date().getTime(),
		};

		setSyncStatus("Syncing...");

		axios
			.patch(`/notes/${newNote._id}`, {
				id: newNote.id,
				title: newNote.title,
				body: newNote.body,
				updatedAt: newNote.updatedAt,
			})
			.then(() => {
				setSyncStatus(`Last synced: ${moment().calendar()}`);
			})
			.catch((e) => {
				setSyncStatus(`Error syncing your changes.`);
				console.error(e.response.data);
			});

		setNotes(notes.map((note) => (note.id === id ? newNote : note)));
	};

	const deleteNote = async (id) => {
		const note = notes.find((note) => note.id === id);
		setNotes(notes.filter((note) => note.id !== id));

		setSyncStatus("Syncing...");

		axios
			.delete(`/notes/${note._id}`)
			.then(() => {
				setSyncStatus(`Last synced: ${moment().calendar()}`);
			})
			.catch((e) => {
				setSyncStatus(`Error syncing your changes.`);
				console.error(e.response.data);
			});
	};

	const logOut = async (e) => {
		setIsLoading(true);

		if (e.target.textContent === "Log Out") {
			await axios.post("/users/logout");
		} else {
			await axios.post("/users/logout-everywhere");
		}

		setToken("");
		localStorage.setItem("token", "");
		localStorage.setItem("username", "");
		history.push("/login");
	};

	const deleteAccount = async () => {
		setIsLoading(true);
		try {
			await axios.delete("/users/");
			setToken("");
			localStorage.clear();
			history.push("/login");
		} catch (e) {
			alert("Error");
			console.error(e);
		}
	};

	if (!token) return <Redirect to="/login" />;
	if (isLoading)
		return (
			<div className={styles.spinner}>
				<Spinner />
			</div>
		);

	return (
		<div className={styles.container}>
			<CSSTransition
				in={isSettingsShowing}
				timeout={300}
				classNames="fade"
				unmountOnExit
			>
				<Modal
					isShowing={isSettingsShowing}
					toggle={toggleSettings}
					title="Your Settings"
					icon="cog"
					isMobile={width < 775}
				>
					<Settings
						logOut={logOut}
						deleteAccount={deleteAccount}
						syncStatus={syncStatus}
						isMobile={width < 775}
					/>
				</Modal>
			</CSSTransition>

			<CSSTransition
				in={isInfoShowing}
				timeout={300}
				classNames="fade"
				unmountOnExit
			>
				<Modal
					isShowing={isInfoShowing}
					toggle={toggleInfo}
					title="Note Info"
					icon="info-circle"
					isMobile={width < 775}
				>
					<NoteInfo
						notes={notes}
						id={currentNote.id}
						isMobile={width < 775}
					/>
				</Modal>
			</CSSTransition>

			{width < 775 ? (
				currentNote.title || currentNote.body || currentNote.id ? (
					<Note
						setCurrentNote={setCurrentNote}
						currentNote={currentNote}
						updateNote={updateNote}
						deleteNote={deleteNote}
						toggleInfo={toggleInfo}
						isMobile={width < 775}
					/>
				) : (
					<Sidebar
						setCurrentNote={setCurrentNote}
						currentNote={currentNote}
						notes={notes}
						createNote={createNote}
						ref={ref}
						toggle={toggleSettings}
						isMobile={width < 775}
					/>
				)
			) : (
				<>
					<Sidebar
						setCurrentNote={setCurrentNote}
						currentNote={currentNote}
						notes={notes}
						createNote={createNote}
						ref={ref}
						toggle={toggleSettings}
					/>
					{currentNote.title || currentNote.body || currentNote.id ? (
						<Note
							setCurrentNote={setCurrentNote}
							currentNote={currentNote}
							updateNote={updateNote}
							deleteNote={deleteNote}
							toggleInfo={toggleInfo}
						/>
					) : (
						<NotePlaceholder />
					)}
				</>
			)}
		</div>
	);
};

export default Home;
