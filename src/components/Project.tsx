import React, { useState } from 'react'
import { Card, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {BsXCircle, BsPencil, BsEye} from 'react-icons/bs'

const Project = ( {project, deleteProject, id, user} ) => {

  return (
    <ListGroupItem className='my-3 mx-3 light-text blue-gradient'style=
    {{flexDirection:'row',
      maxWidth:'35em'
      }}>

      <Card className='blue-gradient' key={id} style=
        {{width: '100%',
          textAlign:'left'
          }}>
          <Card.Body>
            <Card.Body style=
              {{display:'flex', 
                justifyContent:'space-between',
                padding:'0'}}>
              <Card.Title style={{fontSize: '1.5em', color:'#CCC'}}>
                {project.title} 
              </Card.Title>
              <div style={{display:'flex', gap:'1em', textAlign:'right'}} >
                <Link to={"/BugSquish/viewproject/" + project._id} style={{color: 'white'}}> <BsEye /> </Link>
                { user.username === project.username && 
                  <>
                    <Link to={"/BugSquish/editproject/" + id} style={{color:'gold'}}><BsPencil /></Link>
                    <a onClick={() => {deleteProject(id, user)}}><BsXCircle style={{cursor:'pointer',color:'red'}} /></a>
                  </>
                }
              </div>
            </Card.Body>
            
            <Card.Text className='light-text'>
              {project.description}
            </Card.Text>

            <br/>
            
            <Card.Body className='light-text' style={{padding:'0', lineHeight:'1em'}}>
              <Card.Text className='light-text'>
                <b>Owner: </b>{project.username}
              </Card.Text>
              
            </Card.Body>
            
          </Card.Body>
        </Card>
      </ListGroupItem>
    )
}

export default Project