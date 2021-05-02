import React, { useState } from "react";

import {
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    CardFooter,
    Button,
    FormText,
} from 'reactstrap';

function Lydoxuatkho() {
    return (
<Form action="" className="form-horizontal">
            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Lý do</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input
                        type="text"
                        id="lydo"
                        name="lydo"
                        placeholder="Lý do xuất kho..."

                    />
                </Col>
            </FormGroup>

            
        </Form >
    );
}

export default Lydoxuatkho;