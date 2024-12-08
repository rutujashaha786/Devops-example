import React from 'react'
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import {auth} from '../../firebase'

function Login(props) {
    const setIsLoggedIn = props.setIsLoggedIn;
    const navigate = useNavigate();
    const handleLogin = async() => {
        const result = await signInWithPopup(auth, new GoogleAuthProvider);
        console.log(result);
        setIsLoggedIn(true);  //component renders after state change
        navigate('/');  //for redirection only, then Route component triggers correct comp rendering automatically as current URL changes
        
    }
  return (
    <>
    <div>Login</div>
    <button onClick={handleLogin}>Login</button>
    </>
    
  )
}

export default Login