import { useState } from 'react'
import { Card, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {BsXCircle, BsPencil, BsEye} from 'react-icons/bs'

const Bug = ( {bug, deleteBug} ) => {

  return (
    <ListGroupItem className='my-0 light-text blue-gradient' style=
      {{display: 'flex',
        flexDirection:'row',
        width:'100%',
        margin: '0',
        border: (bug.completed ? '3px solid #60ee90' : '1px solid #fff')
      }}>

      <Card className='light-text' key={bug["_id"]} style=
        {{display: 'flex',
          flexDirection: 'row',
          width: '100%',
          textAlign:'left', 
          backgroundImage: 'linear-gradient(#2962FF , #6088f4)'
        }}>
        <Card.Body className='light-text' style={{
          display:'flex',
          flexDirection: 'row',
          padding: '0.5em',
          width:'100%'
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
                minWidth:'33%'
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
                minWidth:'33%'
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
                minWidth:'33%'
              }}>

              <Card.Text>
                <b>{new Date(bug.date).toLocaleString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric", hour:"2-digit", minute:"2-digit"})} </b>
              </Card.Text>

            </div>
          </Card.Body>
          
          <div style={{
            display:'flex', 
            flexFlow:'wrap',
            flexDirection:'column',
            justifyContent: 'space-evenly',
            padding: '0 0.5em', 
            textAlign:'right'}} >

            <a onClick={() => {deleteBug(bug["_id"], bug.project_id)}}> <BsXCircle style={{cursor: 'pointer', color:'red'}} /> </a>
            <Link to={"/BugSquish/viewbug/" + bug["_id"]} style={{color: 'white'}}> <BsEye /> </Link>
            <Link to={"/BugSquish/edit/" + bug["_id"]} style={{color:'gold'}}> <BsPencil /> </Link>
         
          </div>
        </Card.Body>
      </Card>

    </ListGroupItem>
  )
}

export default Bug