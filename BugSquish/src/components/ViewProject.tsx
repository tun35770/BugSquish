import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';
import BugList from './BugList'

import { useAuthContext } from '../hooks/useAuthContext';
import Loading from './Loading';
import { BsEye, BsPencil, BsXCircle } from 'react-icons/bs';
import DeleteProject from './DeleteProject';

const ViewProject = () => {

    const { user } = useAuthContext();
    const { id } = useParams();
    const [username, setUsername] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [users, setUsers] = useState();
    const [error, setError] = useState<string | undefined>(undefined);

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
            })
            .catch((err) => setError(err));

            setIsLoaded(true);

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
            {error === undefined && 
            <>
                <Card className='light-text blue-gradient' style=
                    {{maxWidth: '75%', 
                    margin: '3rem auto', 
                    padding:'1rem',
                    border:'1px solid white'
                    }}>
                    
                    <Card.Body style={{
                        display:'flex', 
                        justifyContent:'space-between',
                        padding:'0'}}>
                        <Card.Title className="mb-3 leftAlign light-text" style={{fontSize: '1.5em', color:'#CCC'}}> {title} </Card.Title>
                        
                        <div style={{display:'flex', gap:'1em', textAlign:'right'}} >
                            <Link to={"/editproject/" + id} style={{color:'gold'}}><BsPencil /></Link>
                            <a href="/projects" onClick={() => {DeleteProject(id as string, user)}}><BsXCircle style={{color:'red'}} /></a>
                        </div>
                    </Card.Body>
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
            
            {error !== undefined && 
                <h3 style={{
                    marginTop: '1em'
                }}>
                    Failed to fetch project. Try refreshing
                </h3>
            }
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

export default ViewProject