import { Rnd } from 'react-rnd';
import type { ButtonElement, SpanElement } from '../types/Element';
import { useDispatch } from 'react-redux';
import { setPosition, setSize } from '../store/slices/buttonElementsSlice';

type EditableElementProps = {
    key: number;
    parameters: ButtonElement | SpanElement;
}

export default function EditableElement(element: EditableElementProps){
    const dispatch = useDispatch();
    const handleDragStop = (d: any) => {
        console.log('Element dragged to:', d.x, d.y);
        dispatch(setPosition({
            id: element.parameters.id,
            position: { x: d.x, y: d.y }
        }));
    };
    const handleResizeStop = (
        e: any,
        direction: any,
        ref: any,
        delta: any,
        position: { x: number; y: number }
    ) => {
        dispatch(setSize({
            id: element.parameters.id,
            size: {
                width: ref.offsetWidth,
                height: ref.offsetHeight
            }
        }));
        dispatch(setPosition({
            id: element.parameters.id,
            position: position
        }));
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
                onDragStop={handleDragStop}
                enableResizing={true}
                onResizeStop={handleResizeStop}
                bounds="#editPanel"
            >
                <button
                    className="editable-button"
                    style={{
                        backgroundColor: element.parameters.backgroundColor,
                        fontSize: element.parameters.fontSize,
                        fontFamily: element.parameters.fontFamily,
                        color: element.parameters.color,
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
            <Rnd
                key={element.parameters.id}
                 position={{
                    x: element.parameters.position.x,
                    y: element.parameters.position.y,
                }}
                size={{
                    width: element.parameters.size.width,
                    height: element.parameters.size.height,
                }}
                style={{
                    fontSize: element.parameters.fontSize,
                    fontFamily: element.parameters.fontFamily,
                    color: element.parameters.color,
                }}
                bounds="#editPanel"
            >
                <span
                    className="editable-span"
                    style={{
                        backgroundColor: element.parameters.backgroundColor
                    }}
                >
                    {element.parameters.name}
                </span>
            </Rnd>
        );
    }
}