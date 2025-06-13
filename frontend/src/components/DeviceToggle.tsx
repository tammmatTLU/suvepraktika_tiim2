import '../App.css'
import { useAppDispatch } from '../store/hooks';
import { updateElementState } from '../store/slices/buttonElementsSlice';
//import { useState } from 'react';
import type { ButtonElement } from '../types/Element';

type DeviceToggleProps = {
    key: number;
    parameters: ButtonElement;
}

export default function DeviceToggle(element: DeviceToggleProps){
    //const [deviceState, setDeviceState] = useState(false);
    const dispatch = useAppDispatch();

    const handleDeviceToggle = (newState: boolean) => {
        //setDeviceState(turnOn);
        dispatch(updateElementState({ id: element.parameters.id, state: newState}));
    };

    return (
        <div
        key={element.parameters.id}
        className="device-toggle"
        style={{
            left: element.parameters.position.x,
            top: element.parameters.position.y,
            width: element.parameters.size.width,
            height: element.parameters.size.height,
            fontSize: element.parameters.fontSize,
            fontFamily: element.parameters.fontFamily,
            color: element.parameters.color,
        }}
        >
            <span
                className= "device-name"
            >
                {element.parameters.name}
            </span>
            <button
                onClick={() => handleDeviceToggle(true)}
                className="btn-grad"
                style={{
                    fontSize: element.parameters.fontSize,
                    fontFamily: element.parameters.fontFamily,
                    color: element.parameters.color,
                    backgroundColor: element.parameters.backgroundColor
                }}
            >
                <span
                className={element.parameters.state.on ? 'indicator indicator-on' : 'indicator'}
                />
                ON
            </button>
            <button
                onClick={() => handleDeviceToggle(false)}
                className="btn-grad"
                style={{
                    fontSize: element.parameters.fontSize,
                    fontFamily: element.parameters.fontFamily,
                    color: element.parameters.color,
                    backgroundColor: element.parameters.backgroundColor
                }}
            >
                OFF
            </button>
        </div>
    );
}