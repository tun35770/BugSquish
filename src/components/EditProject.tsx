import React, { useEffect, useState, useRef} from 'react'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import Loading from './Loading';
import { Alert } from 'react-bootstrap';

const EditProject = () => {

    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        if(!user){
            return;
        }

        fetch('https://bugsquish.org/projects/' + id, {
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
        setIsLoaded(true);
        })
        .catch((err) => console.log(err))
    }, [user]);

    function onChangeTitle(e: React.ChangeEvent<HTMLInputElement>){
        setTitle(e.currentTarget.value);
    }

    function onChangeDescription(e: React.ChangeEvent<HTMLInputElement>){
        setDescription(e.currentTarget.value);
    }

    function onSubmit(e: React.FormEvent){
        e.preventDefault();

        if(!user) {
            return;
        }

        const project = {
            user: user,
            title: title,
            description: description,
            date: new Date()
        };

        fetch('https://bugsquish.org/projects/update/' + id, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(project)
        })
        .then((res) => res.json())
        .then((data) => {
           //console.log(data);
            setAlert(true);
            setTimeout(() => {
                if (user) window.history.go(-1);
                else      navigate("/");
            }, 1000);
           
        })
        .catch((err) => console.log(err))
    }

  return (
    <>
    {isLoaded && 
        <>
            {alert &&  <Alert key='success' variant='success'>
                Project updated!
                </Alert>
            }
            
            <Card className='blue-gradient' style=
                {{maxWidth: '75%', 
                margin: '3rem auto', 
                padding:'1rem',
                border:'1px solid white',
                color:'#fff'}}>
                <h3>Edit Project</h3>
                <br/>
                <Form style=
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
                            value="Update Project"
                            className="btn btn-bug-primary silver-gradient"
                            onClick={onSubmit}
                            style={{maxWidth:'10em'}}>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Card>
        </>
    }

    {!isLoaded && 
        <>
            <Loading />
        </>
    }
    </>
  )
}

export default EditProject