// React-Router-Dom Components
import { Link, NavLink, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

// Bootstrap components 
import Navbar from 'react-bootstrap/Navbar'
import { Nav } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'

// Custom exports
import logo from '../../../images/logo.png'


const NavBar = () => {
  // ! State

  // ! Navigation
  const navigate = useNavigate()

  // ! JSX
  return (
    <Navbar expand='md' className='navbar-sticky-top navbar-light bg-light'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          <img
            src={logo}
            height='30px'
            alt='logo'
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
          <Nav>
            <Nav.Link className='nav-item nav-link' as={Link} to='/'>Fragments</Nav.Link>
            <Nav.Link className='nav-item nav-link' as={Link} to='/fragments/create'>Create Fragment</Nav.Link>
            <Nav.Link className='nav-item nav-link' as={Link} to='/profile'>Profile</Nav.Link>
            <Nav.Link className='nav-item nav-link' as={Link} to='/login'>Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}


export default NavBar