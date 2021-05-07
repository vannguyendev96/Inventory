import React from "react";
import {
    Col,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';
import PropTypes from 'prop-types';

ChitietThukho.propTypes = {
    tenthukho: PropTypes.string,
    email: PropTypes.string,
    chucvu: PropTypes.string,
    sdt: PropTypes.string,
    username: PropTypes.string
};

ChitietThukho.defaultProps = {
    tenthukho: '',
    email: '',
    chucvu: '',
    sdt: '',
    username: ''
}

function ChitietThukho(props) {

    const { tenthukho, email, chucvu, sdt, username} = props;
    
    return (
        <Form action="" className="form-horizontal">
            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Tên thủ kho</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input
                        type="text"
                        id="tenthukho"
                        name="tenthukho"
                        value= {tenthukho}
                        readOnly={true}
                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Email</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input
                        type="text"
                        id="Email"
                        name="Email"
                        value= {email}
                        readOnly={true}
                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Chức vụ</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input
                        type="text"
                        id="chucvu"
                        name="chucvu"
                        value= {chucvu}
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
                    <Label htmlFor="hf-password">Tên đăng nhập</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input
                        type="text"
                        id="tendangnhap"
                        name="tendangnhap"
                        value= {username}
                        readOnly={true}
                    />
                </Col>
            </FormGroup>
        </Form >
    );
}

export default ChitietThukho;