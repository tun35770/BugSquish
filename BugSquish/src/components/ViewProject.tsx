import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import BugList from './BugList'

import { useAuthContext } from '../hooks/useAuthContext';

const ViewProject = () => {

    const { user } = useAuthContext();
    const { id } = useParams();
    const [username, setUsername] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [users, setUsers] = useState();
    
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


    function AddBug(){
        window.location.href = "/createbug";
    }

    function GoBack(){

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

        
                <Form>
                    <Form.Group>
                        <Button className='mb-3' style={{width:'10em'}} variant="primary" onClick={AddBug}>Add Bug</Button>
                    </Form.Group>
                    <Form.Group>
                        <Button className='mb-3' style={{width:'10em'}} variant="primary" onClick={GoBack}>Back</Button>
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