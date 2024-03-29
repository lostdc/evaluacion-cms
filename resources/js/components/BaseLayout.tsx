// BaseLayout.jsx
import React from 'react';
import { Container, Navbar, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { userHasPermission, IsAuthenticated } from '../helpers/permissionHelpers'; // Importa la función para verificar permisos

const BaseLayout: React.FC<{ children: React.ReactNode, searchFilters?: React.ReactNode }> = ({ children, searchFilters }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('permissions');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className="mb-4" style={{ borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem' }}>
                <Container>
                    <Navbar.Brand href="/">Gestión Contenido</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">
                        {searchFilters} {/* Posición para los filtros de búsqueda */}
                        <Dropdown align={{ lg: 'end' }}>
                            <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                                Menú 
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => navigate('/home')}>Home</Dropdown.Item>
                                {userHasPermission("show_view_categories") && <Dropdown.Item onClick={() => navigate('/category')}>Categorías</Dropdown.Item>}
                                {userHasPermission("show_view_categories") && <Dropdown.Item onClick={() => navigate('/tags')}>Tags</Dropdown.Item>}

                                {IsAuthenticated()  && <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>}
                                {!IsAuthenticated()  && <Dropdown.Item onClick={() =>   window.location.href = '/login' }>Login</Dropdown.Item>}
                            </Dropdown.Menu>
                        </Dropdown>
                        <span className='ms-md-4' style={{ color: 'white' }}>
                               Bienvenido {JSON.parse(localStorage.getItem('user')).name}
                        </span>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container fluid style={{ backgroundColor: '#1B9CFC', minHeight: '100vh', padding: '2rem', marginRight: "20px" }}>
                {children}
           </Container>
        </>
    );
};

export default BaseLayout;
