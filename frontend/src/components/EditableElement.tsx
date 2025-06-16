import { Rnd } from 'react-rnd';
import type { ButtonElement, SpanElement } from '../types/Element';
import { useDispatch } from 'react-redux';
import { setPosition as setButtonPosition, setSize as setButtonSize, deleteButton} from '../store/slices/buttonElementsSlice';
import { setPosition as setSpanPosition, setSize as setSpanSize, deleteSpan} from '../store/slices/spanElementsSlice';

type EditableElementProps = {
    key: number;
    parameters: ButtonElement | SpanElement;
    onEdit: (id: number, type: string) => void;
    gridEnabled: boolean;
    gridSize: [number, number];
}

export default function EditableElement({ parameters, onEdit, gridEnabled, gridSize}: EditableElementProps){
    const dispatch = useDispatch();
    const handleButtonDragStop = (_e: any, d: any) => {
        dispatch(setButtonPosition({
            id: parameters.id,
            position: { x: d.x, y: d.y }
        }));
    };
    console.log("gridEnabled: " + gridEnabled + "gridSize: " + gridSize)
    const handleButtonResizeStop = (
        _e: any,
        _direction: any,
        ref: any,
        _delta: any,
        position: { x: number; y: number }
    ) => {
        dispatch(setButtonSize({
            id: parameters.id,
            size: {
                width: ref.offsetWidth,
                height: ref.offsetHeight
            }
        }));
        dispatch(setButtonPosition({
            id: parameters.id,
            position: position
        }));
    };

    const handleSpanDragStop = (_e: any, d: any) => {
        dispatch(setSpanPosition({
            id: parameters.id,
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
            id: parameters.id,
            size: {
                width: ref.offsetWidth,
                height: ref.offsetHeight
            }
        }));
        dispatch(setSpanPosition({
            id: parameters.id,
            position: position
        }));
    };

    const handleEdit = (id: number, type: string) => {
        onEdit(id, type);
    }

    const handleDeleteElement = (id: number, type: string) => {
        if (window.confirm(`Are you sure you want to delete the device "${name}"?`)) {
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
    
    if(parameters.type === 'button') {
        return (
            <Rnd
                key={parameters.id}
                position={{
                    x: parameters.position.x,
                    y: parameters.position.y,
                }}
                size={{
                    width: parameters.size.width,
                    height: parameters.size.height,
                }}
                onDragStop={handleButtonDragStop}
                enableResizing={true}
                onResizeStop={handleButtonResizeStop}
                bounds="#editPanel"
                dragGrid={ gridEnabled ? gridSize : [1, 1]}
                parent="#editPanel"
            >
                <button
                    className="edit-device-button"
                    onClick={() => handleEdit(parameters.id, parameters.type)}
                >
                    ✏️
                </button>
                <button
                    className="delete-device-button"
                    onClick={() => handleDeleteElement(parameters.id, parameters.type)}
                >
                    🗑️
                </button>
                <button
                    className="editable-button"
                    style={{
                        backgroundColor: parameters.backgroundColor,
                        fontSize: parameters.fontSize,
                        fontFamily: parameters.fontFamily,
                        color: parameters.color,
                        borderRadius: '5px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                    disabled={true}
                >
                    {parameters.name}
                </button>
            </Rnd>
        );
    } else if (parameters.type === 'span') {
        return (
            <>
            <Rnd
                key={parameters.id}
                position={{
                    x: parameters.position.x,
                    y: parameters.position.y,
                }}
                size={{
                    width: parameters.size.width,
                    height: parameters.size.height,
                }}
                style={{
                    backgroundColor: parameters.backgroundColor,
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
                parent="#editPanel"
                dragGrid={gridEnabled ? gridSize : [1, 1]}
            >
                <button
                    className="edit-device-button"
                    onClick={() => handleEdit(parameters.id, parameters.type)}
                >
                    ✏️
                </button>
                <button
                    className="delete-device-button"
                    onClick={() => handleDeleteElement(parameters.id, parameters.type)}
                >
                    🗑️
                </button>
                <span
                    className="editable-span"
                    style={{
                        fontSize: parameters.fontSize,
                        fontFamily: parameters.fontFamily,
                        color: parameters.color,
                    }}
                >
                    {parameters.name}
                </span>
            </Rnd>
            </>
        );
    }
}
