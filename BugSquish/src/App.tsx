import { useState } from 'react'
import './App.css'
import Home from './components/Home.tsx'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Bug } from 'react-bootstrap-icons' 
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
      
        <Navbar.Brand className="mx-3" href="#home">
          <Bug />
          BugSquish
        </Navbar.Brand>
        <Navbar.Toggle className="mx-3" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav className="me-3">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#login">Login</Nav.Link>
            <Nav.Link href="#signup">Sign Up</Nav.Link>
            <Nav.Link href="#newticket">Create New Ticket</Nav.Link>
            <Nav.Link href="#mytickets">View my Tickets</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      
      </Navbar>

      <Home />
    </div>
  )
}

export default App
