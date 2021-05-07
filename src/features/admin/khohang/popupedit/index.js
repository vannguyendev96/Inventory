import React, { useEffect, useState } from "react";
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

function ChinhsuaKhoHang(props) {

    const { tenkhohang, succhuatoida, trangthai, provine, district, editTK, phuong } = props;


    const [tenKH, settenKH] = useState(tenkhohang);
    const [succhuaKH, setsucchuaKH] = useState(succhuatoida);
    const [trangthaiKH, settrangthaiKH] = useState(trangthai);
    const [provineKH, setprovineKH] = useState(provine);
    const [districtKH, setdistrictKH] = useState(district);
    const [phuongKH, setphuongKH] = useState(phuong);

    const [update, setUpdate] = useState(false);

    //address
    const dataWard = getWardData(provine, district);
    const [wards, setWards] = useState(dataWard);

    const dataDistricts = getDistrictsData(provine);
    const [districtData, setDistrictData] = useState(dataDistricts);

    const dataProvice = getProvine();
    const [province, setProvince] = useState({
        dataProvice
    });

    function handleUpdateTK() {
        setUpdate(!update);
        if (editTK) {
            editTK(tenKH, succhuaKH, trangthaiKH, provineKH, districtKH, phuongKH);
        }
    }

    function handleOnchangeProvine(target) {
        setprovineKH(target.value);
        const listDataDistrict = getDistrictsData(target.value);
        setDistrictData(listDataDistrict)
    }

    function handleOnchangeDistrict(target) {
        setdistrictKH(target.value)
        const listDataWard = getWardData(provineKH, target.value);
        setWards(listDataWard)
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
                                    onChange={(target) => setphuongKH(target.value)}
                                    options={wards}
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