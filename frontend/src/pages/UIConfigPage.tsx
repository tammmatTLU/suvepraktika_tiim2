import BackButton from '../components/BackButton'
import RoomSelect from '../components/RoomSelect'

export default function UIConfigPage(){
    
    return(
        <div className="grid-layout">
            <header>
                <h1>Kasutajavaate redigeerimine</h1>
                <BackButton />
            </header>
            <RoomSelect />
        </div>
    )
}