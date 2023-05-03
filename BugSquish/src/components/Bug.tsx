import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {BsXCircle, BsPencil} from 'react-icons/bs'

const Bug = ( {bug, deleteBug, id} ) => {
  return (
      <Card key={id} className='my-3 mx-3' style=
      {{border:'2px dotted white', 
        textAlign:'left', 
        maxWidth:'35em',
        backgroundImage: 'linear-gradient(#4717f698, #4717F6)',
        color:'#fff'}}>
        <Card.Body>
          <Card.Body style=
            {{display:'flex', 
              justifyContent:'space-between',
              padding:'0'}}>
            <Card.Title>
              {bug.title}
            </Card.Title>
            <div style={{display:'flex', gap:'1em', textAlign:'right'}} >
              <Link to={"/edit/" + id} style={{color:'gold'}}><BsPencil /></Link>
              <a href="/" onClick={() => {deleteBug(id)}}><BsXCircle style={{color:'red'}} /></a>
            </div>
          </Card.Body>
          <Card.Text>
            {bug.description}
          </Card.Text>

          <br/>
          
          <Card.Body style={{padding:'0', lineHeight:'1em'}}>
            <Card.Text>
              <b>Project: </b>{bug.project}
            </Card.Text>
            <Card.Text>
              <b>Submitted by: </b>{bug.username}
            </Card.Text>
            <Card.Text>
              <b>{new Date(bug.date).toLocaleString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric", hour:"2-digit", minute:"2-digit"})} </b>
            </Card.Text>
          </Card.Body>
          
        </Card.Body>
      </Card>
    )
}

export default Bug