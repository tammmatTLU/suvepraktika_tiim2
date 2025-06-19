import { useState } from "react";
import '../App.css'
import type { ButtonElement, SpanElement, PageStyle } from '../types/Element';

type ControlElementProps = {
    key: number;
    parameters: ButtonElement | SpanElement;
    pageStyle?: PageStyle;
    setForElements?: boolean;
}

export default function ControlElement({ parameters, pageStyle, setForElements}: ControlElementProps){
    const [streamMessages, setStreamMessages] = useState<string[]>([]);
    const [streaming, setStreaming] = useState(false);

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
        const handleClick = () => {
            setStreamMessages([]);
            setStreaming(true);

            const es = new EventSource(`http://localhost:3006/api/execute-command?templateId=${parameters.templateId}`);
            let gotMessage = false;

            es.onmessage = (event) => {
                gotMessage = true;
                setStreamMessages( prev => [...prev, event.data])
            };

            es.addEventListener('end', ()=>{
                setStreaming(false);
                es.close();
            })

            es.onerror = () => {
                es.close();
                setStreaming(false);
                if (!gotMessage){
                    fetch(`http://localhost:3006/api/execute-command?templateId=${parameters.templateId}`,{
                        method: 'POST'
                    })
                    .then(res => res.json())
                    .then(data => {
                        let output = Array.isArray(data.output) ? data.output.join('\n') : data.output;
                         alert('lights script output: ' + (output ?? 'no output'));
                    })
                    .catch(err=>{
                        alert('error: '+ err.message)
                    });
                };
            }
        };
        return (
            <div>
            <button
                style={style}
                onClick={handleClick}
                disabled={streaming}
            >
                {parameters.name}
            </button>
            {streaming && (
                    <div className="stream-output">
                        {streamMessages.map((msg, idx) => (
                            <div key={idx}>{msg}</div>
                        ))}
                    </div>
                )}
            </div>
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