import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Rnd } from 'react-rnd';
import 'react-toastify/dist/ReactToastify.css';
import Tagasi from '../components/Tagasi';
import '../Kujundus.css';

type Device = {
    id: string;
    name: string;
};

type RoomControlProps = {
    roomId: string;
    devices: Device[];
    isDraggable: boolean;
    isClickable: boolean;
};

function RoomControl({ roomId, devices, isDraggable, isClickable }: RoomControlProps) {
    const [deviceStates, setDeviceStates] = useState<{ [key: string]: boolean }>(() => {
        const initialStates: { [key: string]: boolean } = {};
        devices.forEach((device) => {
            initialStates[device.id] = JSON.parse(localStorage.getItem(`${roomId}_${device.id}`) || 'false');
        });
        return initialStates;
    });

        const [buttonPositions, setButtonPositions] = useState<{ [key: string]: { x: number; y: number; width: number; height: number } }>(() => {
        const initialPositions: { [key: string]: { x: number; y: number; width: number; height: number } } = {};
        devices.forEach((device) => {
            const savedPosition = JSON.parse(localStorage.getItem(`${roomId}_${device.id}_position`) || '{}');
            initialPositions[device.id] = {
                x: savedPosition.x || 50,
                y: savedPosition.y || 50,
                width: savedPosition.width || 150,
                height: savedPosition.height || 50,
            };
        });
        return initialPositions;
    });

    useEffect(() => {
        Object.keys(buttonPositions).forEach((deviceId) => {
        localStorage.setItem(`${roomId}_${deviceId}`, JSON.stringify(buttonPositions[deviceId]));
    });
    }, [buttonPositions, roomId]);

    const handleDeviceToggle = (deviceId: string, deviceName: string, turnOn: boolean) => {
        if (deviceStates[deviceId] !== turnOn) {
            setDeviceStates((prevState) => ({
                ...prevState,
                [deviceId]: turnOn,
            }));
            toast[turnOn ? 'success' : 'info'](`${deviceName} turned ${turnOn ? 'ON' : 'OFF'} in ${roomId}`);
        }
    };

    return (
        <>
        <div id="header">
        <h1>Seadmete juhtimine</h1>
        </div>
        <div id="roomName">{roomId}</div>
        <div id="controlPanel">
            {devices.map((device) => (
            <Rnd
            key={device.id}
            size={{
                width: buttonPositions[device.id].width,
                height: buttonPositions[device.id].height,
            }}
            position={{
                x: buttonPositions[device.id].x,
                y: buttonPositions[device.id].y,
            }}
            enableResizing={isDraggable} // Allow resizing only if isDraggable is true
            disableDragging={!isDraggable} // Disable dragging if isDraggable is false
            onDragStop={(e, d) => {
                if (isDraggable) {
                setButtonPositions((prevState) => ({
                    ...prevState,
                    [device.id]: {
                    ...prevState[device.id],
                    x: d.x,
                    y: d.y,
                    },
                }));
                }
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
                if (isDraggable) {
                setButtonPositions((prevState) => ({
                    ...prevState,
                    [device.id]: {
                    x: position.x,
                    y: position.y,
                    width: parseInt(ref.style.width),
                    height: parseInt(ref.style.height),
                    },
                }));
                }
            }}
            bounds="parent"
            >
            <div
                className="deviceControl"
                style={{
                width: '100%',
                height: '100%',
                pointerEvents: isClickable ? 'auto' : 'none', // Disable clicks if isClickable is false
                }}
            >
                <span
                className={deviceStates[device.id] ? 'indicator indicator-on' : 'indicator'}
                ></span>
                <button
                onClick={() => isClickable && handleDeviceToggle(device.id, device.name, true)}
                className="controlButton"
                >
                {device.name} Sisse
                </button>
                <button
                onClick={() => isClickable && handleDeviceToggle(device.id, device.name, false)}
                className="controlButton"
                >
                {device.name} Välja
                </button>
            </div>
            </Rnd>
                ))}
            </div>
            <ToastContainer />
        </>
    );
}

export function Kujundus_A001(isDraggable, isClickable) {
    const devices = [
        { id: 'lights', name: 'Tuled'},
        { id: 'screen', name: 'Ekraan' },
        { id: 'projector', name: 'Projektor' },
    ];
    return <RoomControl roomId="A-001" devices={devices} isDraggable={isDraggable} isClickable={isClickable} />;
}

export function Kujundus_A002(isDraggable, isClickable) {
    const devices = [
        { id: 'lights', name: 'Tuled' },
        { id: 'screen', name: 'Ekraan' },
    ];
    return <RoomControl roomId="A-002" devices={devices} isDraggable={isDraggable} isClickable={isClickable} />;
}

export function Kujundus_A003(isDraggable,isClickable) {
    const devices = [
        { id: 'lights', name: 'Tuled' },
        { id: 'projector', name: 'Projektor' },
    ];
    return <RoomControl roomId="A-003" devices={devices} isDraggable={isDraggable} isClickable={isClickable} />;
}