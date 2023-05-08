import React, { useState } from 'react'
import { Card, Form } from 'react-bootstrap';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function onChangeUsername(e: React.ChangeEvent<HTMLInputElement>){
        setUsername(e.currentTarget.value);
    }

    function onChangePassword(e: React.ChangeEvent<HTMLInputElement>){
        setPassword(e.currentTarget.value);
    }

    function onSubmit(e: React.FormEvent){
        e.preventDefault();

        const user = {
            username: username,
            password: password
        };

        //TODO: Add error text on database error
        fetch('http://localhost:5000/users/login', {
            method: 'POST',
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify(user)
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            
        })
        .catch((err) => console.log(err))

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
                    type="submit"
                    value="Login"
                    className="btn btn-primary"
                    onSubmit={onSubmit}
                    style={{maxWidth:'10em'}}>
                </Form.Control>
            </Form.Group>
        </Form>

    </Card>
    )
}

export default Login