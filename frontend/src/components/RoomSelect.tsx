import { useState } from "react";
import { useParams } from "react-router-dom";


export default function RoomSelect() {
    const { action } = useParams<{ action: string }>();
    if (!action) {
        return <p>Tegevus puudub</p>;
    }

    const rooms= [
        { id: 'A-001', name: 'Ruum A-001' },
        { id: 'A-002', name: 'Ruum A-002' },
        { id: 'A-003', name: 'Ruum A-003' },
        { id: 'A-004', name: 'Ruum A-004' }
    ];
    const [selectedRoom, setSelectedRoom] = useState(rooms[0]?.id || "");

    return (
        <form action={`/${action}/${selectedRoom}`} method="post" className="form-group">
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
            <button type="submit" className="btn-grad">Kinnita valik</button>
        </form>
    );
}