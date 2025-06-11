import { Link } from "react-router-dom";

export default function ActionSelectPage() {
    return (
        <>
            <div className="form-group">
                <Link to="/room-selection/device-control">
                    <button className="btn-grad">Seadme juhtimine</button>
                </Link>
                <Link to="/room-selection/ui-config">
                    <button className="btn-grad">Puldi vaate redigeerimine</button>
                </Link>
                <Link to="/automation-config">
                    <button className="btn-grad">Ajapõhine automatiseerimine</button>
                </Link>
                <Link to="/view-creation">
                    <button className="btn-grad">Vaate loomine</button>
                </Link>
            </div>
        </>
    );
}