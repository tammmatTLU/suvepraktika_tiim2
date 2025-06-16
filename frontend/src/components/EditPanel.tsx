import EditableElement from "./EditableElement";
import type { ButtonElement, SpanElement } from "../types/Element";

interface EditPanelProps {
  elements: Record<number, ButtonElement | SpanElement>;
}

export default function EditPanel( { elements }: EditPanelProps ){

    return(
        <div className="edit-panel" id="editPanel">
            {Object.values(elements).map((element: ButtonElement | SpanElement) => {
                console.log('Rendering button element:', element.name);
                return(
                    <EditableElement key={element.id} parameters={element} />
                )
            })}
        </div>
    )
}
