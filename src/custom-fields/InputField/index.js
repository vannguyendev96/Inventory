import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Col, FormFeedback, FormGroup, Input, Label } from 'reactstrap';


InputField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    valueData: PropTypes.string,
    disabled: PropTypes.bool,
    isreadonly: PropTypes.bool,
};

InputField.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    valueData: '',
    disabled: false,
    isreadonly: false,
}

function InputField(props) {
    const {
        field, form,
        type, label, placeholder, disabled, isreadonly, valueData
    } = props;
    const { name } = field;

    const valueInput = valueData ? valueData : field.value;

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

                    value={valueInput}
                    type={type}
                    disabled={disabled}
                    readOnly={isreadonly}
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