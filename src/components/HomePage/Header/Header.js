
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './Header.scss';
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux'

const Header = () => {
    const navigate = useNavigate();

    const account = useSelector((state) => state.user.account)
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated)

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
                            {isAuthenticated === false
                                ?
                                <>
                                    < Button className='btn-login' onClick={() => navigate("/login")}>Login</Button>
                                    <Button className='btn-signup' onClick={() => navigate("/register")}>Sign Up</Button>
                                </>

                                :
                                <>
                                    <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                                        <Dropdown.Item href="#/action-1">Logout</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Profile</Dropdown.Item>
                                    </DropdownButton>
                                </>

                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div >

    );
}

export default Header;