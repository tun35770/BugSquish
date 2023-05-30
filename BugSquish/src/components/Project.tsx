import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {BsXCircle, BsPencil} from 'react-icons/bs'

const Project = ( {project, deleteProject, id} ) => {

  const [isHover, setIsHover] = useState(false);

  function handleMouseEnter(){
    setIsHover(true);
  }

  function handleMouseLeave(){
    setIsHover(false);
  }

  function projectOnClick(){
    window.location.href= "/viewproject/" + id;
  }

  return (
    <Card className='my-3 mx-3'style=
    {{flexDirection:'row',
      maxWidth:'35em',
      backgroundImage: 'linear-gradient(#4717f698, #4717F6)',
      color:'#fff'}}>

      <Card key={id} style=
        {{border: '2px solid white',
          borderRight: '0',
          borderRadius: '0',
          width: '90%',
          textAlign:'left', 
          backgroundImage: 'linear-gradient(#4717f698, #4717F6)',
          color:'#fff'}}>
          <Card.Body>
            <Card.Body style=
              {{display:'flex', 
                justifyContent:'space-between',
                padding:'0'}}>
              <Card.Title style={{fontSize: '1.5em'}}>
                {project.title} 
              </Card.Title>
              <div style={{display:'flex', gap:'1em', textAlign:'right'}} >
                <Link to={"/editproject/" + id} style={{color:'gold'}}><BsPencil /></Link>
                <a href="/" onClick={() => {deleteProject(id)}}><BsXCircle style={{color:'red'}} /></a>
              </div>
            </Card.Body>
            <Card.Text>
              {project.description}
            </Card.Text>

            <br/>
            
            <Card.Body style={{padding:'0', lineHeight:'1em'}}>
              <Card.Text>
                <b>Owner: </b>{project.username}
              </Card.Text>
              
            </Card.Body>
            
          </Card.Body>
        </Card>

        <Card onClick={projectOnClick} 
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}
              style=
        {{border: (isHover ? '3px solid white' : '2px solid white'),
          borderRadius: '0',
          width:'10%',
          justifyContent: 'center',
          cursor: (isHover ? 'pointer' : 'default'),
          backgroundImage: 'linear-gradient(#4717f698, #4717F6)',
          color:'#fff'
          }}>
           <b style={{fontSize: '1.5em'}}>{'>'}</b>
        </Card>
      </Card>
    )
}

export default Project