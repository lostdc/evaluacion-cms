import React, { useState } from 'react';
import { Container, Form, Button, Card, InputGroup, FormControl } from 'react-bootstrap';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [countdown, setCountdown] = useState(5);

    const validatePassword = (password: string): boolean => {
        const regex = /^(?=.*\d)(?=.*\W)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return regex.test(password);
    };

    const validateEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const isFormValid = (): boolean => {
        return (
            validateEmail(email) &&
            validatePassword(password) &&
            password === confirmPassword
        );
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = {
            name: 'Nombre de Usuario', // Asegúrate de tener este campo en tu formulario o ajusta según sea necesario
            email: email,
            password: password,
            password_confirmation: confirmPassword
        };

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const data = await response.json();
            console.log(data); // Maneja la respuesta
            setSuccessMessage('Registro exitoso. Serás redirigido al login en 5 segundos...');

            // Inicia la cuenta regresiva para la redirección
            const intervalId = setInterval(() => {
                setCountdown((currentCountdown) => {
                    if (currentCountdown <= 1) {
                        clearInterval(intervalId);
                        window.location.href = '/login'; // Ajusta según tu ruta de login
                        return 0;
                    }
                    return currentCountdown - 1;
                });
            }, 1000);
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Card style={{ width: '400px' }} className="p-4">
                <Card.Body>
                    {successMessage ? (
                        <>
                            <p>{successMessage}</p>
                            <p>Redirigiendo en {countdown} segundos...</p>
                        </>
                    ) : (
                        <>
                            <h2 className="text-center mb-4">Registro de Usuario</h2>
                            <Form onSubmit={handleSubmit}>
                                {/* El resto del formulario */}
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Ingresa tu email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <InputGroup>
                                        <FormControl
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Contraseña"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            isInvalid={!validatePassword(password) && password.length > 0}
                                            isValid={validatePassword(password)}
                                        />
                                        <InputGroup.Text onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <EyeSlashFill /> : <EyeFill />}
                                        </InputGroup.Text>
                                        <Form.Control.Feedback type="invalid">
                                            La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, un número y un carácter especial.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formConfirmPassword">
                                    <InputGroup>
                                        <FormControl
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirma tu Contraseña"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            isInvalid={password !== confirmPassword && confirmPassword.length > 0}
                                            isValid={password === confirmPassword && confirmPassword.length > 0}
                                        />
                                        <InputGroup.Text onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                            {showConfirmPassword ? <EyeSlashFill /> : <EyeFill />}
                                        </InputGroup.Text>
                                        <Form.Control.Feedback type="invalid">
                                            Las contraseñas no coinciden.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100" disabled={!isFormValid()}>
                                    Registrarse
                                </Button>
                            </Form>
                        </>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Register;

