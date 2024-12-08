import React from 'react'

const ThemeContext = React.createContext();

export function useDarkTheme() {
    return React.useContext(ThemeContext);
}

export function ThemeWrapper({children}) {

    const [isDark, setTheme] = React.useState(false);

    const handleTheme = () => {
        setTheme(!isDark);
    }

    return <ThemeContext.Provider value={{isDark, handleTheme}}>
        {children}
    </ThemeContext.Provider>
}

