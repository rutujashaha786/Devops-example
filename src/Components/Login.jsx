import React from 'react';
import { Fingerprint, LogIn } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import {auth, db} from '../../firebase'
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

function Login() {

  const navigate = useNavigate();

    async function createUser(userAuthData){
        const userObject = userAuthData.user;

        // const displayName = userObject.displayName;
        // const email = userObject.email;
        // const id = userObject.uid;
        // const profilePicture = userObject.photoURL;

        const {displayName, email, uid, photoURL} = userObject;

        const date = new Date();
        const timestamp = date.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true
        })

        //create user document inside firebase db
        await setDoc(doc(db, "users", uid), {
          email,
          name : displayName,
          profile_pic : photoURL,
          lastSeen : timestamp
        })

    }
    
    const handleLogin = async() => {
        const userData = await signInWithPopup(auth, new GoogleAuthProvider);
        console.log(userData);  //access token, uid
        await createUser(userData);

        // const userObject = userData.user;
        // const {displayName, email, uid, photoURL} = userObject;
        // setUserData({
        //   id : uid,
        //   email,
        //   name : displayName,
        //   profile_pic : photoURL
        // })

        // setIsLoggedIn(true);  //component renders after state change
        navigate('/');  //for redirection only, then Route component triggers correct comp rendering automatically as current URL changes
        
    }

  return (
    <>
      <div className='h-[220px] bg-primary'>
        <div className='flex gap-4 items-center pl-[200px] pt-[40px]'>
          <img src="https://whatsapp-clone-826a9.web.app/whatsapp.svg" alt="" className='h-8'/>
          <div className='text-white font-medium'>WHATSAPP</div>
        </div>   
      </div>
      <div className='h-[calc(100vh-220px)] bg-background flex justify-center items-center relative'>
        <div className='h-[80%] w-[50%] bg-white shadow-2xl flex flex-col justify-center items-center gap-4 absolute top-[-93px]'>
          <Fingerprint className='h-20 w-20 text-primary' strokeWidth='1'></Fingerprint>
          <div>Sign In</div>
          <div>Sign in with your google account to get started.</div>
            <button onClick={handleLogin} className='bg-primary py-3 px-4 flex gap-2 text-white rounded-[5px]'>
              <div>Sign In With Google</div>
              <LogIn></LogIn>
            </button>
        </div>
      </div>
      
    </>
    

  )
}

export default Login