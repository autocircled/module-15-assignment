import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

function AppNavbar() {
    return (
        <>
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <Navbar.Brand>
                        <NavLink className='nav-link' to="/">AC Student Portal</NavLink>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <NavLink className='nav-link' to="/">Home</NavLink>
                        <NavLink className='nav-link' to="/register">Register</NavLink>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default AppNavbar;