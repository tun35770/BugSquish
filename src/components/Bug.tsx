import { useState } from 'react'
import { Card, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {BsXCircle, BsPencil, BsEye} from 'react-icons/bs'
import { useAuthContext } from '../hooks/useAuthContext'

const Bug = ( {bug, deleteBug} ) => {

  const { user } = useAuthContext();

  const getStatusColor = () => {
    switch (bug.status) {
      case "open": return '#90ee90';
      case "closed": return '#ee9090';
      case "in progress": return '#eeee90'
    }
  }

  return (
    <ListGroupItem className='my-0 light-text blue-gradient' style=
      {{display: 'flex',
        flexDirection:'row',
        width:'100%',
        minHeight: '100px',
        margin: '0',
        border: '1px solid #fff'
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
            <div style={{
              display:'flex',
              flexDirection:'column',
              justifyContent:'space-between',
              height: '100%'
            }}>
              {bug.title} 
              <p style={{color:getStatusColor(), fontSize:'1.1em', margin:'0'}}> {bug.status} </p>
            </div>
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

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start'
            }}>
              {bug.username === user.username && 
                <a onClick={() => {deleteBug(bug["_id"], bug.project_id)}}> <BsXCircle style={{cursor: 'pointer', color:'red'}} /> </a>
              }
              
              <Link to={"/viewbug/" + bug["_id"]} style={{color: 'white'}}> <BsEye /> </Link>

              {bug.username === user.username && 
                <Link to={"/edit/" + bug["_id"]} style={{color:'gold'}}> <BsPencil /> </Link>
              }
            </div>
          </div>
        </Card.Body>
      </Card>

    </ListGroupItem>
  )
}

export default Bug