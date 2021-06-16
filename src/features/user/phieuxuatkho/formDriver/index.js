import PropTypes from 'prop-types';
import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
    Col,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';
import driverApi from "src/api/driverAPI";
import CurrencyFormat from 'react-currency-format';

SelectDriver.propTypes = {
    onChangeDataDriver: PropTypes.func,
    onChangeDataQuangDuong: PropTypes.func,
    onChangeDataDonGia: PropTypes.func,
};

SelectDriver.defaultProps = {
    onChangeDataDriver: null,
    onChangeDataQuangDuong: null,
    onChangeDataDonGia: null,
}


function SelectDriver(props) {

    const { onChangeDataDriver,onChangeDataDonGia,onChangeDataQuangDuong } = props;

    const [dataDriver, setDataDriver] = useState([]);
    

    function handleOnchangeDataDriver(target) {
        if (onChangeDataDriver) {
            onChangeDataDriver(target.value);
        }
    }

    function handleOnchangeDataDongia(target) {
        if (onChangeDataDonGia) {
            onChangeDataDonGia(target);
        }
    }

    function handleOnchangeDataQuangduong(target) {
        if (onChangeDataQuangDuong) {
            onChangeDataQuangDuong(target);
        }
    }
    

    const getListDriver = async () => {
        let listDriver = [];
        try {
            await driverApi.getall()
                .then(response => {
                    const list = response.data;
                    list.forEach(element => {
                        listDriver.push({
                            value: element.cmnd,
                            label: element.tentx
                        })
                    });
                    setDataDriver(listDriver);
                })
                .catch(error => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getListDriver();
    }, []);

    return (
        <Form action="" className="form-horizontal">


            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Tài xế vận chuyển</Label>
                </Col>
                <Col xs="12" md="9">

                    <Select
                        options={dataDriver}
                        onChange={handleOnchangeDataDriver}
                        classNamePrefix="select"
                    />

                </Col>
            </FormGroup>
            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Quảng đường vận chuyển(KM)</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input
                        type="number"
                        id="qdvc"
                        name="qdvc"
                        placeholder="Quảng đường vận chuyển(KM)..."
                        onChange={(e) => handleOnchangeDataQuangduong(e.target.value)} //setQuangduongvanchuyen
                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Đơn giá cước</Label>
                </Col>
                <Col xs="12" md="9">
                    <CurrencyFormat
                        thousandSeparator={true} prefix={'VND '}
                        onValueChange={(values) => handleOnchangeDataDongia(values.value)}
                    />
                </Col>
            </FormGroup>
        </Form >
    );
}

export default SelectDriver;