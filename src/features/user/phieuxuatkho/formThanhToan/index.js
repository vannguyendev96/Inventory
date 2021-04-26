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

function PhuongThucThanhToan() {
    return (
<Form action="" className="form-horizontal">
            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Số tiền thanh toán</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input
                        type="number"
                        id="sotienthanhtoan"
                        name="sotienthanhtoan"
                        placeholder="Số tiền thanh toán..."

                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Phương thức thanh toán</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input
                        type="text"
                        id="phuongthucthanhtoan"
                        name="phuongthucthanhtoan"
                        placeholder="Phương thức thanh toán..."
                    />
                </Col>
            </FormGroup>
        </Form >
    );
}

export default PhuongThucThanhToan;