import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";


export default function RoomSelect() {
    const { action } = useParams<{ action: string }>();
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

    if (!action) {
        return <p>Tegevus puudub</p>;
    }

    let nextPage = `/${action}/${selectedUser}`;
    if (action === "device-control" && selectedUser === "admin") {
        nextPage = `/${action}/central-control-panel`;
    }

    return (
         <div className="form-group">
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
            <Link to={nextPage}>
                <button type="button" className="btn-grad">Kinnita valik</button>
            </Link>
            
        </div>
    );
}