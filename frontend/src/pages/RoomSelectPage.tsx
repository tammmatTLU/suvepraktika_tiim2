import RoomSelect from "../components/RoomSelect";
import BackButton  from "../components/BackButton";


export default function RoomSelectPage() {
    
    return (
        <div className="grid-layout">
            <header>
                <h1>Toa valik</h1>
                <BackButton />
            </header>
            <RoomSelect/>
        </div>
    );
} 