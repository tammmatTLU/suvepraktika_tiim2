import {Route, Routes} from "react-router-dom"
import DeviceControlPage from "./pages/DeviceControlPage"
import LoginPage from "./pages/LoginPage"
import ActionSelectPage from "./pages/ActionSelectPage"
import UIConfigPage from "./pages/UIConfigPage"
import AutomationConfigPage from "./pages/AutomationConfigPage"
import ViewCreationPage from "./pages/ViewCreationPage"
import RoomSelectionPage from "./pages/RoomSelectionPage"


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/action-select' element={<ActionSelectPage/>}/>
        <Route path='/room-selection/:action' element={<RoomSelectionPage/>}/>
        <Route path='/device-control/:remoteName' element={<DeviceControlPage />}/>
        <Route path='/ui-config' element={<UIConfigPage/>}/>
        <Route path='/automation-config' element={<AutomationConfigPage/>}/>
        <Route path='/view-creation' element={<ViewCreationPage/>}/>
      </Routes>
    </>
  )
}

export default App
