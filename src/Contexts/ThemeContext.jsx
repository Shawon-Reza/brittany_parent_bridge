import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext("light");

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        const storedTheme = localStorage.getItem("theme");
        return storedTheme === "dark" ? true : false;
    });

    const [isCollapsed, setIsCollapsed] = useState(() => {
        const storedCollapse = localStorage.getItem("sidebarCollapsed");
        return storedCollapse === "true" ? true : false;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    useEffect(() => {
        localStorage.setItem("sidebarCollapsed", isCollapsed.toString());
    }, [isCollapsed]);

    const toggleSidebar = () => setIsCollapsed(prev => !prev);

    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode, isCollapsed, toggleSidebar }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useDarkMode = () => useContext(ThemeContext);
export const useTheme = () => useContext(ThemeContext); 