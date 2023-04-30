import React, { useEffect, useState, useRef } from 'react'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'

const CreateBug = () => {

    /* Class Bug {
        username: string;
        title: string;
        description: string;
        project: string;
        date: Date;

        constructor(username:string, title:string, description:string, project:string, date:Date){
            this.username = username;
            this.title = title;
            this.description = description;
            this.project = project;
            this.date = date;
        }
    } */

    const [username, setUsername] = useState('defaultUsername');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [project, setProject] = useState('');
    const [users, setUsers] = useState([''])

    const userInputRef = useRef();
    
    useEffect(() => {
        setUsers(['Tom', 'Bob', 'Ryan'])
    }, []);
    
    function onChangeUsername(e: React.ChangeEvent<HTMLSelectElement>){
        setUsername(e.currentTarget.value);
    }

    function onChangeTitle(e: React.ChangeEvent<HTMLInputElement>){
        setTitle(e.currentTarget.value);
    }

    function onChangeDescription(e: React.ChangeEvent<HTMLInputElement>){
        setDescription(e.currentTarget.value);
    }
    
    function onChangeProject(e: React.ChangeEvent<HTMLInputElement>){
        setProject(e.currentTarget.value);
    }

    function onSubmit(e: React.FormEvent){
        e.preventDefault();

        const bug = {
            username: username,
            title: title,
            description: description,
            project: project,
            date: new Date()
        };

        fetch('http://localhost:5000/bugs/add', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify(bug)
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err))

        window.location.href= "/";
    }

  return (
    <Card className='' style={{maxWidth: '75%', margin: '3rem auto', padding:'1rem'}}>
        <h3>Create New Bug Ticket</h3>
        <Form onSubmit={onSubmit} style={{width:'80%', margin:'0 auto'}}>

            <Form.Group className="mb-3" >
            <Form.Label>Title: </Form.Label>
                <Form.Control
                type="text"
                    required
                    className="form-control"
                    value={title}
                    onChange={onChangeTitle}>
                </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label>Description: </Form.Label>
                <Form.Control
                type="text"
                    required
                    className="form-control"
                    value={description}
                    onChange={onChangeDescription}>
                </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label>Project Name: </Form.Label>
                <Form.Control
                type="text"
                    required
                    className="form-control"
                    value={project}
                    onChange={onChangeProject}>
                </Form.Control>
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Control
                    type="submit"
                    value="Create Bug Ticket"
                    className="btn btn-primary"
                    onSubmit={onSubmit}>
                </Form.Control>
            </Form.Group>
        </Form>
    </Card>
  )
}

export default CreateBug