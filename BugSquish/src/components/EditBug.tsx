import React, { useEffect, useState, useRef} from 'react'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const EditBug = () => {

    const { user } = useAuthContext();
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [project, setProject] = useState('');
    const [completed, setCompleted] = useState(false);

    const userInputRef = useRef();
    
    useEffect(() => {
        if(!user){
            return;
        }

        fetch('http://localhost:5000/bugs/' + id, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                'Authorization': `Bearer ${user.token}`
            }
        })
        .then((res) => res.json())
        .then((data) => {
        //console.log(data);
        setDescription(data.description);
        setTitle(data.title);
        setProject(data.project);
        setCompleted(data.completed);
        })
        .catch((err) => console.log(err))
    }, [user]);

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

        if(!user) {
            return;
        }

        const bug = {
            user: user,
            title: title,
            description: description,
            project: project,
            date: new Date(),
            completed: completed,
        };

        fetch('http://localhost:5000/bugs/update/' + id, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(bug)
        })
        .then((res) => res.json())
        .then((data) => console.log(data) )
        .catch((err) => console.log(err))

        window.location.href= document.referrer;
    }

  return (
    <Card className='purple-gradient' style=
        {{maxWidth: '75%', 
          margin: '3rem auto', 
          padding:'1rem',
          border:'1px solid white',
          color:'#fff'}}>
        <h3>Edit Bug Ticket</h3>
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
                    value="Update Bug Ticket"
                    className="btn btn-primary"
                    onSubmit={onSubmit}
                    style={{maxWidth:'10em'}}>
                </Form.Control>
            </Form.Group>
        </Form>
    </Card>
  )
}

export default EditBug