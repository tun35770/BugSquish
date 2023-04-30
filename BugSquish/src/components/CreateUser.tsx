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

    console.log(user);

    setUsername('');
  }


  return (
    <Card className='' style={{maxWidth: '75%', margin: '3rem auto', padding:'1rem'}}>
      <h3>Create New Bug Ticket</h3>
      <Form onSubmit={onSubmit} style={{width:'80%', margin:'0 auto'}}>

        <Form.Group className="mb-3" >
        <Form.Label>Username: </Form.Label>
            <Form.Control
              type="text"
              required
              className="form-control"
              value={username}
              onChange={onChangeUsername}>
            </Form.Control>
        </Form.Group>

        <Form.Group className='mb-3'>
                <Form.Control
                    type="submit"
                    value="Create User"
                    className="btn btn-primary"
                    onSubmit={onSubmit}>
                </Form.Control>
            </Form.Group>
        </Form>

   </Card>
  )
}

export default CreateUser