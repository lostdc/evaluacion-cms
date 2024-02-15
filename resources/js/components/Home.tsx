import React, { useState, useEffect } from 'react';
import { Container, Navbar, Button, FormControl, ListGroup, Row, Col, Card, Form, InputGroup, Badge, Dropdown } from 'react-bootstrap';
import { userHasPermission } from '../helpers/permissionHelpers';
import { useNavigate } from 'react-router-dom';
import BaseLayout from './BaseLayout'; // Asegúrate de que la ruta de importación sea correcta
import { Post, Category } from './types/types'; 


const Home: React.FC = () => {
    const categories: Category[] = [
        { id: 1, name: "Categoria 1" },
        { id: 2, name: "Categoria 2" }
    ];

    const [posts, setPosts] = useState<Post[]>([]);
    const [titleFilter, setTitleFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const loadPosts = async () => {
        const response = await fetch(`/api/posts?title=${titleFilter}&category=${categoryFilter}`);
        if (response.ok) {
            const posts = await response.json();
            setPosts(posts.data);
        }
    };

    useEffect(() => {
        loadPosts();
    }, [titleFilter, categoryFilter]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleFilter(e.target.value);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoryFilter(e.target.value);
    };

    const navigate = useNavigate();

    const searchFilters = (
        <Row className="ml-auto" style={{ width: '100%' }}>
            <Col xs={12}>
                <InputGroup>
                    <FormControl
                      type="text"
                      placeholder="Buscar por título o tag"
                      className="mr-sm-2"
                      onChange={handleTitleChange} // Añadido para manejar cambios
                    />
                    <Form.Control as="select" className="mr-sm-2" onChange={handleCategoryChange}> {/* Añadido para manejar cambios */}
                        <option value="">Todas las categorías</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </Form.Control>
                    <Button variant="outline-light" onClick={loadPosts}>Buscar</Button>
                </InputGroup>
            </Col>
        </Row>
    );


    return (
        <BaseLayout searchFilters={searchFilters}>
        <>
            {userHasPermission('create_posts') && (
            <Row className="mb-4 justify-content-center">
                <Col xs={12} md={8} lg={6}>
                <Button variant="success" className="w-100 mb-3" onClick={() => navigate('/create-post')}>
                    + Nuevo Post
                </Button>
                </Col>
            </Row>
            )}
            <Row className="justify-content-center">
            {posts.map(post => (
                <Col key={post.id} className="mb-4 d-flex align-items-stretch" style={{ maxWidth: '300px' }}>
                <Card 
                    className="w-100 shadow-sm" // Asegura que la tarjeta ocupe el ancho disponible pero no más de 300px
                    onClick={() => navigate(`/post/${post.id}`)}
                    style={{ cursor: 'pointer', margin: '0 auto' }} // Centra la tarjeta en la columna
                >
                    <Card.Img variant="top" src={"https://static.vecteezy.com/system/resources/previews/005/723/771/large_2x/photo-album-icon-image-symbol-or-no-image-flat-design-on-a-white-background-vector.jpg"} />
                    <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text as="div">
                        <div>Categoría: {post.category?.name ?? 'No definido'}</div>
                        <div>Autor: {post.user?.name ?? 'No definido'}</div>
                        <div>
                        {post.tags.map(tag => (
                            <Badge key={tag.id} bg="primary" className="mr-2 mb-2">{tag?.name ?? 'No definido'}</Badge>
                        ))}
                        </div>
                    </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
            ))}
            </Row>
        </>
        </BaseLayout>

    );
};

export default Home;
