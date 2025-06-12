import DeviceToggle from '../components/DeviceToggle'
import type { Element } from '../types/Element';

interface ControlPanelProps {
  elements: Record<number, Element>;
}

export default function ControlPanel( { elements }: ControlPanelProps ) {
    
    return(
        <div className="control-panel">
            {Object.values(elements).map((element: Element) => {
                return(
                    <DeviceToggle key={element.id} parameters={element} />
                )
            })}
        </div>
    )
}