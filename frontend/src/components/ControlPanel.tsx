import ControlElement from './ControlElement'
import type { ButtonElement, SpanElement } from '../types/Element';

interface ControlPanelProps {
   elements: Record<number, ButtonElement | SpanElement>;
}

export default function ControlPanel( { elements }: ControlPanelProps ) {
    
    return(
        <div className="control-panel">
            {Object.values(elements).map((element: ButtonElement | SpanElement) => {
                return(
                    <ControlElement key={element.id} parameters={element} />
                )
            })}
        </div>
    )
}