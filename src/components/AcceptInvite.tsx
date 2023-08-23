import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const AcceptInvite = () => {

    const navigate = useNavigate();
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

        fetch('https://bugsquish.org/projects/adduser/' + id, {
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
                            navigate("/projects");
                        }, 3000)
                        
                        })
        .catch((err) => console.log(err));
    }, [user])

  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '70%',
        margin: '0 auto',
        minHeight: '80vh'
    }}>
        {success && 
            <div className='success blue-gradient' style={{
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center',
                height: '40vh'
            }}> 
                <h2 style={{margin: '1em auto'}}> Successfully added to project! </h2>
                <h5> Redirecting... </h5>
            </div>}
        {error && 
            <div className='blue-gradient' style={{
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center',
                height: '40vh'
            }}>
                <h2 className='mb-3' > You've been invited to a project!</h2>
                <div className="error" style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '1em',
                    margin: '2em auto',
                    width: '25%',
                    justifyContent: 'space-evenly'
                    
                }}> 
                    <button className="btn btn-bug-primary silver-gradient"
                        onClick={() => navigate('/login')} >
                        Login
                    </button>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
                        <h5> or </h5>
                    </div>

                    <button className="btn btn-bug-primary silver-gradient"
                        onClick={(e) => navigate('/signup')}>
                        Sign up
                    </button>

                </div>
                    
                <h4> to join. </h4>
            </div>
        }
    </div>
  )
}

export default AcceptInvite