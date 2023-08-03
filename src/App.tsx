import { useState, useEffect } from 'react'
import './App.css'
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
import CreateProject from './components/CreateProject.tsx'
import ViewProject from './components/ViewProject.tsx'
import ProjectList from './components/ProjectList.tsx'
import EditProject from './components/EditProject.tsx'
import InviteUser from './components/InviteUser.tsx'
import AcceptInvite from './components/AcceptInvite.tsx'


function App() {
  const { logout } = useLogout();
  const { user } = useAuthContext();


  const handleClick = () => {
    logout();
  };  

  const parseJwt = (token:string) => {
    try {
      const tokenString = atob(token.split(".")[1]);
      return JSON.parse(tokenString);
    } catch (e){
        console.error(e);
    }
  };

  //check for expired token
  if(user) {
    const decodedJwt = parseJwt(user.token);
    //console.log(decodedJwt)
    if(decodedJwt.exp * 1000 < Date.now()){
      logout();
    }
  }

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
              
              {user && (
                <Link to="/createbug" className="nav-link white-text">Create Bug Ticket</Link>
              )}

              {user && (
                <Link to="/projects" className="nav-link white-text">My Projects</Link>
              )}

              {user && (
                <Link to="/createproject" className="nav-link white-text">Create Project</Link>
              )}

              {user && (
                <Link to="/inviteuser" className="nav-link white-text">Invite user</Link>
              )}

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

        { user ? 
          (
            <Routes>
              <Route path="/" element={user ? <BugList /> : <Navigate to="/login"/>} />
              <Route path="/createbug" element={<CreateBug /> } />
              <Route path="/edit/:id" element={<EditBug />} />
              <Route path="/viewbug/:id" element={<ViewBug />} />
              <Route path="/projects" element={<ProjectList />} />
              <Route path="/createproject/" element={<CreateProject />} />
              <Route path="/viewproject/:project_id" element={<ViewProject />} />
              <Route path="/editproject/:id" element={<EditProject />} />
              <Route path="/inviteuser/" element={<InviteUser />} />
              <Route path="/acceptinvite/:id" element={<AcceptInvite />} />

              <Route path="/signup" element={ <Navigate to="/" /> } />
              <Route path="/login" element={ <Navigate to="/" /> } />

            </Routes>
          ) 
          : (
            <Routes>
              <Route path="/" element={ <Navigate to="/login"/>} />
              <Route path="/signup" element={<Signup /> } />
              <Route path="/login" element={<Login /> } />
            </Routes>
            )
        } 
        
      </div>
    </Router>
  )
}

export default App