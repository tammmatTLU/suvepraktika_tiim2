import ControlElement from './ControlElement'
import type { ButtonElement, SpanElement } from '../types/Element';
import { useAppSelector } from '../store/hooks';

interface ControlPanelProps {
   elements: Record<number, ButtonElement | SpanElement>;
}

export default function ControlPanel( { elements }: ControlPanelProps ) {
    const pageStyle = useAppSelector(
        state => state.undoableRoot.present.userPage.pageStyle
    );
    
    const setForElements = pageStyle?.setForElements;

    return(
        <div className="control-panel">
            {Object.values(elements).map((element: ButtonElement | SpanElement) => {
                return(
                    <ControlElement
                        key={element.id}
                        parameters={element}
                        pageStyle={pageStyle}
                        setForElements={setForElements}
                    />
                )
            })}
        </div>
    )
}