import ControlPanel from '../components/ControlPanel'
import { useParams } from 'react-router-dom';

export default function DeviceControlPage() {
    const remoteName = useParams<{ remoteName: any }>().remoteName || 'A-001';
    const devices = [
        { id: 'device1', name: 'Seade 1' },
        { id: 'device2', name: 'Seade 2' },
        { id: 'device3', name: 'Seade 3' },
        { id: 'device4', name: 'Seade 4' }
    ];
    return(
        <div className="grid-layout">
            <header>
                <h1>{remoteName}</h1>
            </header>
            <ControlPanel devices={devices}/>
        </div>
    )
}