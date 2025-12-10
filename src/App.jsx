import { Routes, Route } from 'react-router-dom'
import './App.css'
import Spell from './pages/spell/index.jsx'
import Main from './pages/main/index.jsx'
import SpeedOptions from './pages/speed/Options.jsx'
import SpeedStart from './pages/speed/Start.jsx'
import SpeedResult from './pages/speed/Result.jsx'

function App() {
  return (
    <Routes>
      <Route path="/speed/result" element={<SpeedResult />} />
      <Route path="/speed/start" element={<SpeedStart />} />
      <Route path="/speed" element={<SpeedOptions />} />
      <Route path="/spell" element={<Spell />} />
      <Route path="/" element={<Main />} />
    </Routes>
  )
}

export default App
