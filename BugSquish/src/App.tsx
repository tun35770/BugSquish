import { useState } from 'react'
import './App.css'
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  return (
    <div className="App">
      <header className='App-header'>
        <Container fluid>
          <Form>
            <Row>
              <Col md>
                  <Form.Group controlId='formEmail'>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type='email' placeholder='example@email.com' />
                  <Form.Text className='text-muted'>
                    We'll never save your email address...trust us!
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col md>
                <Form.Group controlId='formPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Password' />
                </Form.Group>
              </Col>
            </Row>
 
            <Button variant='success' type = 'submit'>Login</Button>
          </Form>
          <Card className='mb-3' style={{color: "#000"}}>
            <Card.Img src='https://picsum.photos/200/100'/>
            <Card.Body>
              <Card.Title>
                Card Example
              </Card.Title>
              <Card.Text>
                This is an example of a card
              </Card.Text>

              <Button variant='primary'>Read More</Button>
            </Card.Body>
          </Card>
          <Breadcrumb>
            <Breadcrumb.Item>Test</Breadcrumb.Item>
            <Breadcrumb.Item>Test 2</Breadcrumb.Item>
            <Breadcrumb.Item active>Test 3</Breadcrumb.Item>

          </Breadcrumb>
        </Container>
      </header>
    </div>
  )
}

export default App
