import {Routes, Route, Navigate} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Services from './pages/Services'
import Bookings from './pages/Bookings'
import About from './pages/About'
import Admin from './pages/Admin'
import './App.css'


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
        <Route path='/about' element = {<About/>} />
        <Route path= '/admin' element = {<Admin/>} />
      </Routes>
    </main>
    
  )
}
export default App