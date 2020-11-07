import React, { useContext } from "react";
import { ThemeContext } from "../context/theme";
import styles from "../styles/Settings.module.css";

const Settings = ({ logOut, deleteAccount, syncStatus, isMobile }) => {
	const { darkMode, setDarkMode } = useContext(ThemeContext);

	const handleTheme = (e) => {
		if (e.target.textContent === "Dark") {
			setDarkMode(true);
		} else {
			setDarkMode(false);
		}
	};

	const handleDeleteAccount = async (e) => {
		const confirmed = window.confirm(
			"This will irreversibly delete your account and all of your data. Are you sure you want to continue?"
		);

		if (confirmed) {
			deleteAccount();
		}
	};

	return (
		<div
			className={`${styles.container} ${
				isMobile ? styles.container_mobile : ""
			}`}
		>
			<div className={styles.section}>
				<p className={styles.title}>Username</p>
				<div className={styles.box}>
					{localStorage.getItem("username") || ""}
				</div>
			</div>
			<div className={styles.section}>
				<p className={styles.title}>Status</p>
				<div className={styles.box}>
					{syncStatus || "Not available"}
				</div>
			</div>
			<div className={styles.section}>
				<p className={styles.title}>Theme</p>
				<div>
					<button
						onClick={handleTheme}
						className={`${styles.switch} ${styles.light} ${
							!darkMode ? styles.selected : ""
						}`}
					>
						Light
					</button>
					<button
						onClick={handleTheme}
						className={`${styles.switch} ${styles.dark} ${
							darkMode ? styles.selected : ""
						} `}
					>
						Dark
					</button>
				</div>
			</div>
			<div className={styles.section}>
				<p className={styles.title}>Log Out</p>
				<button className={styles.button} onClick={logOut}>
					Log Out
				</button>
				<button className={styles.button} onClick={logOut}>
					Log Out Everywhere
				</button>
			</div>
			<div className={styles.section}>
				<p className={styles.title}>Delete Account</p>
				<button
					className={`${styles.button} ${styles.delete}`}
					onClick={handleDeleteAccount}
				>
					Permanently Delete My Account
				</button>
			</div>
		</div>
	);
};

export default Settings;
