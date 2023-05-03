import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {BsXCircle, BsPencil} from 'react-icons/bs'

const Bug = ( {bug, deleteBug, id} ) => {

  const [isHover, setIsHover] = useState(false);
  const borderColor = bug.completed ? 'green' : 'white';

  function handleMouseEnter(){
    setIsHover(true);
  }

  function handleMouseLeave(){
    setIsHover(false);
  }

  function bugOnClick(){
    window.location.href= "/viewbug/" + id;
  }

  return (
    <Card className='my-3 mx-3'style=
    {{flexDirection:'row',
      maxWidth:'35em',
      backgroundImage: 'linear-gradient(#4717f698, #4717F6)',
      color:'#fff'}}>

      <Card key={id} style=
        {{border: (bug.completed ? '2px solid ' : '2px dotted ') + borderColor,
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

        <Card onClick={bugOnClick} 
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}
              style=
        {{border: (isHover ? '3px solid ' : '2px solid ') + borderColor,
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

export default Bug