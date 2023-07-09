import React, { useEffect, useState } from 'react'
import { Card, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom';

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

        const fetchProject = fetch('http://localhost:5000/projects/' + id, {
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
            })
            .catch((err) => console.log(err));

            const fetchBugs = fetch('http://localhost:5000/bugs/byproject/' + id, {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    'Authorization': `Bearer ${user.token}`
                },
            })
            .then((res) => res.json())
            .then((data) => {
                setBugs(data);
                setBugsLength(data.length);
                console.log(data)
            })
            .catch((err) => console.log(err));
        
            Promise.all([fetchProject, fetchBugs])
            .then((res) => setIsLoaded(true) );

    }, [user])

    function deleteBug(id:string){

        if(!user){
            return;
        }
        fetch('http://localhost:5000/bugs/' + id, {
                method: 'delete',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    'Authorization': `Bearer ${user.token}`
                }
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                const newBugs = [...bugs].filter((bug: BugType) => bug._id !== id)
                setBugs(newBugs);
                setBugsLength(newBugs.length);
            })
            .catch((err) => console.log(err))
    }

    function bugList(){
        console.log(`Bugs: ${bugs}`) 
        return bugs.map((currentBug: BugType) => {
          return <Bug bug={currentBug} deleteBug={deleteBug} key={currentBug._id} id={currentBug._id} />
        });
    }

    function onSubmit(e: React.FormEvent){
        e.preventDefault();

        if (user) window.location.href = document.referrer;
        else      window.location.href = "/";
        
    } 

  return (
    <>
        {isLoaded && 
        <>
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
            
            <br />

            <div>
                { (bugsLength > 0) && 
                    <>
                    <h1 style={{
                        textAlign: 'left',
                        marginLeft: '0.5em',
                        
                        color: '#000',
                        fontFamily: 'Montserrat',
                    }}> Bugs </h1>
                    {bugList()}
                    </>
                }

                { (bugsLength === 0) && 
                    <>
                    <br />
                        <h3 style={{
                            textAlign: 'left',
                            marginLeft: '1em', 
                            color:'black',
                            fontFamily: 'Montserrat'}}> No bugs to display </h3>
                    </>
                }
            </div>
        </>
        }
    </>
  )
}

export default ViewProject