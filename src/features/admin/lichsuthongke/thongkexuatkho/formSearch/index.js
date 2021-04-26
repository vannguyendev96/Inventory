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
import Select from "react-select";

const optionsKho = [
    { value: 'khoa', label: 'Kho A' },
    { value: 'khob', label: 'Kho B' },
    { value: 'khoc', label: 'Kho c' },
];

const optionsNguoiTao = [
    { value: 'TranVanA', label: 'Tran Van A' },
    { value: 'TranVanB', label: 'Tran Van B' },
    { value: 'TranVanC', label: 'Tran Van C' },
];

function SearchReport() {
    return (
        <Form action="" className="form-horizontal">
            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Tìm kiếm theo kho hàng</Label>
                </Col>
                <Col xs="12" md="9">
                    <Select
                        defaultValue={optionsKho.filter(option => option.label === 'Kho A')}
                        options={optionsKho}
                        classNamePrefix="select"
                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Tìm kiếm theo người tạo</Label>
                </Col>
                <Col xs="12" md="9">
                <Select
                        defaultValue={optionsNguoiTao.filter(option => option.label === 'Kho A')}
                        options={optionsNguoiTao}
                        classNamePrefix="select"
                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Tìm kiếm theo ngày tạo</Label>
                </Col>
                <Col xs="12" md="4">
                    <Input
                        type="date"
                        id="fromdate"
                        name="fromdate"
                        placeholder="Từ ngày..."
                    />
                </Col>
                <Col xs="12" md="4">
                    <Input
                        type="date"
                        id="todate"
                        name="todate"
                        placeholder="Đến ngày..."
                    />
                </Col>
            </FormGroup>




        </Form >
    );
}

export default SearchReport;