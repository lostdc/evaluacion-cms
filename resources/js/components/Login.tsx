import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, InputGroup, FormControl, Alert } from 'react-bootstrap';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showAlert, setShowAlert] = useState(false); // Estado para controlar la visibilidad del alerta

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            window.location.href = '/home';
        }
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setShowAlert(false); // Oculta el alerta al enviar el formulario

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                if(response.statusText === "Unauthorized"){
                    setShowAlert(true); // Muestra el alerta si las credenciales no son válidas
                }
                throw new Error('Error en la solicitud');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            localStorage.setItem('permissions', JSON.stringify(data.permissions));
            localStorage.setItem('user', JSON.stringify(data.user));
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
                    {/* Alerta de error de inicio de sesión */}
                    {showAlert && (
                        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                            Acceso no autorizado. Por favor, verifica tus credenciales.
                        </Alert>
                    )}
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
