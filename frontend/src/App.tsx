import {Route, Routes} from "react-router-dom"
import DeviceControlPage from "./pages/DeviceControlPage"

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<DeviceControlPage/>}/>
      </Routes>
    </>
  )
}

export default App
