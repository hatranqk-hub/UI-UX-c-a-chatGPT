import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Welcome to AI Chat App</div>} />
        <Route path="/chat" element={<div>Chat Page</div>} />
        <Route path="/auth" element={<div>Auth Page</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
