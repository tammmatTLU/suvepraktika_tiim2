import { useState } from "react";
import { Link, useParams } from "react-router-dom";


export default function RoomSelect() {
    const { action } = useParams<{ action: string }>();
    if (!action) {
        return <p>Tegevus puudub</p>;
    }

    const rooms= [
        { id: 'user-1', name: 'Ruum A-001' },
        { id: 'user-2', name: 'Ruum A-002' },
        { id: 'user-3', name: 'Ruum A-003' },
        { id: 'user-4', name: 'Ruum A-004' },
    ]; 
    // API päring siia xd
    const [selectedRoom, setSelectedRoom] = useState(rooms[0]?.id || "");

    return (
        <form className="form-group">
            <select
                id="roomSelect"
                className="pretty-dropdown"
                required
                value={selectedRoom}
                onChange={e => setSelectedRoom(e.target.value)}
            >
                {rooms.map(room => (
                    <option key={room.id} value={room.id}>{room.name}</option>
                ))}
            </select>
            <Link to={`/${action}/${selectedRoom}`}><button type="submit" className="btn-grad">Kinnita valik</button></Link>
            { action === "device-control" ? <Link to={`/${action}/central-control-panel`}><button type="submit" className="btn-grad">Halda kõiki seadmeid</button></Link> : null }
            
        </form>
    );
}