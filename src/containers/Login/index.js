import React, { useState, useEffect } from 'react';
import Layout from "../../components/layout/index";
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import input from "../../components/UI/Input/index";
import { login, isUserLoggedIn } from "../../actions";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useSelector(state => state.auth)

    const dispatch = useDispatch();


    const userLogin = (e) => {
        e.preventDefault();
        const user = {
            email,
            password
        }
        dispatch(login(user));
    }

    if (auth.authenticate) {
        return <Redirect to={'/'} />
    }
    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '80px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userLogin}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>

            </Container>
        </Layout>
    )
}

export default Login;
