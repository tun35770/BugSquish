import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import Project from './Project';
import { useAuthContext } from '../hooks/useAuthContext';

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
      const response = await fetch('http://localhost:5000/projects', {
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
        console.log(json)
      }
    }

    if(user) {
      fetchProjects();
    }

    else {
      console.log('Not logged in.');
    }
  }, [user])

  function deleteProject(id:string){

    if(!user){
      return;
    }

    fetch('http://localhost:5000/projects/' + id, {
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
          const newProjects = [...projects].filter((project: ProjectType) => project._id !== id)
          setProjects(newProjects);
        })
        .catch((err) => console.log(err))
  }
  
  function projectList(){
    return projects.map((currentProject: ProjectType) => {
      return <Project project={currentProject} deleteProject={deleteProject} key={currentProject._id} id={currentProject._id} />
    });
  }
  
  return (
    <div>
      { (projects.length > 0) && 
        <>
          <h1 style={{
            marginTop: '0.5em',
            color: '#fff',
            fontFamily: 'Montserrat',
          }}> My Projects</h1>
          {projectList()}
        </>
      }

      { (projects.length === 0) && 
        <>
          <h1 style={{
            marginTop: '0.5em',
            color: '#fff',
            fontFamily: 'Montserrat',
          }}> You have no projects</h1>

          <br />
          <Button
            variant='primary'
            onClick={(e)=>window.location.href='createproject'}>
            Create your first Project
          </Button>
        </>
      }
    </div>
  )
}

export default ProjectList