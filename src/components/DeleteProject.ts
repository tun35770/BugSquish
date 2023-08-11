import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext';

const DeleteProject = (id: string, user: any) => {
  
  if(!user){
    return;
  }

  fetch('https://bugsquish.org/projects/' + id, {
          method: 'delete',
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
              'Authorization': `Bearer ${user.token}`
          }
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((err) => console.log(err))
}

export default DeleteProject