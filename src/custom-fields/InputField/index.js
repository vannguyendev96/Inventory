import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { FormGroup, Input, Label, Col, FormFeedback } from 'reactstrap';


InputField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,

};

InputField.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    disabled: false,
}

function InputField(props) {
    const {
        field, form,
        type, label, placeholder, disabled,
    } = props;
    const { name } = field;

    const { errors, touched } = form;
    const showError = errors[name] && touched[name];    

    return (
        <FormGroup row>
            <Col md="3">
                { label && <Label for={name}>{label}</Label>}
            </Col>

            <Col xs="12" md="9">
                <Input
                    id= {name}
                    {...field}

                    type={type}
                    disabled={disabled}
                    placeholder={placeholder}
                    min="0"

                    invalid={showError}
                />
                <ErrorMessage name={name} component={FormFeedback}/>
            </Col>
            
        </FormGroup>
    );
}

export default InputField;