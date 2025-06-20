import {Route, Routes} from "react-router-dom"
import DeviceControlPage from "./pages/DeviceControlPage"
import LoginPage from "./pages/LoginPage"
import ActionSelectPage from "./pages/ActionSelectPage"
import UIConfigPage from "./pages/UIConfigPage"
import AutomationConfigPage from "./pages/AutomationConfigPage"
import CreateAccountPage from "./pages/CreateAccountPage"
import RoomSelectPage from "./pages/RoomSelectPage"
import ProtectedRoutes from "./utils/ProtectedRoutes"
import AdminDeviceControlPage from "./pages/AdminDeviceControlPage"


function App() {
  return (
    <>
      <Routes>
        <Route index path='/' element={<LoginPage/>}/>
				<Route element={<ProtectedRoutes/>}>
          <Route path='/action-select' element={<ActionSelectPage/>}/>
          <Route path='/room-selection/:action' element={<RoomSelectPage/>}/>
          <Route path='/device-control/:userName' element={<DeviceControlPage />}/>
          <Route path='/ui-config/:userName' element={<UIConfigPage/>}/>
          <Route path='/automation-config' element={<AutomationConfigPage/>}/>
          <Route path='/view-creation' element={<CreateAccountPage/>}/>
          <Route path='/device-control/central-control-panel' element={<AdminDeviceControlPage/>}/>
				</Route>
      </Routes>
    </>
  )
}

export default App