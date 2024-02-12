import React, { useState, useEffect } from 'react';
import { Container, Navbar, Button, FormControl, ListGroup, Row, Col, Card, Form, InputGroup, Badge, Dropdown  } from 'react-bootstrap';
import { userHasPermission } from '../helpers/permissionHelpers';
import { useNavigate } from 'react-router-dom';// Asegúrate de importar useHistory para la redirección


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

    // Types Post
    interface Post {
        id: number;
        title: string;
        category: {
        name: string;
        };
        user: {
        name: string;
        };
        tags: Array<{ name: string }>;
    }

    const [posts, setPosts] = useState<Post[]>([]);
    const [titleFilter, setTitleFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');


    //carga los posts
    const loadPosts = async () => {
        const response = await fetch(`/api/posts?title=${titleFilter}&category=${categoryFilter}`);
        if (response.ok) {
        const data = await response.json();
        setPosts(data);
        }
    };

    // Cargar posts al montar el componente y cuando los filtros cambien
    useEffect(() => {
        loadPosts();
    }, [titleFilter, categoryFilter]);


    // Handlers para los filtros
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleFilter(e.target.value);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoryFilter(e.target.value);
    };

    const navigate = useNavigate();
    return (
        <Container fluid style={{ backgroundColor: '#e9ecef', minHeight: '100vh', padding: '2rem' }}>
            <Navbar bg="primary" variant="dark" expand="lg" className="mb-4" style={{ borderRadius: '1rem' }}>
                <Navbar.Brand href="/">   Gestion Contenido</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Form inline className="ml-auto">
                        <InputGroup>
                            <FormControl
                              type="text"
                              placeholder="Buscar por título o tag"
                              className="mr-sm-2"
                            />
                            <Form.Control as="select" custom className="mr-sm-2">
                                {/* Asumiendo que tienes un estado categories para llenar este select */}
                                <option value="">Todas las categorías</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </Form.Control>
                            <Button variant="outline-light">Buscar</Button>
                        </InputGroup>
                    </Form>
                    
                </Navbar.Collapse>
                <Dropdown align={{ lg: 'end' }}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Menú Admin
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => navigate('/category')}>Categorías</Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/tags')}>Tags</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
            </Navbar>
    
            {/* Botón Nuevo Post visible solo si el usuario tiene el permiso 'create_posts' */}
            {userHasPermission('create_posts') && (
                <Row className="mb-4">
                    <Col>
                        <Button variant="success" className="w-100">+ Nuevo Post</Button>
                    </Col>
                </Row>
            )}


            <Row>
                {posts.map(post => (
                    <Col md={4} key={post.id} className="mb-4">
                        <Card 
                          style={{ width: '100%', cursor: 'pointer' }} 
                          onClick={() => history.push(`/post/${post.id}`)} // Redirige al hacer clic en la tarjeta
                        >
                            {/* Puedes usar una imagen predeterminada o comprobar si el post tiene una imagen */}
                            {/*<Card.Img variant="top" src={post.image || "ruta/a/una/imagen/estandar.jpg"} />*/}
                            <Card.Img variant="top" src={"https://static.vecteezy.com/system/resources/previews/005/723/771/large_2x/photo-album-icon-image-symbol-or-no-image-flat-design-on-a-white-background-vector.jpg"} />
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text>
                                    Categoría: {post.category.name}<br />
                                    Autor: {post.user.name}
                                    <div>
                                        {post.tags.map(tag => (
                                            <Badge key={tag.name} variant="primary" className="mr-2">{tag.name}</Badge>
                                        ))}
                                    </div>
                                </Card.Text>
                                {/* Elimina el botón ya que la tarjeta en sí es seleccionable */}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Home;