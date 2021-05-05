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

ChinhsuaTX.propTypes = {
    cmnd: PropTypes.string,
    tentx: PropTypes.string,
    sdt: PropTypes.string,
    trangthai: PropTypes.string,
    namsinh: PropTypes.string,
    provine: PropTypes.string,
    district: PropTypes.string,
    phuong: PropTypes.string,
    editTK: PropTypes.func,
};

ChinhsuaTX.defaultProps = {
    cmnd: '',
    tentx: '',
    sdt: '',
    trangthai: '',
    namsinh: '',
    provine: '',
    district: '',
    phuong: '',
    editTK: null
}

function ChinhsuaTX(props) {

    const { cmnd, tentx, sdt, trangthai, namsinh, provine, district, editTK, phuong } = props;

    const [tenTX, settenTX] = useState(tentx);
    const [sdtTX, setsdtTX] = useState(sdt);
    const [trangthaiTX, settrangthaiTX] = useState(trangthai);
    const [namsinhTX, setNamsinhTX] = useState(namsinh);
    const [provineTX, setprovineTX] = useState(provine);
    const [districtTX, setdistrictTX] = useState(district);
    const [phuongTX, setphuongTX] = useState(phuong);

    const [update, setUpdate] = useState(false);

    const today = new Date(namsinh);
    const namsinhDate = today.toISOString().substr(0, 10);

    function handleUpdateTK(){
        setUpdate(!update);
        if(editTK){
            editTK(cmnd,tenTX,sdtTX,trangthaiTX,namsinhTX,provineTX,districtTX,phuongTX);
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
                    <CModalTitle>Chỉnh sữa thông tin tài xế</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <Form action="" className="form-horizontal">
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="hf-password">Tên tài xế</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input
                                    type="text"
                                    id="tentx"
                                    name="tentx"
                                    defaultValue={tentx}
                                    onChange={(e) => settenTX(e.target.value)}
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
                                    onChange={(e) => setsdtTX(e.target.value)}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="hf-password">Trạng thái</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input
                                    type="text"
                                    id="trangthai"
                                    name="trangthai"
                                    defaultValue={trangthai}
                                    onChange={(e) => settrangthaiTX(e.target.value)}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="hf-password">Năm sinh</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input
                                    type="date"
                                    id="namsinh"
                                    name="namsinh"
                                    defaultValue={namsinhDate}
                                    onChange={(e) => setNamsinhTX(e.target.value)}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="hf-password">Thị trấn, thành phố</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input
                                    type="text"
                                    id="provine"
                                    name="provine"
                                    defaultValue={provine}
                                    onChange={(e) => setprovineTX(e.target.value)}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="hf-password">Quận, huyện</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input
                                    type="text"
                                    id="district"
                                    name="district"
                                    defaultValue={district}
                                    onChange={(e) => setdistrictTX(e.target.value)}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="hf-password">Phường, xã</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input
                                    type="text"
                                    id="phuong"
                                    name="phuong"
                                    defaultValue={phuong}
                                    onChange={(e) => setphuongTX(e.target.value)}
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

export default ChinhsuaTX;