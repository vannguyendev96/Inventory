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

import Select from 'react-select';
import { addressData } from '../../../../constant/tinh-thanh-viet-nam';

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

function getProvine() {
    const dataProvice = [];
    addressData.forEach(element => {
        dataProvice.push({
            value: element.name,
            label: element.name
        })
    });
    return dataProvice;
}

function getDistrictsData(value) {
    let districtList = []
    const districtListData = addressData.find(option => (option.name).toLowerCase() === value.toLowerCase()).districts;
    districtListData.forEach(element => {
        districtList.push({
            value: element.name,
            label: element.name
        })
    });
    return districtList;
}

function getWardData(provineData, districtData) {
    let wardsList = []
    const districtDataList = addressData.find(option => (option.name).toLowerCase() === provineData.toLowerCase()).districts;
    const wards = districtDataList.find(option => (option.name).toLowerCase() === districtData.toLowerCase()).wards;
    wards.forEach(element => {
        wardsList.push({
            value: element.name,
            label: `${element.prefix} ${element.name}`
        })
    });
    return wardsList;
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

    function handleUpdateTK() {
        setUpdate(!update);
        if (editTK) {
            editTK(cmnd, tenTX, sdtTX, trangthaiTX, namsinhTX, provineTX, districtTX, phuongTX);
        }
    }

    //address
    const dataWard = getWardData(provine, district);
    const [wards, setWards] = useState(dataWard);

    const dataDistricts = getDistrictsData(provine);
    const [districtData, setDistrictData] = useState(dataDistricts);

    const dataProvice = getProvine();
    const [province, setProvince] = useState({
        dataProvice
    });

    function handleOnchangeProvine(target) {
        setprovineTX(target.value);
        const listDataDistrict = getDistrictsData(target.value);
        setDistrictData(listDataDistrict)
    }

    function handleOnchangeDistrict(target) {
        setdistrictTX(target.value)
        const listDataWard = getWardData(provineTX, target.value);
        setWards(listDataWard)
    }

    return (
        <>
            <Button type="submit" size="sm" color="success" onClick={() => setUpdate(!update)}>Edit</Button>
            <CModal
                show={update}
                onClose={() => setUpdate(!update)}
                color="primary"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Chỉnh sửa thông tin tài xế</CModalTitle>
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
                                <Select
                                    defaultValue={(province.dataProvice).filter(option => (option.label).toLowerCase() === provine)}
                                    onChange={handleOnchangeProvine}
                                    options={province.dataProvice}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="hf-password">Quận, huyện</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Select
                                    defaultValue={(districtData).filter(option => (option.label).toLowerCase() === district)}
                                    onChange={handleOnchangeDistrict}
                                    options={districtData}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="hf-password">Phường, xã</Label>
                            </Col>
                            <Col xs="12" md="9">
                                
                                <Select
                                    defaultValue={wards.filter(option => (option.value).toLowerCase() === phuong)}
                                    onChange={(target) => setphuongTX(target.value)}
                                    options={wards}
                                />
                            </Col>
                        </FormGroup>


                    </Form >
                </CModalBody>

                <CModalFooter>
                    <CButton color="primary" onClick={handleUpdateTK}>
                        Save
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