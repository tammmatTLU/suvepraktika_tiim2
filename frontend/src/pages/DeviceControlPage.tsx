import HeaderBar from '../components/HeaderBar'
import DeviceToggle from '../components/DeviceToggle'

export default function DeviceControlPage(){
    const roomId = "A-001"
    const devices = {
        'A-001': [
            { id: 'lights', name: 'Tuled' },
            { id: 'screen', name: 'Ekraan' },
            { id: 'projector', name: 'Projektor' },
            { id: 'seade1', name: 'seade' },
            { id: 'seade2', name: 'seade' },
            { id: 'seade3', name: 'seade' },
        ]}
    return(
        <>
        <HeaderBar/>
        <div className="control-panel">
            {devices[roomId].map((device) => {
                return(
                    <DeviceToggle key={device.id} name={device.name}/>
                )
            })}
        </div>
        </>
    )
}