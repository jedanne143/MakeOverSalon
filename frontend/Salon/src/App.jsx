import {Routes, Route, Navigate} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Services from './pages/Services'
import Bookings from './pages/Bookings'
import Socials from './pages/Socials'
import Admin from './pages/Admin'
import { Container } from '@mui/material'


function App() {

  return (
    
    <Container maxWidth={false}  disableGutters
    sx={{
      margin:0,
      width: '100%',
      minHeight: '100vh',
      flexDirection: 'column',
      boxSizing:'border-box'
      
    }}>
      <Navbar />
      <Routes>
        {/* Redirect from root path '/' to '/home' */}
        <Route path='/' element={<Navigate to='/home' replace />}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/services' element={<Services/>} />
        <Route path='/bookings' element ={<Bookings/>} />
        <Route path='/socials' element = {<Socials/>} />
        <Route path= '/admin' element = {<Admin/>} />
      </Routes>
    </Container>
    
  )
}
export default App

