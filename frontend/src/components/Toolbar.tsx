import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
//import type { ButtonElement, SpanElement } from '../types/Element';
import { addButton as addButtonElement} from '../store/slices/buttonElementsSlice';
import { addSpan as addSpanElement } from '../store/slices/spanElementsSlice';
import SaveButton from "./SaveButton";


export default function Toolbar({ gridEnabled, onGridToggle }: { gridEnabled: boolean, onGridToggle: () => void }) {
    const [modalAction, setModalAction] = useState<null | 'add' | 'save'>(null);

    return (
        <div className="toolbar">
            <button className="toolbar-button" onClick={() => setModalAction('add')}>Lisa seade</button>
            {modalAction && (
                <ToolbarModal action={modalAction} onClose={() => setModalAction(null)} />
            )}
            <label>
                <input
                type="checkbox"
                checked={gridEnabled}
                onChange={onGridToggle}
                />
                Grid snap
            </label>
            <SaveButton />
        </div>
    );
}

function ToolbarModal({ action, onClose }: { action: string, onClose: () => void }) {
    const dispatch = useDispatch();
    const [newElementType, setNewElementType] = useState<string>('button');
    const [elementName, setElementName] = useState<string>('');
    const [templates, setTemplates] = useState<{id: number, name: string, command: string}[]>([]);
    const [templatesLoaded, setTemplatesLoaded] = useState(false);
    const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');

    useEffect(() => {
        if (action === 'add') {
            setTemplatesLoaded(false);
            setTemplates([]);
        }
    }, [action]);

    async function fetchTemplates() {
        if (templatesLoaded) return;
        try {
            const response = await fetch('http://localhost:3006/api/button-templates');
            if (!response.ok) {
                throw new Error('Failed to fetch templates');
            }
            const result = await response.json();
            console.log(result.data);
            setTemplates(result.data || []);
            setTemplatesLoaded(true);
        } catch (error) {
            console.error('Error fetching templates:', error);
            setTemplates([]);
            setTemplatesLoaded(true);
        }
    }


        let content;
    if (action === 'add') {
        content = 
        <div className="modal-content">
            <label htmlFor='newElementType'>Vali uus seadme tüüp:</label>
            <div>
                <input
                    type="radio"
                    value="button"
                    id="newButton"
                    name="newElementType"
                    checked={newElementType === 'button'}
                    onChange={() => setNewElementType('button')}
                />
                Uus Nupp
            </div>
            <select
                name="btnTemplateSelect"
                id="btnTemplateSelect"
                disabled={newElementType !== 'button'}
                value={selectedTemplateId}
                onClick={fetchTemplates}
                onChange={e => setSelectedTemplateId(e.target.value)}
            >
                {templates.map(template => (
                    <option key={template.id} value={template.id}>
                        {template.name}
                    </option>
                ))}
            </select>
            <div>
                <input
                    type="radio"
                    value="span"
                    id="newSpan"
                    name="newElementType"
                    checked={newElementType === 'span'}
                    onChange={() => setNewElementType('span')}
                />
                Uus tekst
            </div>
            <input
                type="text"
                placeholder="Elemendi tekst"
                id="newElementName"
                value={elementName}
                onChange={e => setElementName(e.target.value)}
            />
            <button onClick={ ()=>{
                // add new element to redux store
                if(newElementType === 'button') {
                    if (!selectedTemplateId) {
                        alert('Palun vali mall!');
                        return;
                    }
                    dispatch(addButtonElement({
                        id: Date.now(),
                        type: 'button',
                        name: elementName,
                        state: false,
                        position: { x: 0, y: 0 },
                        size: { width: 175, height: 75 },
                        fontSize: 14,
                        fontFamily: 'Arial',
                        color: '#000000',
                        backgroundColor: '#FFFFFF',
                        templateId: parseInt((document.getElementById('btnTemplateSelect') as HTMLSelectElement).value, 10)
                    }));
                } else if(newElementType === 'span') {
                    dispatch(addSpanElement({
                        id: Date.now(),
                        type: 'span',
                        name: elementName,
                        position: { x: 0, y: 0 },
                        size: { width: 320, height: 120 },
                        fontSize: 20,
                        fontFamily: 'Arial',
                        color: '#000000',
                        backgroundColor: '#FFFFFF'
                    }))
                }
            }}>
                Lisa
            </button>
            <button onClick={onClose}>Sulge</button>

        </div>;

    return (
        <div className="modal-backdrop">
                {content}
        </div>
    );
}}