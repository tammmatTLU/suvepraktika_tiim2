import '../App.css'
import type { ButtonElement, SpanElement } from '../types/Element';

type ControlElementProps = {
    key: number;
    parameters: ButtonElement | SpanElement;
}

export default function ControlElement({ parameters }: ControlElementProps){

    if(parameters.type === 'button') {
        return (
            <button
                style={{
                    backgroundColor: parameters.backgroundColor,
                    fontSize: parameters.fontSize,
                    fontFamily: parameters.fontFamily,
                    color: parameters.color,
                    borderRadius: '5px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    position: 'absolute',
                    top: parameters.position.y,
                    left: parameters.position.x,
                    width: parameters.size.width,
                    height: parameters.size.height,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {parameters.name}
            </button>
        );
    } else if (parameters.type === 'span') {
        return (
            <span
                style={{
                    fontSize: parameters.fontSize,
                    fontFamily: parameters.fontFamily,
                    color: parameters.color,
                    backgroundColor: parameters.backgroundColor,
                    position: 'absolute',
                    top: parameters.position.y,
                    left: parameters.position.x,
                    width: parameters.size.width,
                    height: parameters.size.height,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {parameters.name}
            </span>
        );
    }
}