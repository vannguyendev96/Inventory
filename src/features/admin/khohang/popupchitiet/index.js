import React from "react";
import {
    Col,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';
import PropTypes from 'prop-types';

ChitietKhoHang.propTypes = {
    tenkhohang: PropTypes.string,
    succhuatoida: PropTypes.string,
    trangthai: PropTypes.string,
    provine: PropTypes.string,
    district: PropTypes.string,
    phuong: PropTypes.string
};

ChitietKhoHang.defaultProps = {
    tenkhohang: '',
    succhuatoida: '',
    trangthai: '',
    provine: '',
    district: '',
    phuong: ''
}

function ChitietKhoHang(props) {

    const { tenkhohang, succhuatoida, trangthai, provine, district, phuong } = props;
    
    return (
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
                        value= {tenkhohang}
                        readOnly={true}
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
                        value= {succhuatoida}
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
                    <Label htmlFor="hf-password">Thị trấn, thành phố</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input
                        type="text"
                        id="provine"
                        name="provine"
                        value= {provine}
                        readOnly={true}
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
                        value= {district}
                        readOnly={true}
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
                        value= {phuong}
                        readOnly={true}
                    />
                </Col>
            </FormGroup>
        </Form >
    );
}

export default ChitietKhoHang;