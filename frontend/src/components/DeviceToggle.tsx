import '../App.css'
import { useState } from 'react';

export default function DeviceToggle(device: any){
    const [deviceState, setDeviceState] = useState(false);

    const handleDeviceToggle = (turnOn: boolean) => {
        setDeviceState(turnOn);
    };

    return (
        <div
        key={device.id}
        style={{
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '20%',
            height: '100%',
        }}
        >
        <span
            className={deviceState ? 'indicator indicator-on' : 'indicator'}
            style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            color: 'black',
            }}
        >
            {device.name}
        </span>
        <button
            onClick={() => handleDeviceToggle(true)}
            className="controlButton"
            style={{
            width: '100%',
            height: '30%',
            }}
        >
            ON
        </button>
        <button
            onClick={() => handleDeviceToggle(false)}
            className="controlButton"
            style={{
            width: '100%',
            height: '30%',
            }}
        >
            OFF
        </button>
        </div>
    );
}