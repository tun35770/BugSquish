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
          console.log(data);
          setBugs(data);
        })
        .catch((err) => console.log(err))
  }, [])

  return (
    <div>
      {bugs.map((bug, idx) => {
        return (
          <Card key={idx} className='my-3 mx-5' style={{border:'2px solid lightblue'}}>
            <Card.Body>
              <Card.Title>
                {bug.title}
              </Card.Title>

              <Card.Text>
                {bug.description}
              </Card.Text>
              <Card.Text>
                {bug.project}
              </Card.Text>
              <Card.Text>
                {bug.username}
              </Card.Text>
              <Card.Text>
                {bug.date.toString()}
              </Card.Text>
            </Card.Body>
          </Card>
        )
      })}
    </div>
  )
}

export default BugList