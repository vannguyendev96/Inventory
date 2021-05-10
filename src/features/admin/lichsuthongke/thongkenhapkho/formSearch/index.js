import React, { useEffect, useState } from "react";

import {
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    FormText,
    Button
} from 'reactstrap';
import Select from "react-select";
import userApi from "src/api/userlogin";
import pnkApi from "src/api/pnkAPI";
import warehouseApi from "src/api/warehouseAPI";
import PropTypes from 'prop-types';

SearchReportNhapKho.propTypes = {
    handleSearch: PropTypes.func,
    handleOnChangeMaLoHang: PropTypes.func,
    handleOnChangeTenNguoitao: PropTypes.func,
    handleOnChangeKhoHang: PropTypes.func,
};

SearchReportNhapKho.defaultProps = {
    handleSearch: null
}

function SearchReportNhapKho(props) {

    const { handleSearch,handleOnChangeMaLoHang,handleOnChangeTenNguoitao,handleOnChangeKhoHang } = props;

    const [dataUser, setDataUser] = useState([]);
    const [dataMaLoHang, setDataMaLoHang] = useState([]);
    const [dataKhoHang, setDataKhoHang] = useState([]);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const fetchDataUser = async () => {
        let listWarehouse = [];
        try {
            await userApi.getall()
                .then(response => {
                    const list = response.data;
                    list.forEach(element => {
                        listWarehouse.push({
                            value: element.email,
                            label: element.name
                        })
                    });
                    setDataUser(listWarehouse);
                })
                .catch(error => console.log(error))
        } catch (error) {
            console.log(error)
        }
    }

    const fetchDataMaLoHang = async () => {
        let listMaLoHang = [];
        try {
            await pnkApi.getbyuser('')
                .then(response => {
                    const list = response.data;
                    list.forEach(element => {
                        listMaLoHang.push({
                            value: element.malohang,
                            label: element.malohang
                        })
                    });
                    setDataMaLoHang(listMaLoHang);
                })
                .catch(error => console.log(error))
        } catch (error) {
            console.log(error)
        }
    }

    const fetchDataKhoHang = async () => {
        let listKhoHang = [];
        try {
            await warehouseApi.getall()
                .then(response => {
                    const list = response.data;
                    list.forEach(element => {
                        listKhoHang.push({
                            value: element.tenkhohang,
                            label: element.tenkhohang
                        })
                    });
                    setDataKhoHang(listKhoHang);
                })
                .catch(error => console.log(error))
        } catch (error) {
            console.log(error)
        }
    }

    function searchDate(){
        if(handleSearch){
            handleSearch("ngaytaolohang",fromDate,toDate)
        }
    }

    function handleSelectedOptionChangeMaLoHang(selectedOption){
        if(handleOnChangeMaLoHang){
            handleOnChangeMaLoHang("malohang", selectedOption.value)
        }
    }

    function handleSelectedOptionChangeKhoHang(selectedOption){
        if(handleOnChangeKhoHang){
            handleOnChangeKhoHang("khochuakienhang", selectedOption.value)
        }
    }

    function handleSelectedOptionChangeNguoitao(selectedOption){
        if(handleOnChangeTenNguoitao){
            handleOnChangeTenNguoitao("nguoitaolohang", selectedOption.value)
        }
    }

    useEffect(() => {
        fetchDataUser();
        fetchDataMaLoHang();
        fetchDataKhoHang();
    }, []);

    return (
        <Form action="" className="form-horizontal">
            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Tìm kiếm mã lô hàng</Label>
                </Col>
                <Col xs="12" md="9">
                    <Select
                        options={dataMaLoHang}
                        classNamePrefix="select"
                        onChange={handleSelectedOptionChangeMaLoHang}
                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Tìm kiếm theo kho hàng</Label>
                </Col>
                <Col xs="12" md="9">
                    <Select
                        options={dataKhoHang}
                        classNamePrefix="select"
                        onChange={handleSelectedOptionChangeKhoHang}
                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Tìm kiếm theo người tạo</Label>
                </Col>
                <Col xs="12" md="9">
                    <Select

                        options={dataUser}
                        classNamePrefix="select"
                        onChange={handleSelectedOptionChangeNguoitao}
                    />
                </Col>
            </FormGroup>



            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Tìm kiếm theo ngày tạo</Label>
                </Col>
                <Col xs="12" md="3">
                    <FormText className="help-block" color="black">From Date</FormText>
                    <Input
                        type="date"
                        id="fromdate"
                        name="fromdate"
                        placeholder="Từ ngày..."
                        onChange={event => setFromDate(event.target.value)}
                    />
                </Col>
                <Col xs="12" md="3">
                    <FormText className="help-block" color="black">To Date</FormText>
                    <Input
                        type="date"
                        id="todate"
                        name="todate"
                        placeholder="Đến ngày..."
                        onChange={event => setToDate(event.target.value)}
                    />
                </Col>
                <Col xs="12" md="3">
                    <FormText className="help-block" color="white">View</FormText>
                    <Button block outline active color="primary" aria-pressed="true" onClick={() => searchDate()}>View</Button>
                </Col>
            </FormGroup>




        </Form >
    );
}

export default SearchReportNhapKho;