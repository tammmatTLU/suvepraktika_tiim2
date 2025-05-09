import React from 'react'
import { useParams } from 'react-router-dom'
import { Kujundus_A001, Kujundus_A002, Kujundus_A003 } from '../components/Kujundus';
import Tagasi from '../components/Tagasi';

function RuumiRedigeerimine() {

    const {room} = useParams<{ room?: string }>();
    
        const componentMap: { [key: string]: React.ElementType } = {
            "A-001": Kujundus_A001,
            "A-002": Kujundus_A002,
            "A-003": Kujundus_A003
        };
    
        // Dynamically select the component
        const SelectedComponent = room && componentMap[room] ? componentMap[room] : () => <p>Room not found</p>;


  return (
    <>
    <Tagasi/>
    <SelectedComponent isDraggable={true} isClickable={false}/>
    </>
  )
}

export default RuumiRedigeerimine