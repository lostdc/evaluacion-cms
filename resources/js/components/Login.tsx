import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, InputGroup, FormControl } from 'react-bootstrap';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        // Verifica si ya existe un token en el almacenamiento local
        const token = localStorage.getItem('token');
        if (token) {
            // Si existe un token, redirige al usuario a la página principal
            window.location.href = '/home';
        }
        // No hay dependencias en este efecto, por lo que se deja el array vacío
    }, []); // Array de dependencias vacío ya que no dependemos de ninguna variable o estado

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            // Realiza la solicitud de login.
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const data = await response.json();
            // Guardamos el token y otros datos relevantes en el Local Storage.
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            localStorage.setItem('permissions', JSON.stringify(data.permissions));
            localStorage.setItem('user', JSON.stringify(data.user));
            // Redirige al usuario a la página principal
            window.location.href = '/home';
            
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Card style={{ width: '400px' }} className="p-4">
                <Card.Body>
                    <h2 className="text-center mb-4">Iniciar Sesión</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Ingresa tu email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <InputGroup>
                                <FormControl
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <InputGroup.Text onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeSlashFill /> : <EyeFill />}
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            Iniciar Sesión
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;
