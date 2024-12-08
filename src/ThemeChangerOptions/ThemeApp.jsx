import React from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Home from './Home'
import PageNotFound from './PageNotFound'
import './ThemeApp.css'
import { useDarkTheme } from './ThemeContext'

// export const ThemeContext = React.createContext();

function ThemeApp() {

    const {handleTheme} = useDarkTheme();
    // const [isDark, setTheme] = React.useState(false);

    // const handleTheme = () => {
    //     setTheme(!isDark);
    // }

  return (
    <>
            <button onClick={handleTheme}>Toggle Theme</button>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
            </Routes>
        
    </>
    
  )
}

export default ThemeApp