import { Routes, Route } from 'react-router-dom'
import './App.css'
import Spell from './pages/spell/index.jsx'
import Main from "./pages/main/index.jsx";

function App() {
  return (
    <Routes>
      <Route path="/spell" element={<Spell />} />
      <Route path="/" element={<Main />} />
    </Routes>
  )
}

export default App
