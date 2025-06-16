import './App.css'
import Footer from './pages/Footer'
import Header from './pages/Header'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Register from './pages/Register'
import Login from './pages/Login'
import Quantity from './pages/Quantity'
import Cart from './pages/Cart'
import Address from './pages/Address'
import Reviews from './pages/Reviews'


function App() {
 

  return (
    <>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='detail/:id' element={<Detail/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='quantity/:id' element={<Quantity/>}/>
        <Route path='cart' element={<Cart/>}/>
        <Route path='address/:id' element={<Address/>}/>
        <Route path='reviews/:id' element={<Reviews/>}/>
        
      </Routes>
    <Footer/>
    
    </>
  )
}

export default App
