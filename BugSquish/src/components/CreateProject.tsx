import React, { useEffect, useState, useRef } from 'react'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import { useAuthContext } from '../hooks/useAuthContext';

const CreateProject = () => {

    const { user } = useAuthContext();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState<String | undefined>(undefined);
    const userInputRef = useRef();

    function onChangeTitle(e: React.ChangeEvent<HTMLInputElement>){
        setTitle(e.currentTarget.value);
    }

    function onChangeDescription(e: React.ChangeEvent<HTMLInputElement>){
        setDescription(e.currentTarget.value);
    }

    function onSubmit(e: React.FormEvent){
        e.preventDefault();

        if(!user){
            setError('Not logged in.');
            return;
        }

        console.log(user);

        /**
         * REQUIRED: username,
         *           user_id,
         *           title,
         *           description,
         *           email
         */
        const project = {
            username: user.username ?? '',
            user_id: user.user_id,
            title: title,
            description: description,
            email: user.email,
        };

        fetch('http://localhost:5000/projects/add', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(project)
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err))

        window.location.href= "/projects";
    }

  return (
    <Card className='blue-gradient' style=
        {{maxWidth: '75%', 
          margin: '3rem auto', 
          padding:'1rem',
          border:'1px solid white',
          color:'#fff'}}>
        <h3>Create New Project</h3>
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

            <br/>
            <Form.Group className='mb-3'>
                <Form.Control
                    type="submit"
                    value="Create Project"
                    className="btn btn-primary"
                    onSubmit={onSubmit}
                    style={{maxWidth:'10em'}}>
                </Form.Control>

                {error && <div className="error">{error}</div>}
            </Form.Group>
        </Form>
    </Card>
  )
}

export default CreateProject