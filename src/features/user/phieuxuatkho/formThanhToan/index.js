import React, { useState } from "react";

import {
    Col,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';
import PropTypes from 'prop-types';

PhuongThucThanhToan.propTypes = {
    onChangeDataSTTT: PropTypes.func,
    onChangeDataPTTT: PropTypes.func,
};

PhuongThucThanhToan.defaultProps = {
    onChangeDataSTTT: null,
    onChangeDataPTTT: null
}

function PhuongThucThanhToan(props) {

    const { onChangeDataSTTT, onChangeDataPTTT } = props;

    function handleOnchangeDataSTTT(e){
        if(onChangeDataSTTT){
            onChangeDataSTTT(e.target.value);
        }
    }

    function handleOnchangeDataPTTT(e){
        if(onChangeDataPTTT){
            onChangeDataPTTT(e.target.value);
        }
    }

    return (
        <Form action="" className="form-horizontal">
            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Số tiền thanh toán</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input
                        type="number"
                        id="sotienthanhtoan"
                        name="sotienthanhtoan"
                        placeholder="Số tiền thanh toán..."
                        onChange={handleOnchangeDataSTTT}
                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Phương thức thanh toán</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input
                        type="text"
                        id="phuongthucthanhtoan"
                        name="phuongthucthanhtoan"
                        placeholder="Phương thức thanh toán..."
                        onChange={handleOnchangeDataPTTT}
                    />
                </Col>
            </FormGroup>
        </Form >
    );
}

export default PhuongThucThanhToan;