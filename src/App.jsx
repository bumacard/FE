import { Routes, Route } from 'react-router-dom'
import './App.css'
import Spell from './pages/spell/index.jsx'
import Main from './pages/main/index.jsx'
import SpeedTest from './pages/speedTest/index.jsx'
import WordsPage from './pages/words/index.jsx'

function App() {
  return (
    <Routes>
      <Route path="/words/spell" element={<Spell />} />
      <Route path="/speed-test" element={<SpeedTest />} />
      <Route path="/words" element={<WordsPage />} />
      <Route path="/" element={<Main />} />
    </Routes>
  )
}

export default App
