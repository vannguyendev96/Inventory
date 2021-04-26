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

const optionsAddress = [
    { value: 'khoa', label: 'Địa chỉ A' },
    { value: 'khob', label: 'Địa chỉ B' },
    { value: 'khoc', label: 'Địa chỉ c' },
];

function CreatePXK() {

    const [kienhang, setKienhang] = useState({
        formValues: {
            khohang: "",
            diachi_khohang: "",
        }
    });

    const handleOnChangeKhoHang = (target) => {
        const { formValues } = kienhang;
        formValues["khohang"] = target.value;
        const optionDC = optionsAddress.find(option => option.value === target.value);
        formValues["diachi_khohang"] = optionDC.label;
        setKienhang({ formValues });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
    }

    return (
        <Form action="" className="form-horizontal">
            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Tên kiện hàng</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input
                        type="text"
                        id="tenkienhang"
                        name="tenkienhang"
                        placeholder="Tên kiện hàng..."

                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Số lượng kiện hàng</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input
                        type="text"
                        id="soluongkienhang"
                        name="soluongkienhang"
                        placeholder="Số lượng kiện hàng..."
                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Trạng thái kiện hàng</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input
                        type="text"
                        id="trangthaikienhang"
                        name="trangthaikienhang"
                        placeholder="Trạng thái kiện hàng..."
                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Kho chứa hàng</Label>
                </Col>
                <Col xs="12" md="9">
                    <Select
                        defaultValue={optionsKho.filter(option => option.label === 'Kho A')}
                        options={optionsKho}
                        classNamePrefix="select"
                        onChange={handleOnChangeKhoHang}
                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Địa chỉ</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input
                        type="text"
                        id="diachi-khohang"
                        name="diachi-khohang"
                        placeholder="Địa chỉ kho hàng..."
                        value={kienhang.formValues.diachi_khohang}
                        onChange={() => console.log('')}
                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Thông tin người nhận</Label>
                </Col>
                <Col xs="12" md="2">
                    <Input
                        type="text"
                        id="tennguoinhan"
                        name="tennguoinhan"
                        placeholder="Tên người nhận..."
                    />
                </Col>
                <Col xs="12" md="2">
                    <Input
                        type="text"
                        id="sdt"
                        name="sdt"
                        placeholder="Số điện thoại..."
                    />
                </Col>
                <Col xs="12" md="5">
                    <Input
                        type="text"
                        id="diachinguoinhan"
                        name="diachinguoinhan"
                        placeholder="Địa chỉ..."
                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Thông tin người gửi</Label>
                </Col>
                <Col xs="12" md="2">
                    <Input
                        type="text"
                        id="tennguoigui"
                        name="tennguoigui"
                        placeholder="Tên người gửi..."
                    />
                </Col>
                <Col xs="12" md="2">
                    <Input
                        type="text"
                        id="sdtnguoigui"
                        name="sdtnguoigui"
                        placeholder="Số điện thoại..."
                    />
                </Col>
                <Col xs="12" md="5">
                    <Input
                        type="text"
                        id="diachinguoigui"
                        name="diachinguoigui"
                        placeholder="Địa chỉ..."
                    />
                </Col>
            </FormGroup>

            <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={handleSubmit}><i className="fa fa-dot-circle-o"></i>Thêm kiện hàng</Button>
            </CardFooter>

        </Form >
    );
}

export default CreatePXK;