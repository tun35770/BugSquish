import React, { useEffect, useState } from 'react'
import { Card, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const ViewProject = () => {

    const { user } = useAuthContext();
    const { id } = useParams();
    const [username, setUsername] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [users, setUsers] = useState();
    const [bugs, setBugs] = useState();

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
                console.log(data);
                setUsername(data.username);
                setDescription(data.description);
                setTitle(data.title);
                setUsers(data.users);
                setBugs(data.bugs);

                setIsLoaded(true);  
            })
            .catch((err) => console.log(err))
    }, [user])

    function onSubmit(e: React.FormEvent){
        e.preventDefault();

        if (user) window.location.href = "/projects";
        else      window.location.href = "/";
        
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
            <Card.Title className="mb-3 leftAlign" style={{fontSize: '1.5em'}}> {title} </Card.Title>
            
            <Card.Text className="mb-3 leftAlign">
                {description}
            </Card.Text>
            <br/>

            <Card.Text className="mb-3 leftAlign">
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
        }
    </>
  )
}

export default ViewProject