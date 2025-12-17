import { useDarkMode } from "../../Contexts/ThemeContext";


function DarkModeButton() {
    const { darkMode, setDarkMode } = useDarkMode();

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded bg-gray-200 cursor-pointer dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
        >
            {darkMode ? "Switch to Light" : "Switch to Dark"}
        </button>
    );
}

export default DarkModeButton;

