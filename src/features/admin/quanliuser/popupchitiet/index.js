import React, { useState } from "react";
import Select from "react-select";
import {
    Button, CardFooter, Col,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';



function ChitietThukho() {

    

    return (
        <Form action="" className="form-horizontal">
            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Tên thủ kho</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input
                        type="text"
                        id="tenthukho"
                        name="tenthukho"
                        value="Tran Van A"

                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Email</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input
                        type="text"
                        id="Email"
                        name="Email"
                        value="tuan@gmail.com"
                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Chức vụ</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input
                        type="text"
                        id="chucvu"
                        name="chucvu"
                        value="Thủ kho"
                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Số điện thoại</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input
                        type="text"
                        id="sdt"
                        name="sdt"
                        value="0123333333333"
                    />
                </Col>
            </FormGroup>
        </Form >
    );
}

export default ChitietThukho;