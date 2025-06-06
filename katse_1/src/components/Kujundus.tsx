import React, { useState, useEffect, useMemo } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tagasi from '../components/Tagasi';
import LogoutButton from '../components/Logout';
import { useParams } from 'react-router-dom';
import '../Kujundus.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { setDeviceState } from '../store/deviceStateSlice';
import { setPosition, setSize } from '../store/controlPanelSlice';
import { addDevice, removeDevice } from '../store/deviceListSlice';
import { setRoomColor } from '../store/roomColorsSlice';
import { Rnd } from 'react-rnd';
import Modal from 'react-modal';
import { ActionCreators } from 'redux-undo';

type Device = {
    id: string;
    name: string;
};

type RoomControlProps = {
    roomId: string;
    devices: Device[];
};

type ChangeColorProps = {
  roomId: string;
};

function Toolbar({ roomId }: { roomId: string }) {
  return (
    <>
      <AddDeviceButton roomId={roomId || 'default-room'} />
      <ChangeControlPanel roomId={roomId || 'default-room'} />
      <ChangeHeader roomId={roomId || 'default-room'} />
      <UndoButton />
    </>
  );
}

// UndoButton now works globally (for root reducer wrapped with undoable)
function UndoButton() {
  const dispatch = useDispatch();
  const handleUndo = () => {
    dispatch(ActionCreators.undo());
  };
  return (
    <button
      onClick={handleUndo}
      className="undo-button"
    >
      Undo
    </button>
  );
}

function ChangeControlPanel({ roomId }: ChangeColorProps) {
  const dispatch = useDispatch();
  const colors = useSelector((state: RootState) => state.undoableRoot.present.roomColors[roomId] || {});

  // Local state for color inputs
  const [controlPanelBackgroundColor, setControlPanelBackgroundColor] = useState(colors.controlPanelBackgroundColor || '#ffffff');
  const [controlPanelColor, setControlPanelColor] = useState(colors.controlPanelColor || '#000000');
  const [controlButtonBackgroundColor, setControlButtonBackgroundColor] = useState(colors.controlButtonBackgroundColor || '#ffffff');
  const [controlButtonColor, setControlButtonColor] = useState(colors.controlButtonColor || '#000000');

  // Keep local state in sync with Redux state
  useEffect(() => {
    setControlPanelBackgroundColor(colors.controlPanelBackgroundColor || '#ffffff');
    setControlPanelColor(colors.controlPanelColor || '#000000');
    setControlButtonBackgroundColor(colors.controlButtonBackgroundColor || '#ffffff');
    setControlButtonColor(colors.controlButtonColor || '#000000');
  }, [
    colors.controlPanelBackgroundColor,
    colors.controlPanelColor,
    colors.controlButtonBackgroundColor,
    colors.controlButtonColor
  ]);

  const handleCommit = (key, value: string) => {
    dispatch(setRoomColor({ roomId, key, value }));
  };

  return (
    <div className='toolbar-item-container'>
      <div className='toolbar-item'>
        <p>Muuda kontroll-paneeli taustavärvi</p>
        <input
          type="color"
          id="controlPanelBackgroundColor"
          value={controlPanelBackgroundColor}
          onChange={e => setControlPanelBackgroundColor(e.target.value)}
          onBlur={() => handleCommit('controlPanelBackgroundColor', controlPanelBackgroundColor)}
          onMouseUp={() => handleCommit('controlPanelBackgroundColor', controlPanelBackgroundColor)}
        />
      </div>
      <div className='toolbar-item'>
        <p>Muuda kontroll-paneeli teksti värvi</p>
        <input
          type="color"
          id="controlPanelColor"
          value={controlPanelColor}
          onChange={e => setControlPanelColor(e.target.value)}
          onBlur={() => handleCommit('controlPanelColor', controlPanelColor)}
          onMouseUp={() => handleCommit('controlPanelColor', controlPanelColor)}
        />
      </div>
      <div className='toolbar-item'>
        <p>Muuda nuppude taustavärvi</p>
        <input
          type="color"
          id="controlButtonBackgroundColor"
          value={controlButtonBackgroundColor}
          onChange={e => setControlButtonBackgroundColor(e.target.value)}
          onBlur={() => handleCommit('controlButtonBackgroundColor', controlButtonBackgroundColor)}
          onMouseUp={() => handleCommit('controlButtonBackgroundColor', controlButtonBackgroundColor)}
        />
      </div>
      <div className='toolbar-item'>
        <p>Muuda nuppude teksti värvi</p>
        <input
          type="color"
          id="controlButtonColor"
          value={controlButtonColor}
          onChange={e => setControlButtonColor(e.target.value)}
          onBlur={() => handleCommit('controlButtonColor', controlButtonColor)}
          onMouseUp={() => handleCommit('controlButtonColor', controlButtonColor)}
        />
      </div>
    </div>
  );
}

function ChangeHeader({ roomId }: ChangeColorProps) {
  const dispatch = useDispatch();
  const colors = useSelector((state: RootState) => state.undoableRoot.present.roomColors[roomId] || {});

  // Local state for color inputs
  const [headerBackgroundColor, setHeaderBackgroundColor] = useState(colors.headerBackgroundColor || '#ffffff');
  const [headerColor, setHeaderColor] = useState(colors.headerColor || '#000000');

  // Keep local state in sync with Redux state
  useEffect(() => {
    setHeaderBackgroundColor(colors.headerBackgroundColor || '#ffffff');
    setHeaderColor(colors.headerColor || '#000000');
  }, [colors.headerBackgroundColor, colors.headerColor]);

  const handleCommit = (key, value: string) => {
    dispatch(setRoomColor({ roomId, key, value }));
  };

  return (
    <div className='toolbar-item-container'>
      <div className='toolbar-item'>
        <p>Muuda päise taustavärvi</p>
        <input
          type="color"
          id="headerBackgroundColor"
          value={headerBackgroundColor}
          onChange={e => setHeaderBackgroundColor(e.target.value)}
          onBlur={e => handleCommit('headerBackgroundColor', headerBackgroundColor)}
          onMouseUp={e => handleCommit('headerBackgroundColor', headerBackgroundColor)}
        />
      </div>
      <div className='toolbar-item'>
        <p>Muuda päise teksti värvi</p>
        <input
          type="color"
          id="headerColor"
          value={headerColor}
          onChange={e => setHeaderColor(e.target.value)}
          onBlur={e => handleCommit('headerColor', headerColor)}
          onMouseUp={e => handleCommit('headerColor', headerColor)}
        />
      </div>
    </div>
  );
}

Modal.setAppElement('#root');

function AddDeviceButton({ roomId }: { roomId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deviceName, setDeviceName] = useState('');
  const dispatch = useDispatch();
  const modalRef = React.useRef<HTMLDivElement>(null);
  const addButtonRef = React.useRef<HTMLButtonElement>(null);

  const handleAddDevice = () => {
    if (!deviceName.trim()) {
      toast.error('Device name cannot be empty!');
      return;
    }

    const newDevice = {
      id: `device-${Date.now()}`,
      name: deviceName.trim(),
    };

    dispatch(addDevice({ roomId, device: newDevice }));
    toast.success(`Device "${deviceName}" added successfully!`);
    setDeviceName('');
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      modalRef.current?.focus();
    } else {
      addButtonRef.current?.focus();
    }
  }, [isModalOpen]);

  return (
    <>
      <button
        ref={addButtonRef}
        onClick={() => setIsModalOpen(true)}
        className="add-device-button"
        style={{
          fontSize: '20pt',
          fontFamily: 'var(--font-family)',
          color: 'var(--button-color)',
          backgroundColor: 'var(--button-background-color)',
        }}
      >
        Lisa seade
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Add Device"
        className="modal"
        overlayClassName="overlay"
        ariaHideApp={true}
      >
        <div ref={modalRef} tabIndex={-1}>
          <h2>Add New Device</h2>
          <input
            type="text"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            placeholder="Enter device name"
          />
          <button onClick={handleAddDevice}>Add</button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </div>
      </Modal>
    </>
  );
}

function RoomControl({ roomId, devices }: RoomControlProps) {
  const dispatch = useDispatch<AppDispatch>();

  // Use .present for all slices if root reducer is undoable
  const deviceStates = useSelector((state: RootState) => state.undoableRoot.present.deviceState[roomId] || {});
  const controlPanelPositions = useSelector(
    (state: RootState) => state.undoableRoot.present.controlPanel[roomId]
  );
  const memoizedPositions = useMemo(
    () => controlPanelPositions || {},
    [controlPanelPositions]
  );
  const controlPanelSizes = useSelector(
    (state: RootState) => state.undoableRoot.present.controlPanel[roomId]
  );
  const memoizedSizes = useMemo(
    () => controlPanelSizes || {},
    [controlPanelSizes]
  );
  const colors = useSelector((state: RootState) => state.undoableRoot.present.roomColors[roomId] || {});

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--control-panel-background-color',
      colors.controlPanelBackgroundColor || 'var(--default-control-panel-background-color)'
    );
    document.documentElement.style.setProperty(
      '--control-panel-color',
      colors.controlPanelColor || 'var(--default-control-panel-color)'
    );
    document.documentElement.style.setProperty(
      '--control-button-background-color',
      colors.controlButtonBackgroundColor || 'var(--default-button-background-color)'
    );
    document.documentElement.style.setProperty(
      '--control-button-color',
      colors.controlButtonColor || 'var(--default-button-color)'
    );
    document.documentElement.style.setProperty(
      '--header-background-color',
      colors.headerBackgroundColor || 'var(--default-header-background-color)'
    );
    document.documentElement.style.setProperty(
      '--header-color',
      colors.headerColor || 'var(--default-header-color)'
    );
  }, [colors]);

  const handleDeviceToggle = (deviceId: string, deviceName: string, turnOn: boolean) => {
    if (deviceStates[deviceId] !== turnOn) {
      dispatch(setDeviceState({ roomId, deviceId, state: turnOn }));
      toast[turnOn ? 'success' : 'info'](`${deviceName} turned ${turnOn ? 'ON' : 'OFF'} in ${roomId}`);
    }
  };

  return (
    <div id="roomControl">
      <div id="roomName">{roomId}</div>
      <div id="controlPanel">
        {devices.map((device) => {
          const position = memoizedPositions[device.id]?.position || { x: 0, y: 0 };
          const size = memoizedSizes[device.id]?.size || { width: 320, height: 420 };

          return (
            <div
              key={device.id}
              className="deviceControl"
              style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
                width: size.width,
                height: size.height,
              }}
            >
              <span
                className={deviceStates[device.id] ? 'indicator indicator-on' : 'indicator'}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                  color: 'black',
                  fontSize: `${Math.min(size.width, size.height) * 0.1}px`
                }}
              >
                {device.name}
              </span>
              <button
                onClick={() => handleDeviceToggle(device.id, device.name, true)}
                className="controlButton"
                style={{
                  width: '100%',
                  height: '30%',
                }}
              >
                ON
              </button>
              <button
                onClick={() => handleDeviceToggle(device.id, device.name, false)}
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
        })}
      </div>
    </div>
  );
}

function RoomEdit({ roomId, devices }: RoomControlProps) {
  const dispatch = useDispatch<AppDispatch>();
  const controlPanelPositions = useSelector(
    (state: RootState) => state.undoableRoot.present.controlPanel[roomId]
  );
  const memoizedPositions = useMemo(
    () => controlPanelPositions || {},
    [controlPanelPositions]
  );
  const controlPanelSizes = useSelector(
    (state: RootState) => state.undoableRoot.present.controlPanel[roomId]
  );
  const memoizedSizes = useMemo(
    () => controlPanelSizes || {},
    [controlPanelSizes]
  );
  const colors = useSelector((state: RootState) => state.undoableRoot.present.roomColors[roomId] || {});

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--control-panel-background-color',
      colors.controlPanelBackgroundColor || 'var(--default-control-panel-background-color)'
    );
    document.documentElement.style.setProperty(
      '--control-panel-color',
      colors.controlPanelColor || 'var(--default-control-panel-color)'
    );
    document.documentElement.style.setProperty(
      '--control-button-background-color',
      colors.controlButtonBackgroundColor || 'var(--default-button-background-color)'
    );
    document.documentElement.style.setProperty(
      '--control-button-color',
      colors.controlButtonColor || 'var(--default-button-color)'
    );
    document.documentElement.style.setProperty(
      '--header-background-color',
      colors.headerBackgroundColor || 'var(--default-header-background-color)'
    );
    document.documentElement.style.setProperty(
      '--header-color',
      colors.headerColor || 'var(--default-header-color)'
    );
  }, [colors]);

  const handleDragStop = (deviceId: string, x: number, y: number) => {
    dispatch(
      setPosition({
        roomId,
        deviceId,
        position: { x, y },
      })
    );
  };

  const handleResizeStop = (deviceId: string, width: number, height: number) => {
    dispatch(
      setSize({
        roomId,
        deviceId,
        size: { width, height },
      })
    );
  };

  const handleDeleteDevice = (deviceId: string, deviceName: string) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${deviceName}"?`
    );

    if (confirmDelete) {
      dispatch(removeDevice({ roomId, deviceId }));
      toast.success(`Device "${deviceName}" removed successfully!`);
    } else {
      toast.info(`Deletion of device "${deviceName}" was canceled.`);
    }
  };

  return (
    <div id="roomEdit">
      <div id="roomName">
        <span>{roomId}</span>
      </div>
      <div
        id="toolbar"
        style={{
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <Toolbar roomId={roomId || 'default-room'} />
      </div>
      <div
        id="controlPanel"
        style={{
          border: "2px solid white",
          backgroundColor: colors.controlPanelBackgroundColor,
          color: colors.controlPanelColor,
        }}
      >
        {devices.map((device) => {
          const position = memoizedPositions[device.id]?.position || { x: 0, y: 0 };
          const size = memoizedSizes[device.id]?.size || { width: 320, height: 420 };

          return (
            <Rnd
              key={device.id}
              position={{ x: position.x, y: position.y }}
              size={{ width: size.width, height: size.height }}
              bounds="#controlPanel"
              onDragStop={(e, data) => {
                handleDragStop(device.id, data.x, data.y);
              }}
              onResizeStop={(e, direction, ref, delta, position) => {
                handleResizeStop(device.id, ref.offsetWidth, ref.offsetHeight);
              }}
              enableResizing={true}
              style={{
                position: 'absolute',
                border: '2px dashed #ccc',
                cursor: 'move',
              }}
            >
              <div
                className="deviceControl"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              >
                <button
                  className="delete-device-button"
                  onClick={() => handleDeleteDevice(device.id, device.name)}
                  style={{
                    position: 'absolute',
                    top: '-54px',
                    right: '0',
                    zIndex: 10,
                  }}
                >
                  🗑
                </button>

                <span
                  className="indicator"
                  style={{
                    color: colors.controlPanelColor,
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: `${Math.min(size.width, size.height) * 0.1}px`
                  }}
                >
                  {device.name}
                </span>
                <button
                  className="controlButton"
                  style={{
                    backgroundColor: colors.controlButtonBackgroundColor,
                    color: colors.controlButtonColor,
                    width: '100%',
                    height: '30%',
                    cursor: 'not-allowed',
                  }}
                  disabled
                >
                  ON
                </button>
                <button
                  className="controlButton"
                  style={{
                    backgroundColor: colors.controlButtonBackgroundColor,
                    color: colors.controlButtonColor,
                    width: '100%',
                    height: '30%',
                    cursor: 'not-allowed',
                  }}
                  disabled
                >
                  OFF
                </button>
              </div>
            </Rnd>
          );
        })}
      </div>
    </div>
  );
}

type KujundusProps = {
  mode: 'control' | 'edit';
};

export function KujundusAdmin({ mode }: KujundusProps) {
  const { room } = useParams<{ room: string }>();
  const roomId = room || 'default-room';

  const devices = useSelector((state: RootState) => state.undoableRoot.present.deviceList[roomId || 'default-room'] || []);
  const colors = useSelector((state: RootState) => state.undoableRoot.present.roomColors[roomId || 'default-room'] || {});

  return (
    <>
      <div
        id="header"
        style={{
          backgroundColor: colors.headerBackgroundColor,
          color: colors.headerColor,
        }}
      >
        <Tagasi />
        <h1>{mode === 'control' ? 'Seadmete juhtimine' : 'Kasutajaliidese redigeerimine'}</h1>
      </div>
      {mode === 'control' ? (
        <>
          <RoomControl roomId={roomId || 'default-room'} devices={devices} />
          <ToastContainer aria-label="Notification container" />
        </>
      ) : (
        <>
          <RoomEdit roomId={roomId || 'default-room'} devices={devices} />
          <ToastContainer aria-label="Notification container" />
        </>
      )}
    </>
  );
}

export function KujundusUser() {
  const { room } = useParams<{ room: string }>();
  const roomId = room || 'default-room';

  const devices = useSelector((state: RootState) => state.undoableRoot.present.deviceList[roomId || 'default-room'] || []);
  const colors = useSelector((state: RootState) => state.undoableRoot.present.roomColors[roomId || 'default-room'] || {});

  return (
    <>
      <div
        id="header"
        style={{
          backgroundColor: colors.headerBackgroundColor,
          color: colors.headerColor,
        }}
      >
        <LogoutButton />
        <h1>Seadmete Juhtimine</h1>
      </div>
      <RoomControl roomId={roomId || 'default-room'} devices={devices} />
      <ToastContainer aria-label="Notification container" />
    </>
  );
}