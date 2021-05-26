import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { Col, FormFeedback, FormGroup, Label } from 'reactstrap';


CurrencyFormatField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string,
   
};

CurrencyFormatField.defaultProps = {
    label: '',
}


function CurrencyFormatField(props) {

    const { field, form, label } = props;
    const { name, value } = field;

    const { errors, touched } = form;
    const showError = errors[name] && touched[name];    

    
    return (
        <FormGroup row>
            <Col md="3">
                {label && <Label for={name}>{label}</Label>}
            </Col>
            <Col xs="12" md="9">
                <CurrencyFormat
                   
                    {...field}
                    
                    thousandSeparator={true} prefix={''}  

                    className={showError ? 'is-invalid' : ''}
                />
                <ErrorMessage name={name} component={FormFeedback}/>
            </Col>
        </FormGroup>
    );
}

export default CurrencyFormatField;