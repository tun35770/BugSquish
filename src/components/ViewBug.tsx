import React, { useEffect, useState } from 'react'
import { Card, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import Loading from './Loading';

const ViewBug = () => {

    const { user } = useAuthContext();
    const { id } = useParams();
    const [username, setUsername] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [project, setProject] = useState('');
    const [date, setDate] = useState('');
    const [completed, setCompleted] = useState('');

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
                setDate(data.date);
                setCompleted(data.completed);

                setIsLoaded(true);  
            })
            .catch((err) => console.log(err))
    }, [user])

    function onSubmit(e: React.FormEvent){
        e.preventDefault();

        if (!user){
            return;
        }

        const bug = {
            user: user,
            title: title,
            description: description,
            date: date,

            /** ONLY VALUE BEING CHANGED */
            completed: true,
            
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
        .then((data) => window.history.go(-1))
        .catch((err) => console.log(err))
    }

  return (
    <>
        {isLoaded && 
            <Card className='blue-gradient' style=
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
            <b>Project: </b>{project}
            </Card.Text>

            <Card.Text className="mb-3 leftAlign">
                <b>Submitted by: </b>{username}
            </Card.Text>

            <Card.Text className="mb-3 leftAlign">
                {completed ? 'This bug has been completed' : 'This bug has not been completed'}
            </Card.Text>

            <Card.Text className="mb-3 leftAlign">
            <b>Date: </b> {new Date(date).toLocaleString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric", hour:"2-digit", minute:"2-digit"})}
            </Card.Text>

            
                <Form onSubmit={onSubmit}>
                    {!completed && 
                        <Form.Group className='mb-3'>
                            <Form.Control
                                type="submit"
                                value="Mark as Complete"
                                className="btn btn-primary"
                                onSubmit={onSubmit}
                                style={{maxWidth:'10em'}}>
                            </Form.Control>
                        </Form.Group>
                    }
                    <Form.Group className='mb-3'>
                        <Form.Control
                            type="button"
                            value="Back"
                            className="btn btn-primary"
                            onClick={() => window.history.go(-1)}
                            style={{maxWidth:'10em'}}>
                        </Form.Control>
                    </Form.Group>
                </Form>
            
        </Card>
        }

        {!isLoaded && 
        <>
            <Loading />
        </>
        }
    </>
  )
}

export default ViewBug