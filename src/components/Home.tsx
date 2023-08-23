import React from 'react'
import { Card } from 'react-bootstrap'
import {
    MDBCarousel,
    MDBCarouselItem,
  } from 'mdb-react-ui-kit';
import { Bug } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

const Home = () => {

    const { login, error, isLoading } = useLogin();

    const navigate = useNavigate();
    
    const redirectToLogin = () => {
        navigate("/login")
    }

    const redirectToSignup = () => {
        navigate("/signup")
    }

    const onDemoLogin = () => {
        login('ryanmu1415', 'Password123456#');
    }


  return (
    <div className='silver-gradient home-container'>
        <Card className='blue-gradient home-card'>
            <Card.Body className='home-body-1 ps-5'>
                <div className='home-title-container'>
                    <h5 className='mx-2' style={{textAlign: 'left'}}> Welcome to </h5>
                    <div style={{
                        display: 'flex'
                    }}>
                        <Bug size='3.5em' style={{alignSelf: 'center'}} />
                        <Card.Title className='home-title'> BugSquish </Card.Title>
                    </div>
                </div>

                <div className='home-description-container'>
                    <h5> Manage all of your bug tickets in one place </h5>
                    <br />
                    <h5> Collaborate with fellow developers to stay on track </h5>
                    <br />
                    <br />
                    <h5> Start by logging in or signing up, then create your first project </h5>
                </div>
                
            </Card.Body>

            <Card.Body className='home-body-2 pe-5'>
                <div className='home-button-container'>
                    <button className='home-button btn btn-bug-primary silver-gradient' onClick={redirectToLogin}>
                        Login 
                    </button>

                    <button className='home-button btn btn-bug-primary silver-gradient' onClick={onDemoLogin}>
                        Demo Login 
                    </button>

                    <button className='home-button btn btn-bug-primary silver-gradient' onClick={redirectToSignup}>
                        Sign Up 
                    </button>
                </div>
            </Card.Body>
            
        </Card>
    </div>
  )
}

export default Home