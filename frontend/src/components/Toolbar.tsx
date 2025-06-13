import { useState } from 'react';

export default function Toolbar() {
    const [modalAction, setModalAction] = useState<null | 'add' | 'edit' | 'delete' | 'save'>(null);

    return (
        <div className="toolbar">
            <button className="toolbar-button" onClick={() => setModalAction('add')}>Lisa seade</button>
            <button className="toolbar-button" onClick={() => setModalAction('delete')}>Kustuta seade</button>
            <button className="toolbar-button" onClick={() => setModalAction('edit')}>Redigeeri seadet</button>
            <button className="toolbar-button" onClick={() => setModalAction('save')}>Salvesta muudatused</button>
            {modalAction && (
                <ToolbarModal action={modalAction} onClose={() => setModalAction(null)} />
            )}
        </div>
    );
}

function ToolbarModal({ action, onClose }: { action: string, onClose: () => void }) {
    let content;
    if (action === 'add') {
        content = 
        <div>
            <label>
                <input type="radio" value="button" id="newButton" name="newElementType" checked = {true}/>
                    Uus nupp
            </label>
            <label>
                <input type="radio" value="other" id="newSpan" name="newElementType"/>
                    Uus tekst	
            </label>

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
            <div className="modal-content">
                <button onClick={onClose}>Sulge</button>
                {content}
            </div>
        </div>
    );
}