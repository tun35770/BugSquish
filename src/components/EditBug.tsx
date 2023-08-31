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
    const [username, setUsername] = useState('');
    const [project, setProject] = useState('');
    const [projectId, setProjectID] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [date, setDate] = useState();

    const [projectOwner, setProjectOwner] = useState('');
    const [users, setUsers] = useState([]);

    const [projectUsers, setProjectUsers] = useState();

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
            setUsername(data.username);
            setDescription(data.description);
            setTitle(data.title);
            setProject(data.project);
            setProjectID(data.project_id);
            setStatus(data.status);
            setPriority(data.priority);
            setDate(data.date);
            setIsLoaded(true);
        })
        .catch((err) => console.log(err));

        
    }, [user]);

    useEffect(() => { 

        if(!user) return;

        if(projectId !== ''){
            //get project owner
            fetch('https://bugsquish.org/projects/' + projectId, {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    'Authorization': `Bearer ${user.token}`
                },
            })
            .then(res => res.json())
            .then((data) => {
                setProjectOwner(data.username)
                if(user.username === data.username){
                    fetch('https://bugsquish.org/projects/users/' + projectId, {
                        method: 'GET',
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json;charset=UTF-8",
                            'Authorization': `Bearer ${user.token}`
                        }
                    })
                    .then((res) => res.json())
                    .then((data) => {
                        setUsers(data);
                        //console.log(data);
                    })
                    .catch((err) => console.log(err));
                }
            })
            .catch((err) => console.log(err));
        }
    }, [projectId]);

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

    function onChangePriority(e: React.ChangeEvent<HTMLSelectElement>){
        e.preventDefault();

        if (!user){
            return;
        }

        setPriority(e.target.value);
    }


    function onChangeUsername(e: React.ChangeEvent<HTMLSelectElement>){
        e.preventDefault();

        if (!user){
            return;
        }

        setUsername(e.target.value);
    }

    function onSubmit(e: React.FormEvent){
        e.preventDefault();

        if(!user) {
            return;
        }

        const bug = {
            user: user,
            username: username,
            title: title,
            description: description,
            project: project,
            date: date,
            status: status,
            priority: priority,
        };

        console.log(user.token)
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

                        <div className="buglist-select-container">
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
                                    
                                    <option value={"Open"}>
                                        Open
                                    </option>
                                    <option value={"In Progress"}>
                                        In Progress
                                    </option>
                                    <option value={"Closed"}>
                                        Closed
                                    </option>

                                </select>
                            </Form.Group>

                            <Form.Group className="mb-3 leftAlign" controlId="formGroupProject" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            minWidth: '130px',
                            width: '10%',
                            height: '2em'
                            }}>
                            <Form.Label className="mt-1"> Priority: </Form.Label>
                                <select
                                    required
                                    className="form-control ps-3 py-0"
                                    value={priority}
                                    onChange={onChangePriority}>
                                    
                                    <option value={"Low"}>
                                        Low
                                    </option>
                                    <option value={"Medium"}>
                                        Medium
                                    </option>
                                    <option value={"High"}>
                                        High
                                    </option>

                                </select>
                            </Form.Group>

                            {user.username === projectOwner && 
                                <Form.Group className="mb-3 leftAlign" controlId="formGroupProject" style={{
                                display: 'flex',
                                flexDirection: 'column',
                                minWidth: '130px',
                                width: '10%',
                                height: '2em'
                                }}>
                                <Form.Label className="mt-1"> User: </Form.Label>
                                    <select
                                        required
                                        className="form-control ps-3 py-0"
                                        value={username}
                                        onChange={onChangeUsername}>
                                        
                                        {
                                            users.map((thisUser, i) => {
                                                return <option
                                                        key={i}
                                                        value={thisUser["username"]}>
                                                            {thisUser["username"]}
                                                    </option>
                                            })
                                        
                                        }

                                    </select>
                                </Form.Group>
                            }
                        </div>

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