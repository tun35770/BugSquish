import React, { useEffect, useState, useRef } from 'react'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import { useAuthContext } from '../hooks/useAuthContext';

const CreateBug = () => {

    const { user } = useAuthContext();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [project, setProject] = useState('');
    const [projectId, setProjectId] = useState('');
    const [error, setError] = useState<String | undefined>(undefined);

    const [projects, setProjects] = useState<any[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const userInputRef = useRef();

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    'Authorization': `Bearer ${user.token}`
                },
            });
      
            const json = await response.json();
            if(response.ok){
              setProjects(json);
              if(json.length > 0){
                console.log(json);
                setProject(json[0]["title"]);
                setProjectId(json[0]["_id"]);
              }
              //console.log(projects);
            }
          }
     
          if(user) {
            fetchProjects();
            setIsLoaded(true);
          }
      
          else {
            console.log('Not logged in.');
          }
    }, [])

    function onChangeTitle(e: React.ChangeEvent<HTMLInputElement>){
        setTitle(e.currentTarget.value);
    }

    function onChangeDescription(e: React.ChangeEvent<HTMLInputElement>){
        setDescription(e.currentTarget.value);
    }
    
    function onChangeProject(e: React.ChangeEvent<HTMLSelectElement>){
        setProject(e.currentTarget.value["title"]);
        setProjectId(e.currentTarget.value["_id"]);
        console.log(e.currentTarget.value["title"])
        console.log(e.currentTarget.value["_id"])
    }

    function onSubmit(e: React.FormEvent){
        e.preventDefault();

        if(!user){
            setError('Not logged in.');
            return;
        }

        if(!project || project.length === 0){
            setError('Select a project to assign this bug to.')
            return;
        }

        //console.log(user);

        const bug = {
            username: user.username ?? '',
            user_id: user.user_id,
            title: title,
            description: description,
            project: project,
            project_id: projectId,
            date: new Date(),
            completed: false,
        };

        /* fetch('http://localhost:5000/projects/addbug' + projectId, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(bug)
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err)) */

        fetch('http://localhost:5000/bugs/add', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(bug)
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err))

        //window.location.href= "/";
    }

  return (
    <>
    {isLoaded && 
    <Card className='purple-gradient' style=
        {{maxWidth: '75%', 
          margin: '3rem auto', 
          padding:'1rem',
          border:'1px solid white',
          color:'#fff'}}>
        <h3>Create New Bug Ticket</h3>
        <br/>
        <Form onSubmit={onSubmit} style=
            {{width:'80%',
              margin:'0 auto'}}>

            <Form.Group className="mb-3 leftAlign" controlId="formGroupTitle">
            <Form.Label>Title: </Form.Label>
                <Form.Control
                type="text"
                    required
                    className="form-control"
                    value={title}
                    onChange={onChangeTitle}>
                </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3 leftAlign" controlId="formGroupDescription">
            <Form.Label>Description: </Form.Label>
                <Form.Control
                as="textarea"
                    required
                    className="form-control"
                    value={description}
                    onChange={onChangeDescription}>
                </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3 leftAlign" controlId="formGroupProject">
            <Form.Label>Project Name: </Form.Label>
                <select
                    required
                    className="form-control"
                    value={project}
                    onChange={onChangeProject}>
                    {
                        projects.map(proj => {
                            return <option
                                    key={proj.title}
                                    value={proj}>{proj.title}
                                </option>
                        })
                    
                    }
                </select>
            </Form.Group>
            <br/>
            <Form.Group className='mb-3'>
                <Form.Control
                    type="submit"
                    value="Create Bug Ticket"
                    className="btn btn-primary"
                    onSubmit={onSubmit}
                    style={{maxWidth:'10em'}}>
                </Form.Control>

                {error && <div className="error">{error}</div>}
            </Form.Group>
        </Form>
    </Card>
}</> )
}

export default CreateBug