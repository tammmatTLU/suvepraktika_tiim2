import DeviceToggle from '../components/DeviceToggle'
import type { ButtonElement } from '../types/Element';

interface ControlPanelProps {
  elements: Record<number, ButtonElement>;
}

export default function ControlPanel( { elements }: ControlPanelProps ) {
    
    return(
        <div className="control-panel">
            {Object.values(elements).map((element: ButtonElement) => {
                return(
                    <DeviceToggle key={element.id} parameters={element} />
                )
            })}
        </div>
    )
}