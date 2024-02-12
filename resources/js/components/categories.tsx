import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Table, Container, Row, Col } from 'react-bootstrap';
import BaseLayout from './BaseLayout'; // Asegúrate de que la ruta de importación sea correcta
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const Categories = () => {
    // Estados para manejar las categorías y el formulario
    const [category, setCategory] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    // Cargar categorías (simulación)
    useEffect(() => {
        // Aquí iría la lógica para cargar las categorías desde tu API
    }, []);

    // Manejadores de eventos para el formulario
    const handleNameChange = (e) => setName(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para agregar una nueva categoría
    };

    // Funciones para editar y eliminar
    const handleEdit = (categoryId) => {
        // Lógica para editar una categoría
    };
    const handleDelete = (categoryId) => {
        // Lógica para eliminar una categoría
    };

    const categories = [
        {
          id: 1,
          name: "Tecnología",
          description: "Todo sobre las últimas tendencias tecnológicas, gadgets y software."
        },
        {
          id: 2,
          name: "Deportes",
          description: "Noticias, análisis y comentarios sobre eventos deportivos y atletas."
        },
        {
          id: 3,
          name: "Cultura",
          description: "Explorando las artes, la literatura, y eventos culturales alrededor del mundo."
        }
      ];

    return (
        <BaseLayout>
            <Container>
                <Row>
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Registrar Categoría</Card.Title>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control type="text" value={name} onChange={handleNameChange} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Descripción</Form.Label>
                                        <Form.Control as="textarea" rows={3} value={description} onChange={handleDescriptionChange} />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">Guardar</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={8}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr key={category.id}>
                                        <td>{category.name}</td>
                                        <td>{category.description}</td>
                                        <td>
                                            <Button variant="info" onClick={() => handleEdit(category.id)}><FontAwesomeIcon icon={faEdit} /></Button>{' '}
                                            <Button variant="danger" onClick={() => handleDelete(category.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </BaseLayout>
    );
};

export default Categories;