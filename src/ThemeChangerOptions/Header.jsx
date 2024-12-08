import React from 'react'
import { useContext } from 'react'
import { useDarkTheme } from './ThemeContext'

function Header() {
  return (
    <div style={{border: '1px solid', padding: '1rem', margin: "1rem"}}>
        <div>Header</div>
        <Options></Options>
        <Options></Options>
        <Options></Options>
    </div>
  )
}

function Options() {
    const {isDark} = useDarkTheme();
    return <div className={`${isDark ? "dark" : "light"}`}>Option</div>
}

export default Header