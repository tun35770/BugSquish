import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';

const BugList = () => {
  class Bug {
    username: string;
    title: string;
    description: string;
    project: string;
    date: Date;

    constructor(username:string, title:string, description:string, project:string, date:Date){
        this.username = username;
        this.title = title;
        this.description = description;
        this.project = project;
        this.date = date;
    }
  }

  const [bugs, setBugs] = useState<Bug[]>([]);

  /*
    TODO: Implement localStorage for bugs.
  */
  useEffect(() => {
    fetch('http://localhost:5000/bugs', {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            }
        })
        .then((res) => res.json())
        .then((data) => {
          //console.log(data);
          setBugs(data);
        })
        .catch((err) => console.log(err))
  }, [])

  return (
    <div>
      {bugs.map((bug, idx) => {
        return (
          <Card key={idx} className='my-3 mx-5' style=
          {{border:'2px dotted white', 
            textAlign:'left', 
            maxWidth:'35em',
            backgroundImage: 'linear-gradient(to left, #3020a0aa, 35%, #000)',
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
            </Card.Body>
          </Card>
        )
      })}
    </div>
  )
}

export default BugList