import React, { useState } from "react";
import {
    Col,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';
import PropTypes from 'prop-types';

ChinhsuaThukho.propTypes = {
    tenthukho: PropTypes.string,
    email: PropTypes.string,
    chucvu: PropTypes.string,
    sdt: PropTypes.string,
    kholamviec: PropTypes.string
};

ChinhsuaThukho.defaultProps = {
    tenthukho: '',
    email: '',
    chucvu: '',
    sdt: '',
    kholamviec:''
}

function ChinhsuaThukho(props) {

    const { tenthukho, email, chucvu, sdt, kholamviec} = props;

    const [tenTK, setTenTK] = useState('');
    const [emailTK, setEmailTK] = useState('');
    const [chucvuTK, setChucvuTK] = useState('');
    const [sdtTK, setSdtTK] = useState('');
    const [kholamviecTK, setKholamviecTK] = useState('');
    
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
                        defaultValue= {tenthukho}
                        onChange={(e) => setTenTK(e.target.value)}
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
                        defaultValue= {email}
                        onChange={(e) => setEmailTK(e.target.value)}
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
                        defaultValue= {chucvu}
                        onChange={(e) => setChucvuTK(e.target.value)}
                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Kho làm việc</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input
                        type="text"
                        id="kholamviec"
                        name="kholamviec"
                        defaultValue= {kholamviec}
                        onChange={(e) => setKholamviecTK(e.target.value)}
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
                        defaultValue= {sdt}
                        onChange={(e) => setSdtTK(e.target.value)}
                    />
                </Col>
            </FormGroup>

            
        </Form >
    );
}

export default ChinhsuaThukho;