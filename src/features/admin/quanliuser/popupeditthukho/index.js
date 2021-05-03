import React, { useState } from "react";
import {
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Button,

} from 'reactstrap';
import PropTypes from 'prop-types';

import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle
} from '@coreui/react';

ChinhsuaThukho.propTypes = {
    tenthukho: PropTypes.string,
    email: PropTypes.string,
    chucvu: PropTypes.string,
    sdt: PropTypes.string,
    kholamviec: PropTypes.string,
    editTK: PropTypes.func,
    username: PropTypes.string,
};

ChinhsuaThukho.defaultProps = {
    tenthukho: '',
    email: '',
    chucvu: '',
    sdt: '',
    kholamviec: '',
    editTK: null,
    username: '',
}

function ChinhsuaThukho(props) {

    const { tenthukho, email, chucvu, sdt, kholamviec, editTK, username } = props;

    const [tenTK, setTenTK] = useState(tenthukho);
    const [emailTK, setEmailTK] = useState(email);
    const [chucvuTK, setChucvuTK] = useState(chucvu);
    const [sdtTK, setSdtTK] = useState(sdt);
    const [kholamviecTK, setKholamviecTK] = useState(kholamviec);

    const [update, setUpdate] = useState(false);

    function handleUpdateTK(){
        setUpdate(!update);
        if(editTK){
            editTK(username,tenTK,emailTK,chucvuTK,sdtTK,kholamviecTK);
        }
    }

    return (
        <>
            <Button type="submit" size="sm" color="success" onClick={() => setUpdate(!update)}>Sữa</Button>
            <CModal
                show={update}
                onClose={() => setUpdate(!update)}
                color="primary"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Chỉnh sữa thông tin thủ kho</CModalTitle>
                </CModalHeader>
                <CModalBody>
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
                                    defaultValue={tenthukho}
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
                                    defaultValue={email}
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
                                    defaultValue={chucvu}
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
                                    defaultValue={kholamviec}
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
                                    defaultValue={sdt}
                                    onChange={(e) => setSdtTK(e.target.value)}
                                />
                            </Col>
                        </FormGroup>


                    </Form >
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={handleUpdateTK}>
                        Chỉnh sữa
                    </CButton>
                    <CButton color="secondary" onClick={() => setUpdate(!update)}>
                        Close
                    </CButton>
                </CModalFooter>
            </CModal>
        </>

    );
}

export default ChinhsuaThukho;