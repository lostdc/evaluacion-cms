import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Table, Container, Row, Col,Alert, Modal } from 'react-bootstrap';
import BaseLayout from './BaseLayout'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { fetchWithAuth, createCategories, updateCategories, deleteCategory, loadCategories} from './api/api';
import { Category,ApiResponse } from './types/types';
import { checkApiResponse } from '../helpers/apiHelpers';
import NotificationService from '../helpers/notificationService';

// Definir un tipo para la respuesta del servidor
const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [editing, setEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState<number | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const loadedCategories = await loadCategories();
      setCategories(loadedCategories);
    } catch (error) {
      if (error instanceof Error) {
        // Utiliza NotificationService para mostrar el mensaje de error
        NotificationService.showError(error.message);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = { name, description };

    let response;
    if (editing) {
      if (editingId !== null) {
        response = await updateCategories(editingId, payload);
      } else {
        console.error('Error: editingId es nulo.');
        return;
      }
    } else {
      response = await createCategories(payload);
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

  // Función para mostrar el modal de confirmación
  const handleDeleteClick = (categoryId: number) => {
    setShowDeleteConfirmation(true);
    setDeleteCategoryId(categoryId);
  };
  
  // Función para manejar la cancelación de la eliminación
  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setDeleteCategoryId(null);
  };

  // Función modificada para manejar la eliminación
  const handleDelete = async () => {
    if (deleteCategoryId !== null) {
      try {
        const response = await deleteCategory(deleteCategoryId);
        const data: ApiResponse<any> = await response.json(); // Asegúrate de que la respuesta se haya convertido a JSON
        if (!response.ok || data.status === "Error") {
          throw new Error(data.message || "Error al eliminar la categoría.");
        }
  
        setAlert({ type: 'danger', message: data.message });
        loadCategories();
      } catch (error) {
        if (error instanceof Error) {
          NotificationService.showError(error.message);
        }
      }
    }
    setShowDeleteConfirmation(false);
    setDeleteCategoryId(null);
  };
  
    

  return (
    <BaseLayout>
      <Modal show={showDeleteConfirmation} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas eliminar esta categoría?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
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
                      <Button variant="danger" onClick={() => handleDeleteClick(category.id)}><FontAwesomeIcon icon={faTrash} /></Button>
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
