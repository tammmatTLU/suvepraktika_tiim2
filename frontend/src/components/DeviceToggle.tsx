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
        className="device-toggle"
        >
        <span
            className= "device-name"
        >
            {device.name}
        </span>
        <button
            onClick={() => handleDeviceToggle(true)}
            className="btn-grad"
        >
            <span
            className={deviceState ? 'indicator indicator-on' : 'indicator'}
            />
            ON
        </button>
        <button
            onClick={() => handleDeviceToggle(false)}
            className="btn-grad"
        >
            OFF
        </button>
        </div>
    );
}