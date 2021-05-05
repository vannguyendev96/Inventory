import React from "react";
import {
    Col,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';
import PropTypes from 'prop-types';

ChitietTaiXe.propTypes = {
    tentx: PropTypes.string,
    sdt: PropTypes.string,
    trangthai: PropTypes.string,
    namsinh: PropTypes.string,
    provine: PropTypes.string,
    district: PropTypes.string,
    phuong: PropTypes.string
};

ChitietTaiXe.defaultProps = {
    tentx: '',
    sdt: '',
    trangthai: '',
    namsinh: '',
    provine: '',
    district: '',
    phuong: ''
}

function ChitietTaiXe(props) {

    const { tentx, sdt, trangthai, namsinh, provine, district, phuong } = props;
    const address = `${provine} ${district} ${phuong}`;
    return (
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
                        value= {tentx}
                        readOnly={true}
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
                        value= {trangthai}
                        readOnly={true}
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
                        value= {sdt}
                        readOnly={true}
                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col md="3">
                    {/* <Label htmlFor="hf-password">Thị trấn, thành phố</Label> */}
                    <Label htmlFor="hf-password">Địa chỉ</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input
                        type="text"
                        id="provine"
                        name="provine"
                        value= {address}
                        readOnly={true}
                    />
                </Col>
            </FormGroup>

            {/* <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Quận, huyện</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input
                        type="text"
                        id="district"
                        name="district"
                        value= {district}
                        readOnly={true}
                    />
                </Col>
            </FormGroup> */}

            {/* <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Phường, xã</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input
                        type="text"
                        id="phuong"
                        name="phuong"
                        value= {phuong}
                        readOnly={true}
                    />
                </Col>
            </FormGroup> */}
        </Form >
    );
}

export default ChitietTaiXe;