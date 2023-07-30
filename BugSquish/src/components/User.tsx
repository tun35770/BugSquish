import { Card, ListGroupItem } from 'react-bootstrap';

interface props {
    username: string;
    email: string;
    id: string;
}

export const User = ( {username, email, id}: props ) => {


  return (
    <ListGroupItem className='my-0 light-text blue-gradient' style=
    {{display: 'flex',
      flexDirection:'row',
      width:'100%',
      }}>

        <Card className='light-text' key={id} style=
            {{display: 'flex',
            flexDirection: 'row',
            width: '100%',
            textAlign:'left', 
            backgroundImage: 'linear-gradient(#2962FF , #6088f4)'
            }}>

            <Card.Body className='light-text' style={{
                fontSize: '0.75em',
                display:'flex',
                flexDirection: 'row',
                padding: '0.5em',
                width:'100%'
            }}>
                <div className='light-text' style={{
                    textAlign: 'center',
                    borderRight: '1px solid white',
                    padding: '0 0.5em 0 0.5em',
                    marginLeft: '0',
                    width:'50%'
                }}>

                    <Card.Text>
                        {username}
                    </Card.Text>

                </div>


                <div className='light-text' style={{
                    textAlign: 'center',
                    padding: '0 0.5em 0 0.5em',
                    marginLeft: '0',
                    width:'50%'
                }}>

                <Card.Text>
                    {email}
                </Card.Text>

                </div>
            </Card.Body>
        </Card>
    </ListGroupItem>
  )
}
