import React, { useEffect, useState } from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import Bug from './Bug';
import { useAuthContext } from '../hooks/useAuthContext';
import { BsCheckLg } from 'react-icons/bs'
import Loading from './Loading';

interface props {
  project_id?: string | undefined
}

const BugList = ( {project_id}: props ) => {
  class BugType {
    _id: string;
    username: string;
    title: string;
    description: string;
    project: string;
    project_id: string;
    date: Date;
    completed: boolean;

    constructor(id:string, username:string, title:string, description:string, project:string, project_id: string, date:Date, completed = false){
        this._id = id;
        this.username = username;
        this.title = title;
        this.description = description;
        this.project = project;
        this.project_id = project_id;
        this.date = date;
        this.completed = completed;
    }
  }

  const { user } = useAuthContext();

  const [bugs, setBugs] = useState<BugType[]>([]);
  const [bugsDisplayed, setBugsDisplayed] = useState<BugType[]>([]);
  const [bugsLength, setBugsLength] = useState(0);

  const [sortBy, setSortBy] = useState('date');
  const [sortAscending, setSortAscending] = useState(true);
  const sortables = ['title', 'project', 'username', 'date'];

  const [hideCompleted, setHideCompleted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  /*
    TODO: Implement localStorage for bugs.
  */
  useEffect(() => {
    
    if(!user){
      return;
    }

    const data = {
      user: user
    }

    const fetchBugs = async () => {
      let fetchBugs: any;

      if(project_id === undefined){
        fetchBugs = fetch('https://bugsquish.org/bugs', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
          .then((data) => {
              setBugs(data);
              setBugsLength(data.length);
              //console.log(data);
              setIsLoaded(true);
          })
          .catch((err) => console.log(err));
      }

      //specific project
      else {
        fetchBugs = fetch('https://bugsquish.org/bugs/byproject/' + project_id, {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    'Authorization': `Bearer ${user.token}`
                },
            })
            .then((res) => res.json())
            .then((data) => {
                setBugs(data);
                setBugsLength(data.length);
                //console.log(data);
                setIsLoaded(true);
            })
            .catch((err) => console.log(err));
      }
    }

    if(user) {
      fetchBugs();
    }

    else {
      console.log('Not logged in.');
    }
  }, [user])


  //sorting hook
  useEffect(() => {
    const sortedBugs = [...bugs];
    sortedBugs.sort((a, b) => {
      if(sortBy === 'date'){
        if(sortAscending)
          return (a[sortBy] < b[sortBy] ? -1 : 1);
        else
          return (a[sortBy] > b[sortBy] ? -1 : 1);
      }

      else{
        //sorting for string attributes (any that isn't Date)
        if(sortAscending){
          return (a[sortBy].localeCompare(b[sortBy]));
        }
        else {
          return (b[sortBy].localeCompare(a[sortBy]));
        }
      }
      
    })

    setBugs(sortedBugs);
  }, [sortBy, sortAscending]);

  useEffect(() => {
    //if bugs is updated, bugsDisplayed may need to reflect change(s)
    setBugsDisplayed([...bugs]);
    //then filter only non-compelted bugs if required
    if(hideCompleted){
      let newBugsDisplayed = [...bugs];
      newBugsDisplayed = newBugsDisplayed.filter((thisBug) => !thisBug.completed)
      setBugsDisplayed(newBugsDisplayed);
    }
  }, [bugs, hideCompleted])

  function deleteBug(id:string, bug_project_id:string){

    if(!user){
      return;
    }

    const data = {
      user: user,
      project_id: bug_project_id
    }

    /**
     * TODO: Figure out why this throws an error when on main page, but not on
     *       ViewProject page. 
     *       Still deletes bug despite error thrown.
     */
    fetch('https://bugsquish.org/bugs/' + id, {
            method: 'delete',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((data) => {
          //console.log(data);
          const newBugs = [...bugs].filter((bug: BugType) => bug._id !== id)
          setBugs(newBugs);
          setBugsLength(newBugs.length);
        })
        .catch((err) => console.error(err))
  }
  
  function bugList(){
    return bugsDisplayed.map((currentBug: BugType) => {
      return <Bug bug={currentBug} deleteBug={deleteBug} key={currentBug["_id"]}  />
    });
  }
  
  //attr is attribute of each Bug to sort by (title, project, username, date)
  function sortByAttr(attr: string) {
    if(!sortables.includes(attr)) {
      return;
    }


    if(attr !== sortBy){
      //Sort by new column, make it sorted in ascending order
      setSortAscending(true); 
    }
    else{
      //same column clicked, so swap the order
      setSortAscending(!sortAscending);
    }

    setSortBy(attr);
  }

  function toggleHideCompleted() {
    setHideCompleted(!hideCompleted);
  }

  return (
    <>
    {isLoaded && 
      <div className='buglist' style={{
        width:'60%',
        minWidth:'500px',
        margin: '0 auto',
      }}>
        { (bugsLength > 0) && 
          <>
            <div id="title-and-toggle" className = 'dark-text' style={{
              display:'flex',
              flexDirection:'row',
              justifyContent: 'flex-end',
              textAlign: 'right',
              width: '100%'
            }}>
              <h1 className='dark-text' style={{
                margin: '0.5em auto 0.25em 42%', //it works so dont touch.
                fontFamily: 'Montserrat',
              }}> Bugs </h1>

              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                
                fontSize: '1em'
              }} onClick={toggleHideCompleted}> 
                <div style={{
                  cursor: 'pointer',
                  margin: '3.25em 0.25em 0 auto', 
                  width: '1em', 
                  height: '1em',
                  border: '1px solid black'}} >  
                  { hideCompleted && <BsCheckLg style={{display:'block',margin:'auto'}} />}
                </div>
                <p style={{margin: '3em 0 0 auto'}}> Hide completed </p>
              </div>

            </div>

            <ListGroup style={{
              width: '100%'
            }}>

              <ListGroupItem style={{
                display: 'flex',
                flexDirection: 'row',
                margin: '0',
                justifyContent: 'space-between',
                width:'100%',
                
              }}>
                <div style={{width:'20%', cursor:'pointer', userSelect: 'none'}} onClick={() => sortByAttr('title')}>
                  <h5 id="bug_title"> Title </h5> 
                </div> 
                <div style={{width:'13.33%', paddingRight:'1.5em', cursor:'pointer', userSelect: 'none'}} onClick={() => sortByAttr('project')}>
                  <h5 id="project_title"> Project </h5>
                </div>
                <div style={{width:'13.33%', paddingLeft:'1.5em', cursor:'pointer', userSelect: 'none'}} onClick={() => sortByAttr('username')}>
                  <h5 id="username"> Username </h5>
                </div>
                <div style={{width:'13.33%', paddingLeft: '3em', cursor:'pointer', userSelect: 'none'}} onClick={() => sortByAttr('date')}>
                  <h5 id="date"> Date </h5>
                </div>
                <div style={{userSelect:'none'}}>
                  <h5 id="options" > Options </h5>
                </div>
              </ListGroupItem>
              {bugList()}
            </ListGroup>
            
          </>
        }

        { (bugsLength === 0) && 
          <>
            <br />
              <h3 className='dark-text' style={{
                  textAlign: 'left',
                  marginLeft: '1em', 
                  fontFamily: 'Montserrat'}}> Your bugs will be displayed here. </h3>
          </>
        }
      </div>
    }

    {!isLoaded && 
      <>
        <Loading />
      </>
    }

    </>
  )
}

export default BugList