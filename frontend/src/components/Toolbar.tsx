import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
//import type { ButtonElement, SpanElement } from '../types/Element';
import { addButton as addButtonElement} from '../store/slices/buttonElementsSlice';


export default function Toolbar() {
    const [modalAction, setModalAction] = useState<null | 'add' | 'save'>(null);

    return (
        <div className="toolbar">
            <button className="toolbar-button" onClick={() => setModalAction('add')}>Lisa seade</button>
            {modalAction && (
                <ToolbarModal action={modalAction} onClose={() => setModalAction(null)} />
            )}
        </div>
    );
}

function ToolbarModal({ action, onClose }: { action: string, onClose: () => void }) {
    const dispatch = useDispatch();
    const [newElementType, setNewElementType] = useState<string>('button');
    const [elementName, setElementName] = useState<string>('');
    const [templates, setTemplates] = useState<{id: number, name: string, command: string}[]>([]);
    const [templatesLoaded, setTemplatesLoaded] = useState(false);

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
                onClick={fetchTemplates}
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
                    dispatch(addButtonElement({
                        id: 0, // placeholder. needs to be replaced with actual id from backend
                        type: 'button',
                        name: elementName,
                        state: false,
                        position: { x: 0, y: 0 },
                        size: { width: 320, height: 420 },
                        fontSize: 14,
                        fontFamily: 'Arial',
                        color: '#000000',
                        backgroundColor: '#FFFFFF',
                        templateId: parseInt((document.getElementById('btnTemplateSelect') as HTMLSelectElement).value, 10)
                    }
                    ))} else if(newElementType === 'span') {
                    // dispatch action to add new span element
                }
            }}>
                Lisa
            </button>
            <button onClick={onClose}>Sulge</button>

        </div>;
    } else if (action === 'delete') {
        content = <div>Kustuta seade confirmation here</div>;
    } else if (action === 'edit') {
        content = <div>Redigeeri seadet form here</div>;
    } else if (action === 'save') {
        content = <div>Salvestamine...</div>;
    }

    return (
        <div className="modal-backdrop">
                {content}
        </div>
    );
}