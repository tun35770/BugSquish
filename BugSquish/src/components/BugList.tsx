import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import Bug from './Bug';
import { useAuthContext } from '../hooks/useAuthContext';

const BugList = () => {
  class BugType {
    _id: string;
    username: string;
    title: string;
    description: string;
    project: string;
    date: Date;
    completed: boolean;

    constructor(id:string, username:string, title:string, description:string, project:string, date:Date, completed = false){
        this._id = id;
        this.username = username;
        this.title = title;
        this.description = description;
        this.project = project;
        this.date = date;
        this.completed = completed;
    }
  }

  const { user } = useAuthContext();

  const [bugs, setBugs] = useState<BugType[]>([]);

  /*
    TODO: Implement localStorage for bugs.
  */
  useEffect(() => {
    
    if(!user){
      return;
    }

    const fetchBugs = async () => {
      const response = await fetch('http://localhost:5000/bugs', {
          method: 'GET',
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
              'Authorization': `Bearer ${user.token}`
          },
      });

      const json = await response.json();
      if(response.ok){
        setBugs(json);
      }
    }

    if(user) {
      fetchBugs();
    }

    else {
      console.log('Not logged in.');
    }
  }, [user])

  function deleteBug(id:string){

    if(!user){
      return;
    }

    fetch('http://localhost:5000/bugs/' + id, {
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
          const newBugs = [...bugs].filter((bug: BugType) => bug._id !== id)
          setBugs(newBugs);
        })
        .catch((err) => console.log(err))
  }
  
  function bugList(){
    return bugs.map((currentBug: BugType) => {
      return <Bug bug={currentBug} deleteBug={deleteBug} key={currentBug._id} id={currentBug._id} />
    });
  }
  
  return (
    <div>
      {bugList()}
    </div>
  )
}

export default BugList