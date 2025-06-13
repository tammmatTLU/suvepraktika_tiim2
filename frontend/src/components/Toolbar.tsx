import { useState } from 'react';

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
    const [newElementType, setNewElementType] = useState<string>('button');
    let content;
    let templateOptions;
    async function fetchTemplates() {
        try {
            const response = await fetch('/api/btn-templates');
            if (!response.ok) {
                throw new Error('Failed to fetch templates');
            }
            const result = await response.json();
            const templates = result.data || null;
            console.log(result);
            templateOptions = templates.map((template: any) => (
                <option key={template.id} value={template.id}>
                    {template.name}
                </option>
            ));
        } catch (error) {
            console.error('Error fetching templates:', error);
            templateOptions = 
            <option value="">
                Error loading templates
            </option>;
        }
    }

    if (action === 'add') {
        fetchTemplates();
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
            <select name="btnTemplateSelect" id="btnTemplateSelect">
                {templateOptions}
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
            <input type="text" placeholder="Elemendi tekst" id="newElementName" />
            <button onClick={ ()=>{
                // add new element to redux store
                if(newElementType === 'button') {
                    // dispatch action to add new button element

                } else if(newElementType === 'span') {
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