import { useState } from "react";

const useDarkMode = () => {
	const [isDarkMode, setIsDarkMode] = useState(
		localStorage.getItem("theme") || true
	);

	const setDarkMode = (bool) => {
		if (bool) {
			document.documentElement.style.setProperty("--primary", "#1f1f1f");
			document.documentElement.style.setProperty(
				"--secondary",
				"#f5f5f5"
			);
			document.documentElement.style.setProperty("--text", "#ffffff");
			document.documentElement.style.setProperty(
				"--placeholder",
				"#ffffff0d"
			);
			document.documentElement.style.setProperty(
				"--border-light",
				"#ffffff0d"
			);
			document.documentElement.style.setProperty(
				"--border-dark",
				"#ffffff1a"
			);
			document.documentElement.style.setProperty("--hover", "#272727");
			setIsDarkMode(bool);
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.style.setProperty("--primary", "#f5f5f5");
			document.documentElement.style.setProperty(
				"--secondary",
				"#1f1f1f"
			);
			document.documentElement.style.setProperty("--text", "#2c2c2c");
			document.documentElement.style.setProperty(
				"--placeholder",
				"#1f1f1f33"
			);
			document.documentElement.style.setProperty(
				"--border-light",
				"#1f1f1f26"
			);
			document.documentElement.style.setProperty(
				"--border-dark",
				"#1f1f1f4d"
			);
			document.documentElement.style.setProperty("--hover", "#ececec");
			setIsDarkMode(bool);
			localStorage.setItem("theme", "light");
		}
	};

	return { darkMode: isDarkMode, setDarkMode };
};

export default useDarkMode;
