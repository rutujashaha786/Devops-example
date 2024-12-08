import Login from "./Components/Login"
import Home from "./Components/Home"
import Chat from "./Components/ChatWindow"
import PageNotFound from "./Components/PageNotFound"
import {Routes, Route} from 'react-router-dom'
import ProtectedRoute from "./Components/ProtectedRoute"
import React from "react"

function App() {

    return (
        <>
            <Routes>
                <Route path='/' element={
                <ProtectedRoute>
                    <Home></Home>
                </ProtectedRoute>}></Route>

                <Route path='/:id' element={
                <ProtectedRoute>
                    <Home></Home>
                </ProtectedRoute>}></Route>

                <Route path='/login' element={<Login></Login>}></Route>

                <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
            </Routes>
        </>
    )
}

export default App
