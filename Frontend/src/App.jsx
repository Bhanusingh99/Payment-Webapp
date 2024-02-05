import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Signup from './components/Signup'
import Signin from './components/Signin'
import DashBoard from './components/DashBoard'
import SendMoney from './components/SendMoney'

export function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}