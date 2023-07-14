import React, { useEffect, useState } from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import Bug from './Bug';
import { useAuthContext } from '../hooks/useAuthContext';

interface props {
  project_id?: string | undefined
}

const BugList = ( {project_id = undefined}: props ) => {
  class BugType {
    _id: string;
    username: string;
    title: string;
    description: string;
    project: string;
    project_id: string;
    date: Date;
    completed: boolean;

    constructor(id:string, username:string, title:string, description:string, project:string, project_id: string, date:Date, completed = false){
        this._id = id;
        this.username = username;
        this.title = title;
        this.description = description;
        this.project = project;
        this.project_id = project_id;
        this.date = date;
        this.completed = completed;
    }
  }

  const { user } = useAuthContext();

  const [bugs, setBugs] = useState<BugType[]>([]);
  const [bugsLength, setBugsLength] = useState(0);

  const [isLoaded, setIsLoaded] = useState(false);
  /*
    TODO: Implement localStorage for bugs.
  */
  useEffect(() => {
    
    if(!user){
      return;
    }

    const data = {
      user: user
    }

    const fetchBugs = async () => {
      let fetchBugs: any;

      if(project_id === undefined){
        fetchBugs = fetch('http://localhost:5000/bugs', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
          .then((data) => {
              setBugs(data);
              setBugsLength(data.length);
              console.log(data);
              setIsLoaded(true);
          })
          .catch((err) => console.log(err));
      }

      //specific project
      else {
        fetchBugs = fetch('http://localhost:5000/bugs/byproject/' + project_id, {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    'Authorization': `Bearer ${user.token}`
                },
            })
            .then((res) => res.json())
            .then((data) => {
                setBugs(data);
                setBugsLength(data.length);
                console.log(data);
                setIsLoaded(true);
            })
            .catch((err) => console.log(err));
      }
    }

    if(user) {
      fetchBugs();
    }

    else {
      console.log('Not logged in.');
    }
  }, [user])

  function deleteBug(id:string, project_id:string){

    if(!user){
      return;
    }

    const data = {
      user: user,
      project_id: project_id
    }

    fetch('http://localhost:5000/bugs/' + id, {
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
          const newBugs = [...bugs].filter((bug: BugType) => bug._id !== id)
          setBugs(newBugs);
          setBugsLength(newBugs.length);
        })
        .catch((err) => console.log(err))
  }
  
  function bugList(){
    return bugs.map((currentBug: BugType) => {
      return <Bug bug={currentBug} deleteBug={deleteBug} key={currentBug._id} id={currentBug._id} />
    });
  }
  
  return (
    <>
    {isLoaded && 
    <>
      <div>
        { (bugsLength > 0) && 
          <>
            <h1 className='dark-text' style={{
              marginTop: '0.5em',
              fontFamily: 'Montserrat',
            }}> Bugs </h1>

            <ListGroup>

              <ListGroupItem style={{
                display: 'flex',
                flexDirection: 'row',
                margin: '0 auto',
                justifyContent: 'space-between',
                width:'80%',
                
              }}>
                <h3 id="bug_title" style={{width:'20%'}}> Title </h3>
                <h3 id="project_title" style={{width:'13.33%', paddingRight:'1.5em'}}> Project </h3>
                <h3 id="username" style={{width:'13.33%'}}> Username </h3>
                <h3 id="date" style={{width:'13.33%', paddingLeft:'1.5em'}}> Date </h3>
                <h3 id="options"> Options </h3>
              </ListGroupItem>
              {bugList()}
            </ListGroup>
            
          </>
        }

        { (bugsLength === 0) && 
          <>
            <br />
              <h3 className='dark-text' style={{
                  textAlign: 'left',
                  marginLeft: '1em', 
                  fontFamily: 'Montserrat'}}> No bugs to display </h3>
          </>
        }
      </div>
    </>
    }
    </>
  )
}

export default BugList