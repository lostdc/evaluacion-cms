import React from 'react';
import { Container, Navbar, Button, FormControl, ListGroup, Row, Col, Card, Form, InputGroup } from 'react-bootstrap';

interface Category {
  id: number;
  name: string;
}

const Home: React.FC = () => {
    // Suponemos que tendrás un estado para las categorías
    const categories: Category[] = [
        { id: 1, name: "Categoria 1" },
        { id: 2, name: "Categoria 2" }
      ];

    return (
        <Container fluid style={{ backgroundColor: '#e9ecef', minHeight: '100vh', padding: '2rem' }}>
            <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
                <Navbar.Brand href="/">Gestion Contenido</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Form className="ml-auto">
                        <InputGroup>
                            <FormControl type="text" placeholder="Buscar por título o tag" className="mr-sm-2" />
                            <Button variant="outline-light">Buscar</Button>

                            
                           
                        </InputGroup>
                    </Form>
                </Navbar.Collapse>
            </Navbar>

            <Row>
                <Col md={9}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Posts</Card.Title>
                            <ListGroup variant="flush">
                                {/* Aquí iría el código para listar los posts, por ahora está simulado */}
                                <ListGroup.Item action href="/post/1">Post de ejemplo 1</ListGroup.Item>
                                <ListGroup.Item action href="/post/2">Post de ejemplo 2</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={3}>
                    <Row className="mb-4">
                        <Col>
                            <Button variant="success" className="w-100 mb-3">+ Nuevo Post</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="categorySelect">
                                <Form.Label>Categoría</Form.Label>
                                <Form.Control as="select" custom>
                                    {/* Aquí mapearás las categorías para llenar el select */}
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;