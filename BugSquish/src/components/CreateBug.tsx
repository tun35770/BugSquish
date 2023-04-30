import React, { useEffect, useState, useRef } from 'react'
import Form from 'react-bootstrap/Form';

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

    const [username, setUsername] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [project, setProject] = useState('');
    const [date, setDate] = useState('');
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
            date: date
        };

        console.log(bug);

        window.location.href= "/";
    }

  return (
    <div className='mx-3'>
        <h3>Create New Bug Ticket</h3>
        <Form onSubmit={onSubmit}>

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
        </Form>
    </div>
  )
}

export default CreateBug