import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { auth, db, storage } from '../../firebase';

//Create AuthContext
export const AuthContext = React.createContext();

//Custom hook
export const useAuth = () => {
    return useContext(AuthContext);
}

//AuthWrapper component
function AuthWrapper(props) {

    const [userData, setUserData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");

    console.log("loading...", loading);
    console.log("userData1...", userData);

    useEffect(() => {
        //currentUser : act as cookie
        //Listener to check whether any user was logged in before or not
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            // setLoading(true);
            console.log("CurrentUser...", currentUser);

            if(currentUser){
                //Anything changed for currentUser details, fetch latest data, listener calls automatically & update UI
                const docRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(docRef);
                if(docSnap.exists()){
                    console.log("ocSnap.data()", docSnap.data())
                    const {email, name, profile_pic, status} = docSnap.data();
                    const id = docSnap.id;
                    
                    //set login state of app
                    setUserData({
                        id : id,
                        email : email,
                        name : name,
                        profile_pic :profile_pic,
                        status // This will be undefined if the field is missing
                      })

                    await updateLastSeen(currentUser);
                }
            }
            setLoading(false);
        })

        //Stop listener when component unmounts
        return () => {
            unsubscribe();
        }
    }, []);

    //Update last login time
    const updateLastSeen = async (currentUser) => {
        const date = new Date();
        const timestamp = date.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
          day: "2-digit",
            month: "short",
        })

        await updateDoc(doc(db, "users", currentUser.uid), {
            lastSeen : timestamp
        })
    }

    //Update Name
    const updateName = async (newName) => {
        await updateDoc(doc(db, "users", userData.id), {
            name : newName
        })
    }

    //Update status
    const updateStatus = async (newStatus) => {
        await updateDoc(doc(db, "users", userData.id), {
            status : newStatus
        })
    }

    //Upload profile image
    const uploadProfileImage = (img) => {
        const storageRef = ref(storage, `profile/${userData.id}`);
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on("state_changed", 
        () => {
            setIsUploading(true);
            setError(null);
            console.log("Upload started");
        },
        () => {
            setError("Unable to upload!");
            setIsUploading(false);
            alert("Unable to upload!");
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

                await updateDoc(doc(db, "users", userData.id), {
                    profile_pic : downloadURL
                })

                setUserData({
                    ...userData,
                    profile_pic : downloadURL
                })

                setIsUploading(false);
                setError(null);

            })
        }
        
        )
    }
    
    console.log("userData2...", userData);

  return <AuthContext.Provider value={{userData, setUserData, loading, updateName, updateStatus, uploadProfileImage, isUploading, setIsUploading}}>
    {props.children}
  </AuthContext.Provider>
}

export default AuthWrapper