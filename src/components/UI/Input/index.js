import React from 'react';
import { Form } from 'react-bootstrap';

const Input = (props) => {
    return (
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>{props.label}</Form.Label>
            <Form.Control type={props.type} placeholder={props.place} />
            <Form.Text className="text-muted">
                {props.errormessage}
            </Form.Text>
        </Form.Group>


    )
}

export default Input;

