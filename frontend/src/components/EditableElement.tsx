import { Rnd } from 'react-rnd';
import type { ButtonElement, SpanElement } from '../types/Element';
import { useDispatch } from 'react-redux';
import { setPosition as setButtonPosition, setSize as setButtonSize, deleteButton} from '../store/slices/buttonElementsSlice';
import { setPosition as setSpanPosition, setSize as setSpanSize, deleteSpan} from '../store/slices/spanElementsSlice';


type EditableElementProps = {
    key: number;
    parameters: ButtonElement | SpanElement;
}

export default function EditableElement(element: EditableElementProps){
    const dispatch = useDispatch();
    const handleButtonDragStop = (d: any) => {
        console.log('Element dragged to:', d.x, d.y);
        dispatch(setButtonPosition({
            id: element.parameters.id,
            position: { x: d.x, y: d.y }
        }));
    };
    const handleButtonResizeStop = (
        _e: any,
        _direction: any,
        ref: any,
        _delta: any,
        position: { x: number; y: number }
    ) => {
        dispatch(setButtonSize({
            id: element.parameters.id,
            size: {
                width: ref.offsetWidth,
                height: ref.offsetHeight
            }
        }));
        dispatch(setButtonPosition({
            id: element.parameters.id,
            position: position
        }));
    };

    const handleSpanDragStop = (d: any) => {
        console.log('Element dragged to:', d.x, d.y);
        dispatch(setSpanPosition({
            id: element.parameters.id,
            position: { x: d.x, y: d.y }
        }));
    };
    const handleSpanResizeStop = (
        _e: any,
        _direction: any,
        ref: any,
        _delta: any,
        position: { x: number; y: number }
    ) => {
        dispatch(setSpanSize({
            id: element.parameters.id,
            size: {
                width: ref.offsetWidth,
                height: ref.offsetHeight
            }
        }));
        dispatch(setSpanPosition({
            id: element.parameters.id,
            position: position
        }));
    };
    const handleDeleteDevice = (id: number, type: string) => {
        if (window.confirm(`Are you sure you want to delete the device "${name}"?`)) {
            console.log(`Deleting device with ID: ${id}`);
            // Dispatch an action to delete the device
            if( type === 'button') {
                dispatch(deleteButton(id));
            }
            else if( type === 'span') {
                dispatch(deleteSpan(id));
            }
            // dispatch(deleteDevice(id));
        }
    };
    

    if(element.parameters.type === 'button') {
        console.log('Rendering button type element:', element.parameters.name);
        return (
            <Rnd
                key={element.parameters.id}
                default={{
                    x: element.parameters.position.x,
                    y: element.parameters.position.y,
                    width: element.parameters.size.width,
                    height: element.parameters.size.height,
                }}
                onDragStop={handleButtonDragStop}
                enableResizing={true}
                onResizeStop={handleButtonResizeStop}
                bounds="#editPanel"
            >
                <button
                    className="edit-device-button"
                    //onClick={() => handleEditDevice(element.parameters.id, element.parameters.type)}
                >
                    ✏️
                </button>
                <button
                    className="delete-device-button"
                    onClick={() => handleDeleteDevice(element.parameters.id, element.parameters.type)}
                >
                    🗑️
                </button>
                <button
                    className="editable-button"
                    style={{
                        backgroundColor: element.parameters.backgroundColor,
                        fontSize: element.parameters.fontSize,
                        fontFamily: element.parameters.fontFamily,
                        color: element.parameters.color,
                        borderRadius: '5px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                    disabled={true}
                >
                    {element.parameters.name}
                </button>
            </Rnd>
        );
    } else if (element.parameters.type === 'span') {
        console.log('Rendering span element:', element.parameters.name);

        return (
            <>
            <Rnd
                key={element.parameters.id}
                default={{
                    x: element.parameters.position.x,
                    y: element.parameters.position.y,
                    width: element.parameters.size.width,
                    height: element.parameters.size.height,
                }}
                style={{
                    backgroundColor: element.parameters.backgroundColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    borderRadius: '5px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
                onDragStop={handleSpanDragStop}
                enableResizing={true}
                onResizeStop={handleSpanResizeStop}
                bounds="#editPanel"
            >
                <button
                    className="edit-device-button"
                    //onClick={() => handleEditDevice(element.parameters.id, element.parameters.type)}
                >
                    ✏️
                </button>
                <button
                    className="delete-device-button"
                    onClick={() => handleDeleteDevice(element.parameters.id, element.parameters.type)}
                >
                    🗑️
                </button>
                <span
                    className="editable-span"
                    style={{
                        fontSize: element.parameters.fontSize,
                        fontFamily: element.parameters.fontFamily,
                        color: element.parameters.color,
                    }}
                >
                    {element.parameters.name}
                </span>
            </Rnd>

            </>
        );
    }
}
/*
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function EditDeviceModal({ id, type, onClose }: { id: number; type: string; onClose: () => void; }) {
  const dispatch = useDispatch();
  // Get the element from the store by id and type
  const element =
    useSelector((state: any) =>
      type === 'button'
        ? state.buttonElements.elements[id]
        : state.spanElements.elements[id]
    ) || {};

  // Local state for editing
  const [templateId, setTemplateId] = useState(element.templateId || 0);
  const [backgroundColor, setBackgroundColor] = useState(element.backgroundColor || '#FFFFFF');
  const [color, setColor] = useState(element.color || '#000000');
  const [fontSize, setFontSize] = useState(element.fontSize || 16);
  const [fontFamily, setFontFamily] = useState(element.fontFamily || 'Arial');

  // Example templates, replace with your actual template fetching logic if needed
  const [templates, setTemplates] = useState<{ id: number; name: string }[]>([]);
  useEffect(() => {
    // Fetch templates if needed
    setTemplates([
      { id: 1, name: 'Power On' },
      { id: 2, name: 'Power Off' },
    ]);
  }, []);

  // Update local state if element changes (e.g. when switching between devices)
  useEffect(() => {
    setTemplateId(element.templateId || 0);
    setBackgroundColor(element.backgroundColor || '#FFFFFF');
    setColor(element.color || '#000000');
    setFontSize(element.fontSize || 16);
    setFontFamily(element.fontFamily || 'Arial');
  }, [element]);

  const handleSave = () => {
    if (type === 'button') {
        //dispatch({});
    } else if (type === 'span') {
        //dispatch({});
    }
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        {type === 'button' && (
          <>
            <label htmlFor="editTemplateSelect">Mall:</label>
            <select
              id="editTemplateSelect"
              value={templateId}
              onChange={e => setTemplateId(Number(e.target.value))}
            >
              {templates.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </>
        )}
        <label htmlFor="editBackgroundColor">Taustavärv:</label>
        <input
          id="editBackgroundColor"
          type="color"
          value={backgroundColor}
          onChange={e => setBackgroundColor(e.target.value)}
        />
        <label htmlFor="editColor">Tekstivärv:</label>
        <input
          id="editColor"
          type="color"
          value={color}
          onChange={e => setColor(e.target.value)}
        />
        <label htmlFor="editFontSize">Fondi suurus:</label>
        <input
          id="editFontSize"
          type="number"
          value={fontSize}
          onChange={e => setFontSize(Number(e.target.value))}
        />
        <label htmlFor="editFontFamily">Font:</label>
        <input
          id="editFontFamily"
          type="text"
          value={fontFamily}
          onChange={e => setFontFamily(e.target.value)}
        />
        <button onClick={handleSave}>Salvesta</button>
        <button onClick={onClose}>Sulge</button>
      </div>
    </div>
  );
}
*/