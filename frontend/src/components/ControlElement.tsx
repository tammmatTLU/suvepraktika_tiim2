import '../App.css'
import type { ButtonElement, SpanElement, PageStyle } from '../types/Element';

type ControlElementProps = {
    key: number;
    parameters: ButtonElement | SpanElement;
    pageStyle?: PageStyle;
    setForElements?: boolean;
}

export default function ControlElement({ parameters, pageStyle, setForElements}: ControlElementProps){

    const style = setForElements && pageStyle
        ? {
            backgroundColor: parameters.type === 'button' ? pageStyle.btnBackgroundColor : pageStyle.spanBackgroundColor,
            color: parameters.type === 'button' ? pageStyle.btnColor : pageStyle.spanColor,
            fontFamily: parameters.type === 'button' ? pageStyle.btnFontFamily : pageStyle.spanFontFamily,
            fontSize: parameters.type === 'button' ? pageStyle.btnFontSize : pageStyle.spanFontSize,
            borderRadius: '5px',
            boxShadow: parameters.type === 'button' ? '0 2px 4px rgba(0, 0, 0, 0.1)' : '',
            position: 'absolute' as "absolute",
            top: parameters.position.y,
            left: parameters.position.x,
            width: parameters.size.width,
            height: parameters.size.height,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        } : {
            backgroundColor: parameters.backgroundColor,
            color: parameters.color,
            fontFamily: parameters.fontFamily,
            fontSize: parameters.fontSize,
            borderRadius: '5px',
            boxShadow: parameters.type === 'button' ? '0 2px 4px rgba(0, 0, 0, 0.1)' : '',
            position: 'absolute' as "absolute",
            top: parameters.position.y,
            left: parameters.position.x,
            width: parameters.size.width,
            height: parameters.size.height,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        };

    if(parameters.type === 'button') {
        return (
            <button
                style={style}
            >
                {parameters.name}
            </button>
        );
    } else if (parameters.type === 'span') {
        return (
            <span
                style={style}
            >
                {parameters.name}
            </span>
        );
    }
}