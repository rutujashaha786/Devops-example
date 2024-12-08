import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

function User() {

  const [isLoading, setisLoading] = useState(true);
  const [data, setData] = useState(null);

  //function -> call after first render
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
      const data = await response.json();
      
      setData(data);
      setisLoading(false);
      
    }

    fetchData();  
  }, []);

  if(isLoading){
    return (
      <div>Loading.....</div>
    )
  }

  if(!isLoading){
    return (
      <>
        <div>{data.name}</div>
        <div>{data.email}</div>
      </>
      
    )
  }
  
}

export default User