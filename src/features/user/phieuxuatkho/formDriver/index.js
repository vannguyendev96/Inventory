import PropTypes from 'prop-types';
import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
    Col,
    Form,
    FormGroup,

    Label
} from 'reactstrap';
import driverApi from "src/api/driverAPI";


SelectDriver.propTypes = {
    onChangeDataDriver: PropTypes.func,
};

SelectDriver.defaultProps = {
    onChangeDataDriver: null,
}


function SelectDriver(props) {

    const { onChangeDataDriver } = props;

    const [dataDriver, setDataDriver] = useState([]);

    function handleOnchangeDataDriver(target) {
        if (onChangeDataDriver) {
            onChangeDataDriver(target.value);
        }
    }

    const getListDriver = async () => {
        let listDriver = [];
        try {
            await driverApi.getall()
                .then(response => {
                    const list = response.data;
                    list.forEach(element => {
                        listDriver.push({
                            value: element.cmnd,
                            label: element.tentx
                        })
                    });
                    setDataDriver(listDriver);
                })
                .catch(error => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getListDriver();
      }, []);

    return (
        <Form action="" className="form-horizontal">


            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="hf-password">Tài xế vận chuyển</Label>
                </Col>
                <Col xs="12" md="9">

                    <Select
                        options={dataDriver}
                        onChange={handleOnchangeDataDriver}
                        classNamePrefix="select"
                    />
                </Col>
            </FormGroup>
        </Form >
    );
}

export default SelectDriver;