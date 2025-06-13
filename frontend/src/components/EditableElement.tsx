import { Rnd } from 'react-rnd';
import type { ButtonElement, SpanElement } from '../types/Element';

type EditableElementProps = {
    key: number;
    parameters: ButtonElement | SpanElement;
}

export default function EditableElement(element: EditableElementProps){

    if(element.parameters.type === 'button') {
        console.log('Rendering button type element:', element.parameters.name);
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
                bounds="#editPanel"
            >
                <button
                    className=""
                    style={{
                        backgroundColor: element.parameters.backgroundColor,
                        fontSize: element.parameters.fontSize,
                        fontFamily: element.parameters.fontFamily,
                        color: element.parameters.color,
                        width: '100%',
                        height: '100%',
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