import React, { useEffect, useState, useRef} from 'react'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import Loading from './Loading';
import { Alert } from 'react-bootstrap';

const EditBug = () => {

    const { user } = useAuthContext();
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [project, setProject] = useState('');
    const [status, setStatus] = useState('');
    const [date, setDate] = useState();
    const [alert, setAlert] = useState(false);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if(!user){
            return;
        }

        fetch('https://bugsquish.org/bugs/' + id, {
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
        setStatus(data.status);
        setDate(data.date);
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

    function onChangeStatus(e: React.ChangeEvent<HTMLSelectElement>){
        e.preventDefault();

        if (!user){
            return;
        }

        setStatus(e.target.value);
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
            status: status,
        };

        fetch('https://bugsquish.org/bugs/update/' + id, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(bug)
        })
        .then((res) => res.json())
        .then((data) => {
            //console.log(data);
            setAlert(true);
            setTimeout(() => {
                window.history.go(-1);  
            }, 1000);
            
        })
        .catch((err) => console.log(err))

        
    }

  return (
    <>
        {isLoaded && 
            <>
                {alert &&  <Alert key='success' variant='success'>
                    Bug updated!
                    </Alert>
                }

                <Card className='blue-gradient' style=
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

                        <Form.Group className="mb-3 leftAlign" controlId="formGroupProject" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: '130px',
                        width: '10%',
                        height: '2em'
                        }}>
                        <Form.Label className="mt-1"> Status: </Form.Label>
                            <select
                                required
                                className="form-control ps-3 py-0"
                                value={status}
                                onChange={onChangeStatus}>
                                
                                <option value={"open"}>
                                    Open
                                </option>
                                <option value={"in progress"}>
                                    In Progress
                                </option>
                                <option value={"closed"}>
                                    Closed
                                </option>

                            </select>
                        </Form.Group>

                        <br/>
                        <Form.Group className='mb-3'>
                            <Form.Control
                                type="submit"
                                value="Update Bug Ticket"
                                className="btn btn-bug-primary silver-gradient"
                                onSubmit={onSubmit}
                                style={{maxWidth:'11em'}}>
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

export default EditBug