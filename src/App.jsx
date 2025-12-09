import { Routes, Route } from 'react-router-dom'
import './App.css'
import Spell from './pages/Spell/Spell'
import Main from "./pages/Main/index.jsx";

function App() {
  return (
    <Routes>
      <Route path="/spell" element={<Spell />} />
      <Route path="/" element={<Main />} />
    </Routes>
  )
}

export default App
