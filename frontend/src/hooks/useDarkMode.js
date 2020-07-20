import { useState } from 'react';

const useDarkMode = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    const setDarkMode = (mode) => {
        if (mode === "dark") {
            document.documentElement.style.setProperty('--primary', '#1d2027');
            document.documentElement.style.setProperty('--secondary', '#DEDDE3');
            setTheme("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.style.setProperty('--primary', '#DEDDE3');
            document.documentElement.style.setProperty('--secondary', '#1d2027');
            setTheme("light");
            localStorage.setItem("theme", "light");
        }
    }

    return { theme, setDarkMode };

}

export default useDarkMode;