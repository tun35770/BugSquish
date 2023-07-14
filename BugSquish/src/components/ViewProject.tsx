import React, { useEffect, useState } from 'react'
import { Card, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import BugList from './BugList'

import { useAuthContext } from '../hooks/useAuthContext';
import Bug from './Bug'; 

const ViewProject = () => {

    class BugType {
        _id: string;
        username: string;
        title: string;
        description: string;
        project: string;
        project_id: string;
        date: Date;
        completed: boolean;

        constructor(id:string, username:string, title:string, description:string, project:string, project_id: string, date:Date, completed = false){
            this._id = id;
            this.username = username;
            this.title = title;
            this.description = description;
            this.project = project;
            this.project_id = project_id;
            this.date = date;
            this.completed = completed;
        }
    }

    const { user } = useAuthContext();
    const { id } = useParams();
    const [username, setUsername] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [users, setUsers] = useState();
    const [bugs, setBugs] = useState<BugType[]>([]);
    const [bugsLength, setBugsLength] = useState(0);
    
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if(!user){
            return;
        }

        fetch('http://localhost:5000/projects/' + id, {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    'Authorization': `Bearer ${user.token}`
                }
            })
            .then((res) => res.json())
            .then((data) => {
                setUsername(data.username);
                setDescription(data.description);
                setTitle(data.title);
                setUsers(data.users);
                setIsLoaded(true);
            })
            .catch((err) => console.log(err));

    }, [user])

    function onSubmit(e: React.FormEvent){
        e.preventDefault();

        if (user) window.history.go(-1);
        else      window.location.href = "/";
        
    } 

  return (
    <>
        {isLoaded && 
        <>
            <Card className='light-text blue-gradient' style=
                {{maxWidth: '75%', 
                margin: '3rem auto', 
                padding:'1rem',
                border:'1px solid white'
                }}>
                <Card.Title className="mb-3 leftAlign light-text" style={{fontSize: '1.5em', color:'#CCC'}}> {title} </Card.Title>
                
                <Card.Text className="mb-3 leftAlign light-text">
                    {description}
                </Card.Text>
                <br/>

                <Card.Text className="mb-3 leftAlign light-text">
                    <b>Owner: </b>{username}
                </Card.Text>

        
                <Form onSubmit={onSubmit}>
                    <Form.Group className='mb-3'>
                        <Form.Control
                            type="submit"
                            value="Back"
                            className="btn btn-primary"
                            onSubmit={onSubmit}
                            style={{maxWidth:'10em'}}>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Card>
            
            <br />

            <BugList project_id={id}/>
        </>
        }
    </>
  )
}

export default ViewProject