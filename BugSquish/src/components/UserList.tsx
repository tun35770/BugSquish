import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
import { User } from './User';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

interface UserType {
    username: string;
    email: string;
}

export const UserList = ( {project_id} ) => {

    const { user } = useAuthContext();
    const [users, setUsers] = useState([]);

    const [sortBy, setSortBy] = useState('username');
    const [sortAscending, setSortAscending] = useState(true);
    const sortables = ['username', 'email'];

    const [error, setError] = useState<string | undefined>(undefined);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if(!user){
            return;
        }

        fetch('http://localhost:5000/projects/users/' + project_id, {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    'Authorization': `Bearer ${user.token}`
                }
            })
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                //console.log(data);
            })
            .catch((err) => setError(err));

            setIsLoaded(true);

    }, [user])

    //sorting hook
    useEffect(() => {
        const sortedUsers = [...users];
        sortedUsers.sort((a, b) => {

            //sorting for string attributes (any that isn't Date)
            if(sortAscending){
                return ((a[sortBy] as string).localeCompare(b[sortBy]));
            }
            else {
                return ((b[sortBy] as string).localeCompare(a[sortBy]));
            }
        
        })

        setUsers(sortedUsers);
    }, [sortBy, sortAscending]);

    function userList(){
        return users.map((currentUser: UserType) => {
            return <User username={currentUser.username} email={currentUser.email} key={currentUser["user_id"]} id={currentUser["_id"]} />
        });
    }

    //attr is attribute of each Bug to sort by (title, project, username, date)
    function sortByAttr(attr: string) {
        if(!sortables.includes(attr)) {
            return;
        }


        if(attr !== sortBy){
            //Sort by new column, make it sorted in ascending order
            setSortAscending(true); 
        }
        else{
            //same column clicked, so swap the order
            setSortAscending(!sortAscending);
        }

        setSortBy(attr);
    }

    return (
        <>
        {isLoaded && 
            <div style={{
                display:'flex',
                flexDirection:'column',
                padding:'0',
                width:'35%',
                minWidth:'350px',
                margin:'0 1em 0 1em',
            }}>
                <h1 className='dark-text' style={{
                    marginTop: '0.5em',
                    fontFamily: 'Montserrat',
                }}> Users </h1>

                <ListGroup>

                    <ListGroupItem style={{
                        display: 'flex',
                        flexDirection: 'row',
                        margin: '0',
                        justifyContent: 'space-between',
                        width:'100%',
                        
                    }}>
                        <h5 id="username" style={{width:'50%', cursor:'pointer', userSelect: 'none'}} onClick={() => sortByAttr('username')}> Username </h5>
                        <h5 id="email" style={{width:'50%', paddingRight:'1.5em', cursor:'pointer', userSelect: 'none'}} onClick={() => sortByAttr('email')}> Email </h5>
                    </ListGroupItem>
                    {userList()}
                </ListGroup>`
            </div>
        }
        </>
    )
}
