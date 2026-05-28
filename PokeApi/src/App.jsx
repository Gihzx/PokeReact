
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import  DetalhesPokemon  from './pages/DetalhesPokemon'
function App() {


  return (
    <>
    <Routes>
      <Route  path='/' element = {<Home />}/>
      <Route path='/pokemon/:id' element={<DetalhesPokemon/>}/>
    </Routes>
  
    </>
  )
}

export default App
