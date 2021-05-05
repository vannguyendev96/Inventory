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

ChinhsuaKhoHang.propTypes = {
    tenkhohang: PropTypes.string,
    succhuatoida: PropTypes.string,
    trangthai: PropTypes.string,
    provine: PropTypes.string,
    district: PropTypes.string,
    phuong: PropTypes.string,
    editTK: PropTypes.func,
};

ChinhsuaKhoHang.defaultProps = {
    tenkhohang: '',
    succhuatoida: '',
    trangthai: '',
    provine: '',
    district: '',
    phuong: '',
    editTK: null
}

function ChinhsuaKhoHang(props) {

    const { tenkhohang, succhuatoida, trangthai, provine, district, editTK, phuong } = props;

    const [tenKH, settenKH] = useState(tenkhohang);
    const [succhuaKH, setsucchuaKH] = useState(succhuatoida);
    const [trangthaiKH, settrangthaiKH] = useState(trangthai);
    const [provineKH, setprovineKH] = useState(provine);
    const [districtKH, setdistrictKH] = useState(district);
    const [phuongKH, setphuongKH] = useState(phuong);

    const [update, setUpdate] = useState(false);

    function handleUpdateTK(){
        setUpdate(!update);
        if(editTK){
            editTK(tenKH,succhuaKH,trangthaiKH,provineKH,districtKH,phuongKH);
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
                    <CModalTitle>Chỉnh sữa thông tin kho hàng</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <Form action="" className="form-horizontal">
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="hf-password">Tên kho hàng</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input
                                    type="text"
                                    id="tenkhohang"
                                    name="tenkhohang"
                                    defaultValue={tenkhohang}
                                    onChange={(e) => settenKH(e.target.value)}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="hf-password">Sức chứa tối đa</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input
                                    type="text"
                                    id="succhuatoida"
                                    name="succhuatoida"
                                    defaultValue={succhuatoida}
                                    onChange={(e) => setsucchuaKH(e.target.value)}
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
                                    onChange={(e) => settrangthaiKH(e.target.value)}
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
                                    onChange={(e) => setprovineKH(e.target.value)}
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
                                    onChange={(e) => setdistrictKH(e.target.value)}
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
                                    onChange={(e) => setphuongKH(e.target.value)}
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

export default ChinhsuaKhoHang;