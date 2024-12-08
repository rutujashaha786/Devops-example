import React from 'react'
import { useContext } from 'react'
import { useDarkTheme } from './ThemeContext'

function Footer() {
  return (
    <div style={{border: '1px solid', padding: '1rem', margin: "1rem"}}>
        <div>Footer</div>
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

export default Footer