import { useAppSelector } from '../store/hooks';
import { useParams } from 'react-router-dom';
import type { SpanElement, ButtonElement } from '../types/Element';

export default function SaveButton (){
    const { userName: userName = 'A-001' } = useParams<{ userName?: string }>();

    // 1. Get all button elements from Redux
    const buttonElements = useAppSelector(state => state.undoableRoot.present.buttonElements.elements);
    const buttonArray = Object.values(buttonElements);
    
    // 1. Get all button elements from Redux
    const spanElements = useAppSelector(state => state.undoableRoot.present.spanElements.elements);
    const spanArray = Object.values(spanElements);

    return(
        <button
        onClick={() => {
            saveAllButtons(userName, buttonArray);
            saveAllSpans(userName, spanArray);
        }}
        className="save-btn toolbar-button"
        >
            Salvesta
        </button>
    )
}

function saveAllButtons(userName: string, buttonArray: ButtonElement[]){


  // 2. Send them as a batch to the backend
  fetch(`http://localhost:3006/api/user/${userName}/button-instances/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ buttons: buttonArray }),
  })
    .then(res => {
      if (!res.ok){
        console.log(res);
        throw new Error('Failed to save buttons');
      }
      return res.json();
    })
    .then(data => {
      console.log('Saved:', data);
    })
    .catch(err => {
      console.error('Error saving buttons:', err);
    });
}


function saveAllSpans(userName: string, spanArray: SpanElement[]){


  // 2. Send them as a batch to the backend
  fetch(`http://localhost:3006/api/user/${userName}/redux-span/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userName, spans: spanArray }),
  })
    .then(res => {
      if (!res.ok){
        console.log(res);
        throw new Error('Failed to save spans');
      }
      return res.json();
    })
    .then(data => {
      console.log('Saved:', data);
    })
    .catch(err => {
      console.error('Error saving spans:', err);
    });
}