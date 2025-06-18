import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
//import type { ButtonElement, SpanElement } from '../types/Element';
import { setPageStyle, setSetForElements } from '../store/slices/userPageSlice';
import { useAppSelector } from '../store/hooks';
import { addButton as addButtonElement} from '../store/slices/buttonElementsSlice';
import { addSpan as addSpanElement } from '../store/slices/userPageSlice';
import SaveButton from "./SaveButton";
import UndoButton from "./UndoButton";
import RedoButton from "./RedoButton";
import type { PageStyle } from '../types/Element';
import CopyUIButton from './CopyUIButton';


export default function Toolbar({ gridEnabled, onGridToggle }: { gridEnabled: boolean, onGridToggle: () => void }) {
    const dispatch = useDispatch();
    const [modalAction, setModalAction] = useState<null | 'addInstance' | 'addTemplate' | 'modifyPage' | 'copyFromUser'>(null);
    
    const currentPageStyle: Partial<PageStyle> = useAppSelector(state => state.undoableRoot.present.userPage.pageStyle) || {};
    const [setForElements, toggleSetForElements] = useState(currentPageStyle.setForElements || false);

    const handleSetForElementsToggle = () => {
        toggleSetForElements(!setForElements);
        dispatch(setSetForElements(!setForElements));
    }
    return (
        <div className="toolbar">
            <button className="toolbar-button" onClick={() => setModalAction('addInstance')}>Lisa element</button>
            <button className="toolbar-button" onClick={() => setModalAction('addTemplate')}>Loo uus nupu mall</button>
            <button className="toolbar-button" onClick={() => setModalAction('modifyPage')}>Muuda kogu lehe kujundust</button>
            <button className="toolbar-button" onClick={() => setModalAction('copyFromUser')}>Kopeeri kujundus teisest vaatest</button>
            {modalAction && (
                <ToolbarModal action={modalAction} onClose={() => setModalAction(null)} />
            )}
            
            <SaveButton />
            <UndoButton />
            <RedoButton />
            <label className="grid-toggle-label">
                <input
                type="checkbox"
                className="grid-toggle"
                checked={gridEnabled}
                onChange={onGridToggle}
                />
                Grid snap
            </label>
            <label>
                <input
                    id="setForElementsToggle"
                    type="checkbox"
                    checked={setForElements}
                    onChange={handleSetForElementsToggle}
                />
                Rakenda need stiilid kõigile nuppudele ja tekstielementidele
            </label>
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
    } else if (action === 'modifyPage') {
        const currentPageStyle: Partial<PageStyle> = useAppSelector(state => state.undoableRoot.present.userPage.pageStyle) || {};

    // Local state for all PageStyle fields
    const [backgroundColor, setBackgroundColor] = useState(currentPageStyle.backgroundColor || '#FFFFFF');
    const [color, setColor] = useState(currentPageStyle.color || '#000000');
    const [fontFamily, setFontFamily] = useState(currentPageStyle.fontFamily || 'Arial');
    const [fontSize, setFontSize] = useState(currentPageStyle.fontSize || 16);
    const [btnBackgroundColor, setBtnBackgroundColor] = useState(currentPageStyle.btnBackgroundColor || '#FFFFFF');
    const [btnColor, setBtnColor] = useState(currentPageStyle.btnColor || '#000000');
    const [btnFontFamily, setBtnFontFamily] = useState(currentPageStyle.btnFontFamily || 'Arial');
    const [btnFontSize, setBtnFontSize] = useState(currentPageStyle.btnFontSize || 14);
    const [spanBackgroundColor, setSpanBackgroundColor] = useState(currentPageStyle.spanBackgroundColor || '#FFFFFF');
    const [spanColor, setSpanColor] = useState(currentPageStyle.spanColor || '#000000');
    const [spanFontFamily, setSpanFontFamily] = useState(currentPageStyle.spanFontFamily || 'Arial');
    const [spanFontSize, setSpanFontSize] = useState(currentPageStyle.spanFontSize || 16);

    function handleSave() {
        dispatch(setPageStyle({
            backgroundColor,
            color,
            fontFamily,
            fontSize,
            btnBackgroundColor,
            btnColor,
            btnFontFamily,
            btnFontSize,
            spanBackgroundColor,
            spanColor,
            spanFontFamily,
            spanFontSize,
        }));
        onClose();
    }

    content = (
        <div className="modal-content">
            <label>Lehe taustavärv:</label>
            <input type="color" value={backgroundColor} onChange={e => setBackgroundColor(e.target.value)} />

            <label>Päise tekstivärv:</label>
            <input type="color" value={color} onChange={e => setColor(e.target.value)} />

            <label>Päise font:</label>
            <input type="text" value={fontFamily} onChange={e => setFontFamily(e.target.value)} />

            <label>Päise fonti suurus:</label>
            <input type="number" value={fontSize} onChange={e => setFontSize(Number(e.target.value))} />

            <hr />

            <label>Nuppude taustavärv:</label>
            <input type="color" value={btnBackgroundColor} onChange={e => setBtnBackgroundColor(e.target.value)} />

            <label>Nuppude tekstivärv:</label>
            <input type="color" value={btnColor} onChange={e => setBtnColor(e.target.value)} />

            <label>Nuppude font:</label>
            <input type="text" value={btnFontFamily} onChange={e => setBtnFontFamily(e.target.value)} />

            <label>Nuppude fonti suurus:</label>
            <input type="number" value={btnFontSize} onChange={e => setBtnFontSize(Number(e.target.value))} />

            <hr />

            <label>Tekstielementide taustavärv:</label>
            <input type="color" value={spanBackgroundColor} onChange={e => setSpanBackgroundColor(e.target.value)} />

            <label>Tekstielementide tekstivärv:</label>
            <input type="color" value={spanColor} onChange={e => setSpanColor(e.target.value)} />

            <label>Tekstielementide font:</label>
            <input type="text" value={spanFontFamily} onChange={e => setSpanFontFamily(e.target.value)} />

            <label>Tekstielementide fonti suurus:</label>
            <input type="number" value={spanFontSize} onChange={e => setSpanFontSize(Number(e.target.value))} />

            <button onClick={handleSave}>Salvesta</button>
            <button onClick={onClose}>Sulge</button>
        </div>
    );
    } else if (action === 'copyFromUser') {
        const [users, setUsers] = useState<{ id: string, name: string }[]>([]);
        const [selectedUser, setSelectedUser] = useState("");
        const [loaded, setLoaded] = useState(false); // local loaded flag
        
        useEffect(() => {
            if(!loaded){    
                async function fetchUsers() {
                    const usersResponse = await fetch("http://localhost:3006/api/users");
                    const usersResult = await usersResponse.json();
                    setUsers(usersResult.data || []);
                    // Set default selected user after fetching
                    if (usersResult.data && usersResult.data.length > 0) {
                        setSelectedUser(usersResult.data[0].name);
                    }
                    setLoaded(true);
                }
                fetchUsers();
            }
        }, [loaded]);

        content = (
            <div className="modal-content">
                <select
                    id="roomSelect"
                    className="pretty-dropdown"
                    required
                    value={selectedUser}
                    onChange={e => setSelectedUser(e.target.value)}
                >
                    {users.map(user => (
                        <option key={user.id} value={user.name}>{user.name}</option>
                    ))}
                </select>
                <CopyUIButton fromUserName={selectedUser}/>
                <button onClick={onClose}>Sulge</button>
            </div>
        );
    }
    return (
        <div className="modal-backdrop">
                {content}
        </div>
    );
}