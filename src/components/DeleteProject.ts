import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext';

const DeleteProject = (id: string, user: any) => {
  
  if(!user){
    return;
  }

  const data = {
    user: user
  }

  fetch('https://bugsquish.org/projects/' + id, {
          method: 'delete',
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
              'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify(data)
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((err) => console.log(err))
}

export default DeleteProject