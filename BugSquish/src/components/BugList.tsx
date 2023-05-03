import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import Bug from './Bug';

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

  const [bugs, setBugs] = useState<BugType[]>([]);

  /*
    TODO: Implement localStorage for bugs.
  */
  useEffect(() => {
    fetch('http://localhost:5000/bugs', {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            }
        })
        .then((res) => res.json())
        .then((data) => {
          //console.log(data);
          setBugs(data);
        })
        .catch((err) => console.log(err))
  }, [])

  function deleteBug(id:string){
    fetch('http://localhost:5000/bugs/' + id, {
            method: 'delete',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
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