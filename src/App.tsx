import './App.css'
import { Button, Nav, Navbar } from 'react-bootstrap'
import { Bug } from 'react-bootstrap-icons' 
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom"
import { useLogout } from './hooks/useLogout'
import { useAuthContext } from './hooks/useAuthContext'
import { useHomeContext } from './hooks/useHomeContext'
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
  const home = useHomeContext();
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
                <Link to="/BugSquish/" className="nav-link white-text">Home</Link>
                
                {user && (
                  <Link to="/BugSquish/createbug" className="nav-link white-text">Create Bug Ticket</Link>
                )}

                {user && (
                  <Link to="/BugSquish/projects" className="nav-link white-text">My Projects</Link>
                )}

                {user && (
                  <Link to="/BugSquish/createproject" className="nav-link white-text">Create Project</Link>
                )}

                {user && (
                  <Link to="/BugSquish/inviteuser" className="nav-link white-text">Invite user</Link>
                )}

                {!user && (
                  <>
                    <Link to="/BugSquish/login" className="nav-link white-text">Login</Link>
                    <Link to="/BugSquish/signup" className="nav-link white-text">Sign up</Link>
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
                <Route path="/BugSquish" element={user ? <BugList /> : <Navigate to="/BugSquish/login"/>} />
                <Route path="/BugSquish/createbug" element={<CreateBug /> } />
                <Route path="/BugSquish/edit/:id" element={<EditBug />} />
                <Route path="/BugSquish/viewbug/:id" element={<ViewBug />} />
                <Route path="/BugSquish/projects" element={<ProjectList />} />
                <Route path="/BugSquish/createproject/" element={<CreateProject />} />
                <Route path="/BugSquish/viewproject/:project_id" element={<ViewProject />} />
                <Route path="/BugSquish/editproject/:id" element={<EditProject />} />
                <Route path="/BugSquish/inviteuser/" element={<InviteUser />} />
                <Route path="/BugSquish/acceptinvite/:id" element={<AcceptInvite />} />

                <Route path="/BugSquish/signup" element={ <Signup /> } />
                <Route path="/BugSquish/login" element={ <Login /> } />

              </Routes>
            ) 
            : (
              <Routes>
                <Route path="/BugSquish" element={ <Navigate to="/BugSquish/login"/>} />
                <Route path="/BugSquish/signup" element={<Signup /> } />
                <Route path="/BugSquish/login" element={<Login /> } />
                <Route path="/BugSquish/acceptinvite/:id" element={<AcceptInvite />} />
              </Routes>
              )
          } 
          
        </div>
      </Router>
  )
}

export default App