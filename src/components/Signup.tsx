import React, { useEffect, useState } from 'react'
import { Card, Form } from 'react-bootstrap';
import { useSignup } from '../hooks/useSignup'
import { useAuthContext } from '../hooks/useAuthContext';

const Signup = () => {

    const { user } = useAuthContext();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signup, error, isLoading} = useSignup();

    useEffect(() => {
        if(user){
            window.history.go(-1);
        }
    }, [user])

    function onChangeUsername(e: React.ChangeEvent<HTMLInputElement>){
        setUsername(e.currentTarget.value);
    }
    function onChangeEmail(e: React.ChangeEvent<HTMLInputElement>){
        setEmail(e.currentTarget.value);
    }
    function onChangePassword(e: React.ChangeEvent<HTMLInputElement>){
        setPassword(e.currentTarget.value);
    }

    async function onSubmit(e: React.FormEvent){
        e.preventDefault();

        //TODO: Add error text on database error
        await signup(username, email, password);
    }


    return (
    <Card className='blue-gradient' style=
        {{maxWidth: '75%', 
        margin: '3rem auto', 
        padding:'1rem',
        border:'1px solid white',
        color:'#fff'}}>
        <h3>Sign Up</h3>
        <br/>
        <Form onSubmit={(e) => onSubmit(e)} style=
        {{width:'80%',
            margin:'0 auto'}}>

        <Form.Group className="mb-3 leftAlign" controlId="formGroupUsername">
        <Form.Label>Username: </Form.Label>
            <Form.Control
                type="text"
                required
                className="form-control"
                value={username}
                onChange={onChangeUsername}>
            </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3 leftAlign" controlId="formGroupEmail">
        <Form.Label>Email: </Form.Label>
            <Form.Control
              type="email"
              required
              className="form-control"
              value={email}
              onChange={onChangeEmail}>
            </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3 leftAlign" controlId="formGroupPassword">
        <Form.Label>Password: </Form.Label>
            <Form.Control
              type="password"
              required
              className="form-control"
              value={password}
              onChange={onChangePassword}>
            </Form.Control>
        </Form.Group>

        <br/>
        <Form.Group className='mb-3'>
                <Form.Control
                    disabled={isLoading}
                    type="submit"
                    value="Signup"
                    className="btn btn-bug-primary silver-gradient"
                    onSubmit={(e) => onSubmit(e)}
                    style={{maxWidth:'10em'}}>
                </Form.Control>

                {error && <div className="error">{error}</div>}
            </Form.Group>
        </Form>

    </Card>
    )
}

export default Signup