import React, { useState } from 'react'
import { Card, Form } from 'react-bootstrap';

const CreateUser = () => {

  const [username, setUsername] = useState('');

  function onChangeUsername(e: React.ChangeEvent<HTMLInputElement>){
    setUsername(e.currentTarget.value);
  }

  function onSubmit(e: React.FormEvent){
    e.preventDefault();

    const user = {
        username: username,
    };

    //TODO: Add error text on database error
    fetch('http://44.199.215.98:5000/users/add', {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(user)
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err))

    setUsername('');
  }


  return (
    <Card className='blue-gradient' style=
      {{maxWidth: '75%', 
        margin: '3rem auto', 
        padding:'1rem',
        border:'1px solid white',
        color:'#fff'}}>
      <h3>Create New User</h3>
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
        <br/>
        <Form.Group className='mb-3'>
                <Form.Control
                    type="submit"
                    value="Create User"
                    className="btn btn-primary"
                    onSubmit={onSubmit}
                    style={{maxWidth:'10em'}}>
                </Form.Control>
            </Form.Group>
        </Form>

   </Card>
  )
}

export default CreateUser