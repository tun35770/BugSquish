import { useState } from 'react'
import { Card, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {BsXCircle, BsPencil, BsEye} from 'react-icons/bs'

const Bug = ( {bug, deleteBug, id} ) => {

  return (
    <ListGroupItem className='my-0 light-text blue-gradient' style=
    {{display: 'flex',
      flexDirection:'row',
      width:'80%',
      margin: '0 auto',
      border: (bug.completed ? '3px solid #60ee90' : '1px solid #fff')
      }}>

      <Card className='light-text' key={id} style=
        {{display: 'flex',
          flexDirection: 'row',
          width: '100%',
          textAlign:'left', 
          backgroundImage: 'linear-gradient(#2962FF , #6088f4)'
          }}>
        <Card.Body className='light-text' style={{
          display:'flex',
          flexDirection: 'row',
          padding: '0.5em'
        }}>
          
          <Card.Title className='light-text' style=
          {{fontSize: '0.75em',
            color: '#CCC',
            width: '20%',
            marginBottom: '0',
            paddingRight: '0.5em',
            borderRight: '1px solid white'}}>
            {bug.title} {bug.completed && <p style={{color:'#90ee90'}}>(Completed)</p> }
          </Card.Title>

          <Card.Body style=
          {{display:'flex', 
            flexDirection: 'row',
            width:'40%',
            padding: '0',
            lineHeight:'1em',
            fontSize: '0.75em'}}>

            <div className='light-text' style={{
                textAlign: 'center',
                borderRight: '1px solid white',
                padding: '0 0.5em 0 0.5em',
                marginLeft: '0',
                width:'33%'
              }}>

              <Card.Text>
                {bug.project}
              </Card.Text>

            </div>


            <div className='light-text' style={{
                textAlign: 'center',
                borderRight: '1px solid white',
                padding: '0 0.5em 0 0.5em',
                marginLeft: '0',
                width:'33%'
              }}>

              <Card.Text>
                {bug.username}
              </Card.Text>

            </div>


            <div  className='light-text' style={{
                textAlign: 'center',  
                borderRight: '1px solid white',
                padding: '0 0.5em 0 0.5em',
                marginLeft: '0',
                width:'33%'
              }}>

              <Card.Text>
                <b>{new Date(bug.date).toLocaleString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric", hour:"2-digit", minute:"2-digit"})} </b>
              </Card.Text>

            </div>
          </Card.Body>
          
          <div style=
          {{display:'flex', 
            justifyContent: 'space-evenly',
            padding: '0 0.5em',
            gap:'1em', 
            textAlign:'right'}} >

            <Link to={"/viewbug/" + id} style={{color: 'white'}}> <BsEye /> </Link>
            <Link to={"/edit/" + id} style={{color:'gold'}}> <BsPencil /> </Link>
            <a href="/" onClick={() => {deleteBug(id, bug.project_id)}}> <BsXCircle style={{color:'red'}} /> </a>
         
          </div>
        </Card.Body>
      </Card>

    </ListGroupItem>
  )
}

export default Bug