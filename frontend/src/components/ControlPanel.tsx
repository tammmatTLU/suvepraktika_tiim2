import DeviceToggle from '../components/DeviceToggle'

type Device = { id: string, name: string };
type Props = { devices: Device[]};

export default function ControlPanel( { devices }: Props ) {
    
    return(
        <div className="control-panel">
            {devices.map((device) => {
                return(
                    <DeviceToggle key={device.id} name={device.name}/>
                )
            })}
        </div>
    )
}