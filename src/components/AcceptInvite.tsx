import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const AcceptInvite = () => {

    const { user } = useAuthContext();
    const { id } = useParams();
    const [error, setError] = useState<String | undefined>(undefined);
    const [success, setSuccess] = useState(false);
    
    useEffect(() => {

        if(!user){
            setError('Not logged in.');
            return;
        }

        else    setError(undefined);

        const data = {
            username: user.username,
            user_id: user.user_id,
            email: user.email
        }

        fetch('http://44.199.215.98:5000/projects/adduser/' + id, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((data) => {console.log(data);
                        setSuccess(true);
                        setTimeout(() => {
                            window.location.href = '/';
                        }, 3000)
                        //window.location.href= "/projects";
                        })
        .catch((err) => console.log(err));
    }, [user])

  return (
    <div>
        {success && 
            <div className='success' style={{
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center'}}> 
                <h2 style={{margin: '1em auto'}}> Successfully added to project! </h2>
                <h5> Redirecting... </h5>
            </div>}
        {error && 
            <div style={{
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center'}}>

                <h2 style={{margin: '1em auto'}}> You've been invited to a project!</h2>
                <div className="error" style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '1em',
                    margin: '2em auto',
                    width: '25%',
                    justifyContent: 'space-evenly'
                    
                }}> 
                    <Button
                        href = '/login'
                        variant='primary' >
                        Login
                    </Button>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
                        <h5> or </h5>
                    </div>

                    <Button
                        variant='primary'
                        onClick={(e) => window.location.pathname='signup'}>
                        Sign up
                    </Button>

                </div>
                    
                <h4> to join. </h4>
            </div>
        }
    </div>
  )
}

export default AcceptInvite