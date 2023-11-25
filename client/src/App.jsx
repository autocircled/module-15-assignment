import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreateProfilePage from './pages/CreateProfilePage'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-new" element={<CreateProfilePage />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
