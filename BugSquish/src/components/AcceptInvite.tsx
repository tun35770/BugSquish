import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
import { useParams } from 'react-router-dom';

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

        const data = {
            username: user.username,
            user_id: user.user_id,
            email: user.email
        }

        fetch('http://localhost:5000/projects/adduser/' + id, {
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
            <div className='success'> 
                <p> Successfully added to project! </p>
                <p> Redirecting... </p>
            </div>}
        {error && <div className="error">{error}</div>}
    </div>
  )
}

export default AcceptInvite