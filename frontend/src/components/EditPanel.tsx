import EditableElement from "./EditableElement";
import type { ButtonElement, SpanElement } from "../types/Element";
import EditElementModal from "./EditElementModal";
import { useState } from "react";
import { useAppSelector } from '../store/hooks';

interface EditPanelProps {
  elements: Record<number, ButtonElement | SpanElement>;
  gridEnabled: boolean;
  gridSize: [number, number];
}

export default function EditPanel( { elements, gridEnabled, gridSize }: EditPanelProps ){
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [editType, setEditType] = useState<string | null>(null);

    const pageStyle = useAppSelector(
        state => state.undoableRoot.present.userPage.pageStyle
    );

    const setForElements = pageStyle?.setForElements;

    const handleEdit = (id: number, type: string) => {
        setEditId(id);
        setEditType(type);
        setEditModalOpen(true);
    };

    return(
        <div className="edit-panel" id="editPanel">
            {Object.values(elements).map((element: ButtonElement | SpanElement) => {
                return(
                    <EditableElement
                        key={element.id}
                        parameters={element}
                        onEdit={handleEdit}
                        gridEnabled={gridEnabled}
                        gridSize={gridSize}
                        pageStyle={pageStyle}
                        setForElements={setForElements}
                    />
                )
            })}
            {editModalOpen && editId && editType && (
                <EditElementModal
                id={editId}
                type={editType}
                onClose={() => setEditModalOpen(false)}
                />
            )}
        </div>
    )
}
