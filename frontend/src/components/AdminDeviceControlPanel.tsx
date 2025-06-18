import { useAppSelector } from "../store/hooks";
import type { ButtonTemplate } from "../types/Element";
import { useState } from "react";

export default function AdminDeviceControlPanel() {
    const elements: Record<number, ButtonTemplate> = useAppSelector(
        state => state.buttonTemplate.elements
    );

    const [filter, setFilter] = useState({
        id: "",
        name: "",
        command: "",
        roomName: "",
    });

    const filteredElements = Object.values(elements).filter((element) => {
        return (
            (filter.id === "" || element.id.toString().includes(filter.id)) &&
            (filter.name === "" || element.name.toLowerCase().includes(filter.name.toLowerCase())) &&
            (filter.command === "" || element.command.toLowerCase().includes(filter.command.toLowerCase())) &&
            (filter.roomName === "" || (element.roomName || "").toLowerCase().includes(filter.roomName.toLowerCase()))
        );
    });

    return (
        <div className="admin-control-panel">
            <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
                <input
                    type="text"
                    placeholder="Leia ID kaudu"
                    value={filter.id}
                    onChange={e => setFilter(f => ({ ...f, id: e.target.value }))}
                />
                <input
                    type="text"
                    placeholder="Leia nime kaudu"
                    value={filter.name}
                    onChange={e => setFilter(f => ({ ...f, name: e.target.value }))}
                />
                <input
                    type="text"
                    placeholder="Leia nupu nimetuse kaudu"
                    value={filter.command}
                    onChange={e => setFilter(f => ({ ...f, command: e.target.value }))}
                />
                <input
                    type="text"
                    placeholder="Leia ruumi nime kaudu"
                    value={filter.roomName}
                    onChange={e => setFilter(f => ({ ...f, roomName: e.target.value }))}
                />
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>ID</th>
                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>Malli nimi</th>
                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>Käsk</th>
                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>Ruum</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredElements.map((element: ButtonTemplate) => (
                        <tr key={element.id}>
                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                                {element.id}
                            </td>
                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                                {element.name}
                            </td>
                            <td style={{
                                border: "1px solid #ccc",
                                padding: "8px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <button className="btn-grad">{element.command}</button>
                            </td>
                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                                {element.roomName}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}