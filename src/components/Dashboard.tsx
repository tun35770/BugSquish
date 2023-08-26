import React, { useEffect, useState } from 'react'
import {Doughnut} from 'react-chartjs-2'
import { ArcElement } from 'chart.js'
import {Chart as ChartJS} from 'chart.js/auto'
import { useAuthContext } from '../hooks/useAuthContext';

const Dashboard = () => {

    class BugType {
        _id: string;
        username: string;
        title: string;
        description: string;
        project: string;
        project_id: string;
        date: Date;
        status: String;
    
        constructor(id:string, username:string, title:string, description:string, project:string, project_id: string, date:Date, status = 'open'){
            this._id = id;
            this.username = username;
            this.title = title;
            this.description = description;
            this.project = project;
            this.project_id = project_id;
            this.date = date;
            this.status = status;
        }
      }
    

    const { user } = useAuthContext();

    const [bugs, setBugs] = useState<BugType[]>([]);
    const [bugsLength, setBugsLength] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const [statusData, setStatusData] = useState({
        labels: ["open", "in progress", "closed"],
        datasets: [{
            label: "Tickets Status",
            data: [0,0,0],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
        }]
    })
    
    ChartJS.register(ArcElement)

    useEffect(() => {
        if(!user){
            return;
        }

        const data = {
            user: user
        }

        const fetchBugs = async () => {
            let fetchBugs: any;

            fetchBugs = fetch('https://bugsquish.org/bugs', {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(data)
            })
            .then((res) => res.json())
            .then((data) => {
                setBugs(data);
                setBugsLength(data.length);
                //console.log(data);
            })
            .catch((err) => console.log(err));
        }
      
        if(user) {
            fetchBugs();
        }
    
        else {
            console.log('Not logged in.');
        }
    }, [])

    useEffect(() => {

        const counts = getStatusCounts();
        setStatusData({
            labels: ["open", "in progress", "closed"],
            datasets: [{
                label: "Tickets Status",
                data: counts,
                backgroundColor: [
                    '#90ee90',
                    'gold',
                    '#ff6090'
                  ],
            }]
        })

        setIsLoaded(true);
    }, [bugs])

    function getStatusCounts() {
        const counts = [0,0,0] //open, in progress, closed
        for(let i = 0; i < bugsLength; i++){
            switch(bugs[i].status){
                case "open": counts[0]++;
                    break;
                case "in progress": counts[1]++;
                    break;
                case "closed": counts[2]++;
                    break;
                default: break;
            }

        }
        return counts;
    }

  return (
    <>
        {isLoaded && 
            <div className="dashboard-container">

                <h1 className='py-3'> My Dashboard </h1>
                <div className='chart-container'>
                    
                        <Doughnut data={statusData} />

                        
                    
                </div>
            </div>
        }
    </>
  )
}

export default Dashboard