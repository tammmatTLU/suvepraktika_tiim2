import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
//import type { ButtonElement, SpanElement } from '../types/Element';
import { addButton as addButtonElement} from '../store/slices/buttonElementsSlice';
import { addSpan as addSpanElement } from '../store/slices/spanElementsSlice';
import SaveButton from "./SaveButton";
import UndoButton from "./UndoButton";
import RedoButton from "./RedoButton";


export default function Toolbar({ gridEnabled, onGridToggle }: { gridEnabled: boolean, onGridToggle: () => void }) {
    const [modalAction, setModalAction] = useState<null | 'addInstance' | 'addTemplate'>(null);
    

    return (
        <div className="toolbar">
            <button className="toolbar-button" onClick={() => setModalAction('addInstance')}>Lisa element</button>
            <button className="toolbar-button" onClick={() => setModalAction('addTemplate')}>Loo uus nupu mall</button>
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
            <UndoButton />
            <RedoButton />
        </div>
    );
}

function ToolbarModal({ action, onClose }: { action: string, onClose: () => void }) {
    const dispatch = useDispatch();
    let content;
    
    if (action === 'addInstance') {
        const [newElementType, setNewElementType] = useState<string>('button');
        const [elementName, setElementName] = useState<string>('');
        const [templates, setTemplates] = useState<{id: number, name: string, command: string}[]>([]);
        const [templatesLoaded, setTemplatesLoaded] = useState(false);
        const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');

        useEffect(() => {
            setTemplatesLoaded(false);
            setTemplates([]);
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
    } else if (action === 'addTemplate') {
        const [name, setName] = useState('');
        const [command, setCommand] = useState('');

        const [rooms, setRooms] = useState<{id: number, name: string, command: string}[]>([]);
        const [roomsLoaded, setRoomsLoaded] = useState(false);
        const [selectedRoomId, setSelectedRoomId] = useState<string>('');

        useEffect(() => {
            setRoomsLoaded(false);
            setRooms([]);
        }, [action]);

        async function fetchRooms() {
            if (roomsLoaded) return;
            try {
                const response = await fetch('http://localhost:3006/api/rooms');
                if (!response.ok) {
                    throw new Error('Failed to fetch rooms');
                }
                const result = await response.json();
                console.log(result.data);
                setRooms(result.data || []);
                setRoomsLoaded(true);
            } catch (error) {
                console.error('Error fetching rooms:', error);
                setRooms([]);
                setRoomsLoaded(true);
            }
        }
        function handleSave() {
            fetch('http://localhost:3006/api/button-template/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                name,
                command,
                room_id: selectedRoomId ? parseInt(selectedRoomId, 10) : null,
                }),
            })
                .then(res => {
                if (!res.ok) throw new Error('Failed to save template');
                return res.json();
                })
                .then(() => {
                onClose();
                })
                .catch(err => {
                alert('Viga salvestamisel: ' + err.message);
            });
        }
        content = 
            <div className="modal-content">
            <label htmlFor="templateName">Nimi:</label>
            <input
                id="templateName"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
            />

            <label htmlFor="commandLine">Välise programmi nimi(ilma faililaiendita):</label>
            <input
                id="commandLine"
                type="text"
                value={command}
                onChange={e => setCommand(e.target.value)}
                placeholder="nt. echo 'Hello World'"
            />

            <label htmlFor="templateRoomSelect">Ruum:</label>
            <select
                id="templateRoomSelect"
                name="templateRoomSelect"
                value={selectedRoomId}
                onClick={fetchRooms}
                onChange={e => setSelectedRoomId(e.target.value)}
            >
                {rooms.map(room => (
                    <option key={room.id} value={room.id}>
                        {room.name}
                    </option>
                ))}
            </select>

            <button onClick={handleSave}>Salvesta</button>
            <button onClick={onClose}>Sulge</button>
            </div>
    }
    return (
        <div className="modal-backdrop">
                {content}
        </div>
    );
}