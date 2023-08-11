import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { useAuthContext } from '../hooks/useAuthContext';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';

const InviteUser = () => {

    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [project, setProject] = useState<any | undefined>(undefined);
    const [email, setEmail] = useState('');
    const [error, setError] = useState<String | undefined>(undefined);
    const [alert, setAlert] = useState(false);

    const [projects, setProjects] = useState<any[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {

        if(!user){
            return;
        }

        const data = {
            user: user
        }

        const fetchProjects = async () => {
            const response = await fetch('https://bugsquish.org/projects', {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(data)
            });
      
            const json = await response.json();
            if(response.ok){
                //console.log(json)
                setProjects(json);
                if(json.length > 0){
                    setProject(json[0]);
                }
              //console.log(projects);
            }

            setIsLoaded(true);
          }
     
          if(user) {
            fetchProjects();
          }
      
          else {
            console.log('Not logged in.');
          }
    }, [user])


    function onChangeEmail(e: React.ChangeEvent<HTMLInputElement>){
        setEmail(e.currentTarget.value);
    }

    function onChangeProject(e: React.ChangeEvent<HTMLSelectElement>){
        const project_id = e.currentTarget.value;
        const newProject = projects.filter((proj) => proj["_id"] === project_id) [0];
        setProject(newProject);
    }

    function onSubmit(e: React.FormEvent){
        e.preventDefault();

        if(!user){
            setError('Not logged in.');
            return;
        }

        //console.log(user);

        const data = {
            receiverEmail: email,
            user: user,
        }

        fetch('https://bugsquish.org/projects/sendinvite/' + project["_id"], {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setError(data);
            setAlert(true);
            setTimeout(() => {
               navigate('/'); 
            }, 1000)
            
        })
        .catch((err) => console.log(err));
    }

  return (
    <>
    {isLoaded && 
        <>
            {projects.length > 0 &&
            <>
                {alert &&  <Alert key='success' variant='success'>
                        Email sent!
                        </Alert>
                }

                <Card className='blue-gradient' style=
                    {{maxWidth: '75%', 
                    margin: '3rem auto', 
                    padding:'1rem',
                    border:'1px solid white',
                    color:'#fff'}}>
                    <h3>Invite a new user to your project</h3>
                    <br/>
                    <Form onSubmit={onSubmit} style=
                        {{width:'80%',
                        margin:'0 auto'}}>

                        <Form.Group className="mb-3 leftAlign" controlId="formGroupDescription">
                        <Form.Label>User's email: </Form.Label>
                            <Form.Control
                                type="text"
                                required
                                className="form-control"
                                value={email}
                                onChange={onChangeEmail}>
                            </Form.Control>
                        </Form.Group>

                        <br/>

                        <Form.Group className="mb-3 leftAlign" controlId="formGroupProject">
                        <Form.Label>Project Name: </Form.Label>
                        <select
                                required
                                className="form-control"
                                value={project["_id"]}
                                onChange={onChangeProject}>
                                {
                                    projects.map((proj, i) => {
                                        return <option
                                                key={i}
                                                value={proj["_id"]}>
                                                    {proj.title}
                                            </option>
                                    })
                                
                                }
                            </select>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Control
                                type="submit"
                                value="Send Invite"
                                className="btn btn-primary"
                                onSubmit={onSubmit}
                                style={{maxWidth:'10em'}}>
                            </Form.Control>

                            {error && <div className="error">{error}</div>}
                        </Form.Group>
                    </Form>
                </Card>`
            </>
            }

            { (projects.length === 0) && 
                <>
                    <h1 className='dark-text' style={{
                    marginTop: '0.5em',
                    fontFamily: 'Montserrat',
                    }}> You have no projects</h1>

                    <br />
                    <Button
                    variant='primary'
                    onClick={(e)=>navigate('/createproject')}>
                    Create your first Project
                    </Button>
                </>
            }
        </>
    }
    
    {!isLoaded && 
      <>
        <Loading />
      </>
    }
    </>
)}

export default InviteUser