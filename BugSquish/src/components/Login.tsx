import React, { useState } from 'react'
import { Card, Form } from 'react-bootstrap';
import { useLogin } from '../hooks/useLogin'

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();

    function onChangeUsername(e: React.ChangeEvent<HTMLInputElement>){
        setUsername(e.currentTarget.value);
    }

    function onChangePassword(e: React.ChangeEvent<HTMLInputElement>){
        setPassword(e.currentTarget.value);
    }

    async function onSubmit(e: React.FormEvent){
        e.preventDefault();

        const user = {
            username: username,
            password: password,
        };

        await login(username, password);
    }


    return (
    <Card className='purple-gradient' style=
        {{maxWidth: '75%', 
        margin: '3rem auto', 
        padding:'1rem',
        border:'1px solid white',
        color:'#fff'}}>
        <h3>Login</h3>
        <br/>
        <Form onSubmit={onSubmit} style=
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

        <Form.Group className="mb-3 leftAlign" controlId="formGroupUsername">
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
                    value="Login"
                    className="btn btn-primary"
                    onSubmit={onSubmit}
                    style={{maxWidth:'10em'}}>
                </Form.Control>

                {error && <div className="error">{error}</div>}
            </Form.Group>
        </Form>

    </Card>
    )
}

export default Login