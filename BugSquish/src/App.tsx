import { useState } from 'react'
import './App.css'
import Home from './components/Home.tsx'
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Bug } from 'react-bootstrap-icons' 
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom"
import { useLogout } from './hooks/useLogout.ts'
import { useAuthContext } from './hooks/useAuthContext.ts'
import BugList from './components/BugList'
import CreateBug from './components/CreateBug'
import CreateUser from './components/CreateUser'
import EditBug from './components/EditBug'
import ViewBug from './components/ViewBug.tsx'
import Signup from './components/Signup.tsx'
import Login from './components/Login.tsx'


function App() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };  

  return (
    <Router >
      <div className="App">
        <Navbar sticky="top" bg="dark" variant="dark" expand="lg" >
        
          <Navbar.Brand className="mx-3 title" href="/" style={{color:'#fff'}}>
            <Bug style={{marginBottom:'4px'}} />
            BugSquish
          </Navbar.Brand>

          <Navbar.Toggle className="mx-2" aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
            <Nav className="me-3">
              <Link to="/" className="nav-link white-text">Home</Link>
              <Link to="/create" className="nav-link white-text">Create Bug Ticket</Link>
              
              {!user && (
                <>
                  <Link to="/login" className="nav-link white-text">Login</Link>
                  <Link to="/signup" className="nav-link white-text">Sign up</Link>
                </>)}
              {user && (
                <div>
                  <span className='mt-2' style={{color:'#fff'}}>{user.username}</span>
                  <Button className="btn btn-primary" 
                          onClick={handleClick} 
                          style={{maxWidth:'10em', margin:'0 auto'}}
                          >Log out</Button>
              </div>)}
            </Nav>
          </Navbar.Collapse>
        
        </Navbar> 

        <Routes>
          <Route path="/" element={user ? <BugList /> : <Navigate to="/login"/>} />
          <Route path="/create" element={<CreateBug />} />
          <Route path="/edit/:id" element={<EditBug />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/viewbug/:id" element={<ViewBug />} />
        </Routes>
      
      </div>
    </Router>
  )
}

export default App