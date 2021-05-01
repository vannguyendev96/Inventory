import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
import { FormGroup, Label, Col, FormFeedback } from 'reactstrap';

import { addressData } from '../../constant/tinh-thanh-viet-nam';

SelectField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    options: PropTypes.array,
    onchangeData: PropTypes.func,
    onchangeDataDistrict: PropTypes.func,
};

SelectField.defaultProps = {
    label: '',
    placeholder: '',
    disabled: false,
    options: [],
   
    onchangeData: null,
    onchangeDataDistrict: null
}


function SelectField(props) {

    const { field, form, options, label, placeholder, disabled, onchangeData, onchangeDataDistrict } = props;
    const { name, value } = field;

    const { errors, touched } = form;
    const showError = errors[name] && touched[name];    

    const selectedOption = options.find(option => option.value === value);

    const handleSelectedOptionChange = (selectedOption) => {
        const selectedValue = selectedOption ? selectedOption.value : selectedOption;

        const changeEvent = {
            target: {
                name: name,
                value: selectedValue
            }
        };
        field.onChange(changeEvent);
        
        if(onchangeData){
            onchangeData(selectedValue);
        }
        if(onchangeDataDistrict){
            onchangeDataDistrict(selectedValue);
        }
    }

    return (
        <FormGroup row>
            <Col md="3">
                {label && <Label for={name}>{label}</Label>}
            </Col>
            <Col xs="12" md="9">
                <Select
                    id={name}
                    {...field}
                    value={selectedOption}
                    onChange={handleSelectedOptionChange}
                    placeholder={placeholder}
                    isDisabled={disabled}
                    options={options}

                    className={showError ? 'is-invalid' : ''}
                />
                <ErrorMessage name={name} component={FormFeedback}/>
            </Col>
        </FormGroup>
    );
}

export default SelectField;