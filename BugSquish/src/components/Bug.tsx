import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Bug = ( {bug, deleteBug, id} ) => {
  return (
      <Card key={id} className='my-3 mx-5' style=
      {{border:'2px dotted white', 
        textAlign:'left', 
        maxWidth:'35em',
        backgroundImage: 'linear-gradient(to left top, #4D4855, #000)',
        color:'#fff'}}>
        <Card.Body>
          <Card.Title>
            {bug.title}
          </Card.Title>

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
          <Card.Text>
              <b>ID: </b>{id}
            </Card.Text>
          <Link to={"/edit/" + id}>edit</Link> | <a href="/" onClick={() => {deleteBug(id)}}>delete</a>
        </Card.Body>
      </Card>
    )
}

export default Bug