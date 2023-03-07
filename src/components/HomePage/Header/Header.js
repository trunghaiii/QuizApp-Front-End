
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.scss';
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const Header = () => {
    const navigate = useNavigate();
    return (
        <div className='nav-container'>
            <Navbar expand="lg">
                <Container>
                    <Link className='navbar-brand' to="/">Quiz</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link className='nav-link' to="/">Home</Link>
                            <Link className='nav-link' to="/user">User</Link>
                            <Link className='nav-link' to="/admin">Admin</Link>
                        </Nav>
                        <Nav>
                            <Button className='btn-login' onClick={() => navigate("/login")}>Login</Button>
                            <Button className='btn-signup' onClick={() => navigate("/register")}>Sign Up</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>

    );
}

export default Header;