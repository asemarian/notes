import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/Note.module.css";

const Note = ({
	currentNote: { title, body, id },
	updateNote,
	deleteNote,
	setCurrentNote,
	toggleInfo,
	isMobile,
}) => {
	const [noteTitle, setNoteTitle] = useState(title);
	const [noteBody, setNoteBody] = useState(body);
	const ref = useRef();

	useEffect(() => {
		setNoteTitle(title);
		setNoteBody(body);
		ref.current.focus();
	}, [title, body, id]);

	const handleTitleChange = (e) => {
		setNoteTitle(e.target.value);
		updateNote(id, e.target.value, undefined);
	};

	const handleBodyChange = (e) => {
		setNoteBody(e.target.value);
		updateNote(id, undefined, e.target.value);
	};

	const handleDelete = () => {
		deleteNote(id);
		setCurrentNote({ title: "", body: "", id: "" });
	};

	return (
		<div className={styles.container}>
			<div className={styles.toolbar}>
				{isMobile ? (
					<button
						className={styles.button}
						title="Go Back"
						onClick={() =>
							setCurrentNote({ title: "", body: "", id: "" })
						}>
						<i className="fas fa-chevron-left"></i>
					</button>
				) : null}
				<button
					className={styles.button}
					title="Note Info"
					onClick={toggleInfo}>
					<i className="fas fa-info-circle"></i>
				</button>
				<button
					onClick={handleDelete}
					className={styles.button}
					title="Delete Note">
					<i className="fas fa-trash-alt"></i>
				</button>
			</div>
			<div className={styles.wrapper}>
				<input
					type="text"
					value={noteTitle}
					onChange={handleTitleChange}
					className={`${styles.title} ${
						isMobile ? styles.title_mobile : ""
					}`}
					ref={ref}
					placeholder="Untitled"
				/>
			</div>
			<textarea
				className={`${styles.body} ${
					isMobile ? styles.body_mobile : ""
				}`}
				onChange={handleBodyChange}
				value={noteBody}
				placeholder="Write something here..."></textarea>
		</div>
	);
};

export default Note;
