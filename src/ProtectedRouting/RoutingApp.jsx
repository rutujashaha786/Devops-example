import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Chat from './Chat'

function RoutingApp() {

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    return (
        <>
            <div>RoutingApp</div>
            <Routes>
                <Route path='/' element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Home setIsLoggedIn={setIsLoggedIn}></Home>
                </ProtectedRoute>}></Route>

                <Route path='/chat/:id' element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Chat></Chat>
                </ProtectedRoute>}></Route>

                <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn}></Login>}></Route>
            </Routes>
        </>
    )
}

function ProtectedRoute(props) {
    const isLoggedIn = props.isLoggedIn;
    const children = props.children;
    if (isLoggedIn) {
        return children;
    }
    else {
        return <Navigate to='/login'></Navigate>   //for redirection from '/' to '/login', then login component renders auto
    }
}

export default RoutingApp