import { useEffect, useState } from 'react'
// Bootstrap Components 
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

// React-Router Components 
import { BrowserRouter, Routes, Route  } from 'react-router-dom'



// Pages
import Landing from './components/pages/Landing'
import LoginPage from './components/pages/LoginPage'
import FragmentIndex from './components/pages/FragmentIndex'
import Sequencer from './components/pages/Sequencer'
import NavBar from './components/pages/common/NavBar'
import UserProfile from './components/pages/UserProfile'


const App = () => {
  // ! Vars

  // ! State
  
  // ! Execution

  // ! JSX
  return (
    <Container className="page-wrapper">
      <BrowserRouter>
        {/* These components are displayed on all pages */}
        <NavBar />
        <Routes>
          {/* Page routing goes below */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/fragments" element={<FragmentIndex />} />
          <Route path="/sequencer" element={<Sequencer />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </Container>
  )
}

export default App
