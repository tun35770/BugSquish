import { useState } from 'react'
import './App.css'
import Home from './components/Home.tsx'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Bug } from 'react-bootstrap-icons' 
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import BugList from './components/BugList'
import CreateBug from './components/CreateBug'
import CreateUser from './components/CreateUser'
import EditBug from './components/EditBug'

function App() {

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
              <Link to="/user" className="nav-link white-text">Create User</Link>
            </Nav>
          </Navbar.Collapse>
        
        </Navbar> 

        <Routes>
          <Route path="/" element={<BugList />} />
          <Route path="/create" element={<CreateBug />} />
          <Route path="/edit/:id" element={<EditBug />} />
          <Route path="/user" element={<CreateUser />} />
        </Routes>
      
      </div>
    </Router>
  )
}

export default App