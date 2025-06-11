import RoomSelection from '../components/RoomSelection'

export default function UIConfigPage(){
    const rooms = [
        { id: 'A-001', name: 'Ruum A-001' },
        { id: 'A-002', name: 'Ruum A-002' },
        { id: 'A-003', name: 'Ruum A-003' },
        { id: 'A-004', name: 'Ruum A-004' }
    ];
    const action = "ui-config";
    return(
        <div className="grid-layout">
            <header>
                <h1>Kasutajavaate redigeerimine</h1>
            </header>
            <RoomSelection rooms={rooms} action={action}/>
        </div>
    )
}