import React, { useState } from "react";
import Select from "react-select";
import {
    Button, CardFooter, Col,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';



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

const optionsloaikienhang = [
    { value: 'devo', label: 'Hàng dễ vỡ' }
];

function CreatePNK() {

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
                    <Label htmlFor="hf-password">Loại kiện hàng</Label>
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
                    <Label htmlFor="hf-password">Kho chứa hàng</Label>
                </Col>
                <Col xs="12" md="9">
                    <Select
                        defaultValue={optionsloaikienhang.filter(option => option.label === 'Hàng dễ vỡ')}
                        options={optionsloaikienhang}
                        classNamePrefix="select"
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
                       
                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Thông tin người nhận</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input
                        type="text"
                        id="tennguoinhan"
                        name="tennguoinhan"
                        placeholder="Tên người nhận..."
                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password"></Label>
                </Col>
                <Col xs="12" md="9">
                    <Input
                        type="text"
                        id="sdtnguoinhan"
                        name="sdtnguoinhan"
                        placeholder="Số điện thoại người nhận..."
                       
                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password"></Label>
                </Col>
                <Col xs="12" md="9">
                    <Input
                        type="text"
                        id="diachinguoinhan"
                        name="diachinguoinhan"
                        placeholder="Địa chỉ người nhận..."
                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Thông tin người gửi</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input
                        type="text"
                        id="tennguoigui"
                        name="tennguoigui"
                        placeholder="Tên người gửi..."
                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password"></Label>
                </Col>
                <Col xs="12" md="9">
                    <Input
                        type="text"
                        id="sdtnguoigui"
                        name="sdtnguoigui"
                        placeholder="Số điện thoại người gửi..."
                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password"></Label>
                </Col>
                <Col xs="12" md="9">
                    <Input
                        type="text"
                        id="diachinguoigui"
                        name="diachinguoigui"
                        placeholder="Địa chỉ người gửi..."
                    />
                </Col>
            </FormGroup>

            <CardFooter>
                <Button type="submit" size="sm" color="primary" ><i className="fa fa-dot-circle-o"></i>Thêm kiện hàng</Button>
            </CardFooter>

        </Form >
    );
}

export default CreatePNK;