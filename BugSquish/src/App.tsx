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
        <Navbar bg="dark" variant="dark" expand="lg">
        
          <Navbar.Brand className="mx-3" href="#home">
            <Bug />
            BugSquish
          </Navbar.Brand>

          <Navbar.Toggle className="mx-2" aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
            <Nav className="me-3">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/create" className="mx-2">Create Bug Ticket</Link>
              <Link to="user" className="mx-2">Create User</Link>
              <Link to="" className="mx-2">Create New Ticket</Link>
              <Link to="" className="mx-2">View my Tickets</Link>
            </Nav>
          </Navbar.Collapse>
        
        </Navbar> 

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bugs" element={<BugList />} />
          <Route path="/edit/:id" element={<EditBug />} />
          <Route path="/create" element={<CreateBug />} />
          <Route path="/user" element={<CreateUser />} />
        </Routes>
      
      </div>
    </Router>
  )
}

export default App