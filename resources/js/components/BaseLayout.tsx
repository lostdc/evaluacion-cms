// src/components/BaseLayout.tsx
import React from 'react';
import { Container, Navbar, Dropdown } from 'react-bootstrap';
import { Left } from 'react-bootstrap/lib/Media';
import { useNavigate } from 'react-router-dom';

const BaseLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className="mb-4" style={{ borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem' }}>
                <Container>
                    <Navbar.Brand href="/">Gestión Contenido</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">
                        <Dropdown align={{ lg: 'end' }}>
                            <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                                Menú 
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => navigate('/category')}>Categorías</Dropdown.Item>
                                <Dropdown.Item onClick={() => navigate('/tags')}>Tags</Dropdown.Item>
                                <Dropdown.Item onClick={() => navigate('/logout')}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
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



