import React, { forwardRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ListItem from "./ListItem";
import ListPlaceholder from "./ListPlaceholder";
import styles from "../styles/Sidebar.module.css";
import "../styles/_transitions.css";

const Sidebar = forwardRef(
	(
		{ setCurrentNote, currentNote, notes, createNote, toggle, isMobile },
		ref
	) => {
		const handleMouseDown = (e) => {
			let prevX = e.clientX;
			const handleMouseMove = (e) => {
				const rect = ref.current.getBoundingClientRect();
				let newWidth = rect.width - (prevX - e.clientX);
				newWidth =
					newWidth > 830 ? 830 : newWidth < 230 ? 230 : newWidth;
				ref.current.style.width = newWidth + "px";
				prevX = e.clientX;
			};
			const handleMouseUp = () => {
				window.removeEventListener("mousemove", handleMouseMove);
				window.removeEventListener("mouseup", handleMouseUp);
			};

			window.addEventListener("mousemove", handleMouseMove);
			window.addEventListener("mouseup", handleMouseUp);
		};

		return (
			<div className={styles.container}>
				<div
					className={`${styles.sidebar} ${
						isMobile ? styles.sidebar_mobile : ""
					}`}>
					<div className={styles.toolbar}>
						<button
							className={styles.button}
							title="Your Preferences"
							onClick={toggle}>
							<i className="fas fa-cog"></i>
						</button>
						<button
							onClick={createNote}
							className={styles.button}
							title="Add Note">
							<i className="fas fa-plus"></i>
						</button>
					</div>
					<div
						className={`${styles.list} ${
							isMobile ? styles.list_mobile : ""
						}`}
						ref={ref}>
						<TransitionGroup component={null}>
							{notes
								.sort((a, b) =>
									a.updatedAt > b.updatedAt ? -1 : 1
								)
								.map((note, i) => (
									<CSSTransition
										timeout={300}
										classNames="slide"
										key={note.id}>
										<ListItem
											note={note}
											setCurrentNote={setCurrentNote}
											key={i}
											id={note.id}
											selected={
												note.id === currentNote.id
											}
										/>
									</CSSTransition>
								))}
						</TransitionGroup>
						{notes.length === 0 && <ListPlaceholder />}
					</div>
				</div>
				{!isMobile ? (
					<div
						className={styles.resizer}
						onMouseDown={handleMouseDown}></div>
				) : null}
			</div>
		);
	}
);

export default Sidebar;
