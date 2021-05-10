import React, { useEffect, useState } from "react";
import {
    Button, CardFooter
} from 'reactstrap';
import { FastField, Form, Formik, Field } from 'formik';
import InputField from "src/custom-fields/InputField";
import SelectField from "src/custom-fields/SelectField";
import FullPageLoader from "src/views/fullpageloading";
import warehouseApi from "src/api/warehouseAPI";
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import userApi from "src/api/userlogin";

CreatePNK.propTypes = {
    onSubmit: PropTypes.func,
};

CreatePNK.defaultProps = {
    onSubmit: null
}


const optionsloaikienhang = [
    { value: 'Hàng dễ vỡ', label: 'Hàng dễ vỡ' }
];

function CreatePNK(props) {

    const { onSubmit } = props;

    const initialValues = {
        tenkienhang: '',
        soluongkienhang: '',
        trangthaikienhang: '',
        loaikienhang: null,
        khochuahang: null,
        diachikhohang: '',
        tennguoinhan: '',
        sdtnguoinhan: '',
        diachinguoinhan: '',
        tennguoigui: '',
        sdtnguoigui: '',
        diachinguoigui: '',
    };

    const [dataWareHouse, setDataWareHouse] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [dataAddress, setDataAddress] = useState('');

    const [dataTenNguoiNhan, setDataTenNguoiNhan] = useState('');
    const [dataSDTNguoiNhan, setDataSDTNguoiNhan] = useState('');

    const getListWarehouse = async () => {
        setIsLoading(true);
        let listWarehouse = [];
        try {
            await warehouseApi.getall()
                .then(response => {
                    const list = response.data;
                    list.forEach(element => {
                        listWarehouse.push({
                            value: element.tenkhohang,
                            label: element.tenkhohang
                        })
                    });
                    setDataWareHouse(listWarehouse);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.log(error);
                    setIsLoading(false);
                })
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    const handleSubmitForm = async (values, resetForm) => {
        if (onSubmit) {
            onSubmit(values, dataAddress, dataTenNguoiNhan, dataSDTNguoiNhan, resetForm)
        }
    }

    const handOnchangKhoChua = async (value) => {
        await warehouseApi.getbyidWarehouse(value)
            .then(response => {
                const address = `phường(xã) ${response.data.phuong} quận(huyện) ${response.data.district} tỉnh(thành phố) ${response.data.provine}`;
                setDataAddress(address)
            })
            .catch(error => {
                console.log(error);
            })

        const email = localStorage.getItem("username");
        await userApi.getbyuser(email)
            .then(response => {
                setDataTenNguoiNhan(response.data.name);
                setDataSDTNguoiNhan(response.data.sdt);
            })
            .catch(error => {
                console.log(error)
            })
    }

    const validationSchema = Yup.object().shape({
        tenkienhang: Yup.string().required('Vui lòng nhập tên kiện hàng'),
        soluongkienhang: Yup.string().required('Vui lòng nhập Số lượng kiện hàng'),
        trangthaikienhang: Yup.string().required('Vui lòng nhập Trạng thái kiện hàng'),
        loaikienhang: Yup.string().required('Vui lòng chọn Loại kiện hàng').nullable(),
        khochuahang: Yup.string().required('Vui lòng chọn Kho chứa hàng').nullable(),
        //tennguoinhan: Yup.string().required('Vui lòng nhập tên người nhận'),
        //sdtnguoinhan: Yup.string().required('Vui lòng nhập sdt người nhận'),
        diachinguoinhan: Yup.string().required('Vui lòng nhập địa chỉ người nhận'),
        tennguoigui: Yup.string().required('Vui lòng nhập tên người gửi'),
        sdtnguoigui: Yup.string().required('Vui lòng nhập sdt người gửi'),
        diachinguoigui: Yup.string().required('Vui lòng nhập địa chỉ người gửi'),
    })

    useEffect(() => {
        getListWarehouse();
    }, [])

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => handleSubmitForm(values, resetForm)}
        >
            {formikProps => {
                return (
                    <>
                        {isLoading ? <FullPageLoader /> :
                            <Form action="" className="form-horizontal">
                                <FastField
                                    name="tenkienhang"
                                    component={InputField}

                                    label="Tên kiện hàng"
                                    placeholder="Tên kiện hàng..."
                                />
                                <FastField
                                    name="soluongkienhang"
                                    component={InputField}

                                    label="Số lượng kiện hàng"
                                    placeholder="Số lượng kiện hàng..."
                                    type="number"
                                />
                                <FastField
                                    name="trangthaikienhang"
                                    component={InputField}

                                    label="Trạng thái kiện hàng"
                                    placeholder="Trạng thái kiện hàng..."
                                />
                                <FastField
                                    name="loaikienhang"
                                    component={SelectField}

                                    label="Loại kiện hàng"
                                    placeholder="Loại kiện hàng..."
                                    options={optionsloaikienhang}
                                />
                                <Field
                                    name="khochuahang"
                                    component={SelectField}

                                    label="Kho chứa hàng"
                                    placeholder="Kho chứa hàng..."
                                    onchangeData={handOnchangKhoChua}
                                    options={dataWareHouse}
                                />
                                <Field
                                    name="diachikhohang"
                                    component={InputField}

                                    label="Địa chỉ kho hàng"
                                    valueData={dataAddress}
                                    placeholder="Địa chỉ kho hàng..."
                                    isreadonly={true}
                                />
                                <Field
                                    name="tennguoinhan"
                                    component={InputField}

                                    label="Thông tin người nhận"
                                    valueData={dataTenNguoiNhan}
                                    placeholder="Tên người nhận..."
                                    isreadonly={true}
                                />
                                <Field
                                    name="sdtnguoinhan"
                                    component={InputField}

                                    placeholder="Số điện thoại người nhận..."
                                    valueData={dataSDTNguoiNhan}
                                    type="number"
                                    isreadonly={true}
                                />
                                <FastField
                                    name="diachinguoinhan"
                                    component={InputField}

                                    placeholder="Địa chỉ người nhận..."
                                />

                                <FastField
                                    name="tennguoigui"
                                    component={InputField}

                                    label="Thông tin người gửi"
                                    placeholder="Tên người gửi..."
                                />
                                <FastField
                                    name="sdtnguoigui"
                                    component={InputField}

                                    placeholder="Số điện thoại người gửi..."
                                    type="number"
                                />
                                <FastField
                                    name="diachinguoigui"
                                    component={InputField}

                                    placeholder="Địa chỉ người gửi..."
                                />

                                <CardFooter>
                                    <Button type="submit" size="sm" color="primary" ><i className="fa fa-dot-circle-o"></i>Thêm kiện hàng</Button>
                                </CardFooter>
                            </Form >
                        }
                    </>
                )
            }}
        </Formik>
    );
}

export default CreatePNK;