import React, { useState } from 'react';
import Layout from "../../components/layout/index";
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Input from "../../components/UI/Input/index";
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterUser } from "../../actions";

const Register = (props) => {

    const auth = useSelector(state => state.auth);
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const formSubmit = (e) => {
        e.preventDefault();
        const user = {
            firstName, lastName, email, password
        }
        console.log(user);
        dispatch(RegisterUser(user));

    }

    if (auth.authenticate) {
        return <Redirect to={'/'} />
    }

    if (user.loading) {
        return <p>Loading...!</p>
    }
    return (
        <Layout>
            <Container>
                {/* {user.message} */}
                <Row style={{ marginTop: '80px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={formSubmit}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter First Name" onChange={(e) => setfirstName(e.target.value)} />
                                    </Form.Group>

                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Last Name" onChange={(e) => setlastName(e.target.value)} />
                                    </Form.Group>

                                </Col>
                            </Row>
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

export default Register;