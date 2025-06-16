import { Rnd } from 'react-rnd';
import type { ButtonElement, SpanElement } from '../types/Element';
import { useDispatch } from 'react-redux';
import { setPosition as setButtonPosition, setSize as setButtonSize, deleteButton} from '../store/slices/buttonElementsSlice';
import { setPosition as setSpanPosition, setSize as setSpanSize, deleteSpan} from '../store/slices/spanElementsSlice';


type EditableElementProps = {
    key: number;
    parameters: ButtonElement | SpanElement;
    onEdit: (id: number, type: string) => void;
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

    const handleEdit = (id: number, type: string) => {
        element.onEdit(id, type);
    }

    const handleDeleteElement = (id: number, type: string) => {
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
                    onClick={() => handleEdit(element.parameters.id, element.parameters.type)}
                >
                    ✏️
                </button>
                <button
                    className="delete-device-button"
                    onClick={() => handleDeleteElement(element.parameters.id, element.parameters.type)}
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
                    onClick={() => handleEdit(element.parameters.id, element.parameters.type)}
                >
                    ✏️
                </button>
                <button
                    className="delete-device-button"
                    onClick={() => handleDeleteElement(element.parameters.id, element.parameters.type)}
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
