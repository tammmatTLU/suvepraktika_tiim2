import { useAppSelector } from "../store/hooks";
import type { ButtonTemplate } from "../types/Element";

export default function AdminDeviceControlPanel() {
    // Get all button templates from the store
    const elements: Record<number, ButtonTemplate> = useAppSelector(
        state => state.buttonTemplate.elements
    );

    return (
        <div className="admin-control-panel">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>ID</th>
                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>Template Name</th>
                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>Command</th>
                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>Room Name</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(elements).map((element: ButtonTemplate) => (
                        <tr key={element.id}>
                            <td 
                                style={{
                                    border: "1px solid #ccc",
                                    padding: "8px",
                                }}>
                                    {element.id}
                            </td>
                            <td 
                                style={{
                                    border: "1px solid #ccc",
                                    padding: "8px",
                                }}
                            >
                                    {element.name}
                            </td>
                            <td 
                                style={{
                                    border: "1px solid #ccc",
                                    padding: "8px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <button className="btn-grad">{element.command}</button>
                            </td>
                            <td 
                                style={{
                                    border: "1px solid #ccc",
                                    padding: "8px",
                                }}
                            >
                                {element.roomName}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}