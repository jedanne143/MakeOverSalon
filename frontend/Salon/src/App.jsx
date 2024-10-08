import {Routes, Route, Navigate} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Services from './pages/Services'
import Bookings from './pages/Bookings'
import Socials from './pages/Socials'
import Admin from './pages/Admin'
'./App.css'


function App() {

  return (
    
    <main className="mainContainer">
      <Navbar />
      {/* Pages to show */}
      <Routes>
        {/* Redirect from root path '/' to '/home' */}
        <Route path='/' element={<Navigate to='/home' replace />}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/services' element={<Services/>} />
        <Route path='/bookings' element ={<Bookings/>} />
        <Route path='/socials' element = {<Socials/>} />
        <Route path= '/admin' element = {<Admin/>} />
      </Routes>
    </main>
    
  )
}
export default App

