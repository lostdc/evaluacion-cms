import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Table, Container, Row, Col } from 'react-bootstrap';
import BaseLayout from './BaseLayout'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { fetchWithAuth } from '../helpers/utils';
import { Alert } from 'react-bootstrap';
// Definir un tipo para las categorías
type Category = {
  id: number;
  name: string;
  description: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
};

// Definir un tipo para la respuesta del servidor
type ApiResponse = {
  status: string;
  message: string;
  data: Category[];
};

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [editing, setEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);


  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const response = await fetchWithAuth('/api/categories');
    const data: ApiResponse = await response.json();
    if (response.ok) {
      setCategories(data.data);
    } else {
      console.error('Error cargando las categorías:', data.message);
    }
  };

  const handleApiResponse = (response: ApiResponse) => {
    setAlert({
      type: response.status === "Success" ? 'success' : 'danger',
      message: response.message,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = { name, description };

    let response;
    if (editing) {
      response = await fetchWithAuth(`/api/categories/${editingId}`, {
        method: 'PUT',
        body: payload,
      });
    } else {
      response = await fetchWithAuth('/api/categories', {
        method: 'POST',
        body: payload,
      });
    }


    if (response.ok) {

      const data = await response.json(); // Se espera que la API siempre responda con un JSON válido.
      setAlert({ type: 'success', message: data.message });

      loadCategories();
      setName('');
      setDescription('');
      setEditing(false);
      setEditingId(null);
    } else {
      console.error('Error al guardar la categoría');
    }
  };

  const handleEdit = async (categoryId: number) => {
    const categoryToEdit = categories.find(c => c.id === categoryId);
    if (categoryToEdit) {
      setName(categoryToEdit.name);
      setDescription(categoryToEdit.description);
      setEditing(true);
      setEditingId(categoryId);
    }
  };

  const handleDelete = async (categoryId: number) => {
    const response = await fetchWithAuth(`/api/categories/${categoryId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      const data = await response.json(); // Se espera que la API siempre responda con un JSON válido.
      setAlert({ type: 'danger', message: data.message });
      loadCategories();
    } else {
      console.error('Error al eliminar la categoría');
    }
  };

  return (
    <BaseLayout>
      <Container>
        {alert && (
            <Alert variant={alert.type} onClose={() => setAlert(null)} dismissible>
            {alert.message}
            </Alert>
        )}
        <Row>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>{editing ? 'Modificar' : 'Registrar'} Categoría</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control as="textarea" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
                  </Form.Group>
                  <Button variant="primary" type="submit">{editing ? 'Modificar' : 'Guardar'}</Button>
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
