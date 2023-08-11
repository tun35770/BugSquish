import './App.css'
import { Button, Nav, Navbar } from 'react-bootstrap'
import { Bug } from 'react-bootstrap-icons' 
import 'bootstrap/dist/css/bootstrap.min.css'
import { HashRouter as Router, Route, Routes, Link, Navigate, useNavigate } from "react-router-dom"
import { useLogout } from './hooks/useLogout'
import { useAuthContext } from './hooks/useAuthContext'
import BugList from './components/BugList'
import CreateBug from './components/CreateBug'
import EditBug from './components/EditBug'
import ViewBug from './components/ViewBug'
import Signup from './components/Signup'
import Login from './components/Login'
import CreateProject from './components/CreateProject'
import ViewProject from './components/ViewProject'
import ProjectList from './components/ProjectList'
import EditProject from './components/EditProject'
import InviteUser from './components/InviteUser'
import AcceptInvite from './components/AcceptInvite'

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
          
            <Navbar.Brand className="mx-3 title" href="/BugSquish/" style={{color:'#fff'}}>
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

                <Route path="/signup" element={ <Signup /> } />
                <Route path="/login" element={ <Login /> } />

              </Routes>
            ) 
            : (
              <Routes>
                <Route path="/" element={ <Navigate to="/login"/>} />
                <Route path="/signup" element={<Signup /> } />
                <Route path="/login" element={<Login /> } />
                <Route path="/acceptinvite/:id" element={<AcceptInvite />} />
              </Routes>
              )
          } 
          
        </div>
      </Router>
  )
}

export default App