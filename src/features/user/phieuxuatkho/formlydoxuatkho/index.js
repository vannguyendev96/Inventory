import React from "react";

import {
    Col,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';

import PropTypes from 'prop-types';

Lydoxuatkho.propTypes = {
    onChangeData: PropTypes.func,
};

Lydoxuatkho.defaultProps = {
    onChangeData: null
}


function Lydoxuatkho(props) {
    const { onChangeData } = props;

    function handleOnchangeData(e){
        if(onChangeData){
            onChangeData(e.target.value);
        }
    }

    return (
        <Form action="" className="form-horizontal">
            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Lý do</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input
                        type="text"
                        id="lydo"
                        name="lydo"
                        placeholder="Lý do xuất kho..."
                        onChange={handleOnchangeData}
                    />
                </Col>
            </FormGroup>


        </Form >
    );
}

export default Lydoxuatkho;