import { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { BsCircleFill, BsCircle} from 'react-icons/bs'

const Loading = () => {

    const [stage, setStage] = useState(0);
    const [circles, setCircles] = useState([ <BsCircle key={0}/>, <BsCircle key={1}/>, <BsCircle key={2}/> ]);
    
    useEffect(() => {
        setTimeout(() => {
            //stage increments periodically to update loading icon
            let newStage = stage + 1;
            
            if(newStage > 2)
                newStage = 0;

            setStage(newStage);
            
        }, 200);

    }, [stage])

    useEffect(() => {
        updateLoading(stage);
    }, [stage])

    function updateLoading(numCircles: number){
        const newCircles = [ <BsCircle key={0}/>, <BsCircle key={1}/>, <BsCircle key={2}/> ];
        for(let i = 0; i <= numCircles; i++){
            newCircles[i] = <BsCircleFill key={i}/> ;
        }

        setCircles(newCircles);
    }

    return (
    <div style={{
        position: 'absolute',
        top:'50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display:'flex', 
        flexDirection:'column', 
        width: '10em',
        margin: '0 auto',
        backgroundColor: 'rbga(0,0,0,0)',
        border: 'none'}}>

        <div style={{
            display:'flex', 
            flexDirection:'row', 
            justifyContent: 'space-evenly',
            width: '100%',
            margin: '0 auto',
            backgroundColor: 'rbga(0,0,0,0)',
            border: 'none'}}>

            { circles }

        </div>
    </div>
    )
}

export default Loading