import React, { useEffect, useState } from 'react'
import {Doughnut} from 'react-chartjs-2'
import { ArcElement } from 'chart.js'
import {Chart as ChartJS} from 'chart.js/auto'
import { useAuthContext } from '../hooks/useAuthContext';
import BugList from './BugList';

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
        priority: String;
    
        constructor(id:string, username:string, title:string, description:string, project:string, project_id: string, date:Date, status = 'open', priority: string){
            this._id = id;
            this.username = username;
            this.title = title;
            this.description = description;
            this.project = project;
            this.project_id = project_id;
            this.date = date;
            this.status = status;
            this.priority= priority;
        }
      }
    

    const { user } = useAuthContext();

    const [bugs, setBugs] = useState<BugType[]>([]);
    const [bugsLength, setBugsLength] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const [statusData, setStatusData] = useState({
        labels: ["Open", "In Progress", "Closed"],
        datasets: [{
            label: "Tickets",
            data: [0,0,0],
            backgroundColor: [
                'rgb(255, 205, 86)',
                'rgb(54, 162, 235)',
                'rgb(255, 99, 132)'
              ],
        }]
    })


    const [priorityData, setPriorityData] = useState({
        labels: ["Low", "Medium", "High"],
        datasets: [{
            label: "Tickets",
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

        const statusCounts = getStatusCounts();
        setStatusData({
            labels: ["Open", "In Progress", "Closed"],
            datasets: [{
                label: "Tickets",
                data: statusCounts,
                backgroundColor: [
                    '#ff6090',
                    'gold',
                    '#90ee90'
                  ],
            }]
        })

        const priorityCounts = getPriorityCounts();
        setPriorityData({
            labels: ["Low", "Medium", "High"],
            datasets: [{
                label: "Tickets",
                data: priorityCounts,
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
                case "Open": counts[0]++;
                    break;
                case "In Progress": counts[1]++;
                    break;
                case "Closed": counts[2]++;
                    break;
                default: break;
            }

        }
        return counts;
    }

    function getPriorityCounts() {
        const counts = [0,0,0] //open, in progress, closed
        for(let i = 0; i < bugsLength; i++){
            if(bugs[i].status === "Open"){
                switch(bugs[i].priority){
                    case "Low": counts[0]++;
                        break;
                    case "Medium": counts[1]++;
                        break;
                    case "High": counts[2]++;
                        break;
                    default: break;
                }
            }
        }
        return counts;
    }

  return (
    <>
        {isLoaded && 
            <div className="dashboard-container">

                <div className="charts-container">
                    <div className='chart-container'>
                            <h2> Tickets Status </h2>
                            <Doughnut data={statusData} />
                        
                    </div>
                

              
                    <div className='chart-container'>
                            <h2> Open Tickets Priorities </h2>
                            <Doughnut data={priorityData} />
                        
                    </div>
                </div>


                <div className='dashboard-buglist-container'>
                     <BugList />
                </div>
               
            </div>
        }
    </>
  )
}

export default Dashboard