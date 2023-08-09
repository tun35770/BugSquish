import React, { useEffect, useState } from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap';
import Project from './Project';
import { useAuthContext } from '../hooks/useAuthContext';
import Loading from './Loading';
import DeleteProject from './DeleteProject';

const ProjectList = () => {
  class ProjectType {
    _id: string;
    username: string;
    title: string;
    description: string;
    bugs: any;
    users: any;

    constructor(id:string, username:string, title:string, description:string, bugs:any, users:any){
        this._id = id;
        this.username = username;
        this.title = title;
        this.description = description;
        this.bugs = bugs;
        this.users = users;
    }
  }

  const { user } = useAuthContext();

  const [projects, setProjects] = useState<ProjectType[]>([]);
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

    const fetchProjects = async () => {
      const response = await fetch('https://44.199.215.98:5000/projects', {
          method: 'POST',
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
              'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify(data)
      });

      const json = await response.json();
      if(response.ok){
        setProjects(json);
        //console.log(json)
        setIsLoaded(true);
      }
    }

    if(user) {
      fetchProjects();
    }

    else {
      console.log('Not logged in.');
    }
  }, [user])

  
  function projectList(){
    return projects.map((currentProject: ProjectType) => {
      return <Project project={currentProject} deleteProject={DeleteProject} key={currentProject._id} id={currentProject._id} user={user}/>
    });
  }
  
  return (
    <>
    {isLoaded && 
      <div>
        { (projects.length > 0) && 
          <>
            <h1 className='dark-text' style={{
              marginTop: '0.5em',
              fontFamily: 'Montserrat',
            }}> My Projects</h1>

            <ListGroup>
              {projectList()}
            </ListGroup>
          </>
        }

        { (projects.length === 0) && 
          <>
            <h1 className='dark-text' style={{
              marginTop: '0.5em',
              fontFamily: 'Montserrat',
            }}> You have no projects</h1>

            <br />
            <Button
              variant='primary'
              onClick={(e)=>window.location.href='/BugSquish/createproject'}>
              Create your first Project
            </Button>
          </>
        }
      </div>
    }

    {!isLoaded && 
      <>
        <Loading />
      </>
    }
    </>
  )
}

export default ProjectList