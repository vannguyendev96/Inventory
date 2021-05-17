import React, { useState } from "react";

import {
    Col,
    Form,
    FormGroup,
    Input,
    Label,
} from 'reactstrap';
import Select from "react-select";
import CurrencyFormat from 'react-currency-format';
import PropTypes from 'prop-types';

PhuongThucThanhToan.propTypes = {
    onChangeDataSTTT: PropTypes.func,
    onChangeDataPTTT: PropTypes.func,
};

PhuongThucThanhToan.defaultProps = {
    onChangeDataSTTT: null,
    onChangeDataPTTT: null
}

const optionsphuongthucthanhtoan = [
    { value: 'Chuyển khoản', label: 'Chuyển khoản' },
    { value: 'Tiền mặt', label: 'Tiền mặt' },
];


function PhuongThucThanhToan(props) {

    const { onChangeDataSTTT, onChangeDataPTTT } = props;


    function numberWithCommas(x) {
        return x.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    function handleOnchangeDataSTTT(values) {
        if (onChangeDataSTTT) {
            onChangeDataSTTT(values.value);
        }
    }

    function handleOnchangeDataPTTT(target) {
        if (onChangeDataPTTT) {
            const dataValue = target.value !== '' ? target.value : 'Chuyển khoản';
            onChangeDataPTTT(dataValue);
        }
    }

    return (
        <Form action="" className="form-horizontal">
            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Số tiền thanh toán</Label>
                </Col>
                <Col xs="12" md="9">
                    {/* <Input
                        type="text"
                        id="sotienthanhtoan"
                        name="sotienthanhtoan"
                        placeholder="Số tiền thanh toán..."
                        value={currency}
                        onChange={handleOnchangeDataSTTT}
                    /> */}
                    <CurrencyFormat 
                        thousandSeparator={true} prefix={'VND '}  
                        onValueChange={handleOnchangeDataSTTT}
                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Phương thức thanh toán</Label>
                </Col>
                <Col xs="12" md="9">

                    <Select
                        defaultValue={optionsphuongthucthanhtoan.filter(option => option.label === 'Chuyển khoản')}
                        options={optionsphuongthucthanhtoan}
                        onChange={handleOnchangeDataPTTT}
                        classNamePrefix="select"
                    />
                </Col>
            </FormGroup>
        </Form >
    );
}

export default PhuongThucThanhToan;