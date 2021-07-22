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
import CurrencyFormatField from "src/custom-fields/CurrencyFormatField";
import pnkApi from "src/api/pnkAPI";

CreatePXK.propTypes = {
    onSubmit: PropTypes.func,
    onChangeSoLuong: PropTypes.func,
};

CreatePXK.defaultProps = {
    onSubmit: null,
    onChangeSoLuong: null
}


const optionsloaikienhang = [
    { value: 'Hàng dễ vỡ', label: 'Hàng dễ vỡ' },
    { value: 'Hàng điện tử', label: 'Hàng điện tử' },
    { value: 'Hàng mỹ phẩm', label: 'Hàng mỹ phẩm' },
];


function CreatePXK(props) {

    const { onSubmit, onChangeSoLuong } = props;

    const initialValues = {
        tenkienhang: '',
        soluongkienhang: '',
        khoiluongkienhang: '',
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
        dongia: '',
    };

    const [dataWareHouse, setDataWareHouse] = useState([]);
    const [dataKHTK, setDataKHTK] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [dataAddress, setDataAddress] = useState('');

    const [dataTenKienHang, setDataTenKienHang] = useState('');
    const [dataKhoiLuong, setDataKhoiLuong] = useState('');
    const [dataLoaiKienHang, setDataLoaiKienHang] = useState('');
    const [dataKhoChuaKienHang, setDataKhoChuaKienHang] = useState('');
    const [dataDonGia, setDataDonGia] = useState('');

    const [dataTenNguoiGui, setDataTenNguoiNhan] = useState('');
    const [dataSDTNguoiGui, setDataSDTNguoiNhan] = useState('');

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

    const getListKienHangTonKho = async () => {
        const username = localStorage.getItem('username')
        setIsLoading(true);
        let listKHTK = [];
        try {
            await pnkApi.getlistkhtk(username)
                .then(response => {
                    const list = response.data;
                    console.log(list)
                    list.forEach(element => {
                        listKHTK.push({
                            value: element._id,
                            label: element.tenkienhang
                        })
                    });
                    setDataKHTK(listKHTK);
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
            onSubmit(values, dataTenKienHang, dataLoaiKienHang, dataKhoChuaKienHang, dataDonGia, 
                dataKhoiLuong,dataAddress, dataTenNguoiGui, dataSDTNguoiGui, resetForm)
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

    const handOnchangTenKienHang = async (value) => {
        await pnkApi.getkhtkbyid(value)
            .then(response => {
                if (onChangeSoLuong) {
                    onChangeSoLuong(response.data[0].soluongkienhang)
                }
                
                setDataTenKienHang(response.data[0].tenkienhang);
                setDataLoaiKienHang(response.data[0].loaikienhang);
                const kl = (parseFloat(response.data[0].khoiluongkienhang, 10)/parseFloat(response.data[0].soluongkienhang, 10))
                setDataKhoiLuong(kl)
                setDataKhoChuaKienHang(response.data[0].khochuakienhang);
                setDataDonGia(response.data[0].dongia);
                handOnchangKhoChua(response.data[0].khochuakienhang)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const phoneRegExp = /((09|03|07|08|05)+([0-9]{8})\b)/g
    const nameRegExp = /^[^0-9]+$/

    const validationSchema = Yup.object().shape({
        tenkienhang: Yup.string().required('Vui lòng nhập tên kiện hàng'),
        soluongkienhang: Yup.string().required('Vui lòng nhập Số lượng kiện hàng'),
        trangthaikienhang: Yup.string().required('Vui lòng nhập Trạng thái kiện hàng'),
        //loaikienhang: Yup.string().required('Vui lòng chọn Loại kiện hàng').nullable(),
        //khochuahang: Yup.string().required('Vui lòng chọn Kho chứa hàng').nullable(),
        tennguoinhan: Yup.string().matches(nameRegExp, 'Tên người nhận không đúng định dạng').required('Vui lòng nhập tên người nhận'),
        //sdtnguoinhan: Yup.string().required('Vui lòng nhập sdt người nhận'),
        diachinguoinhan: Yup.string().required('Vui lòng nhập địa chỉ người nhận'),
        //tennguoigui: Yup.string().required('Vui lòng nhập tên người gửi'),
        //sdtnguoigui: Yup.string().required('Vui lòng nhập sdt người gửi'),
        //dongia: Yup.string().required('Vui lòng nhập đơn giá'),
        diachinguoigui: Yup.string().required('Vui lòng nhập địa chỉ người gửi'),
        sdtnguoinhan: Yup.string().matches(phoneRegExp, 'Số điện thoại của bạn không đúng định dạng').required('Vui lòng nhập số điện thoại'),
    })

    useEffect(() => {
        getListWarehouse();
        getListKienHangTonKho();
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
                                {/* <FastField
                                    name="tenkienhang"
                                    component={InputField}

                                    label="Tên kiện hàng"
                                    placeholder="Tên kiện hàng..."
                                /> */}

                                <Field
                                    name="tenkienhang"
                                    component={SelectField}

                                    label="Tên kiện hàng"
                                    placeholder="Tên kiện hàng..."
                                    onchangeData={handOnchangTenKienHang}
                                    options={dataKHTK}
                                />

                                <FastField
                                    name="soluongkienhang"
                                    component={InputField}

                                    label="Số lượng kiện hàng"
                                    placeholder="Số lượng kiện hàng..."
                                    type="number"
                                />

                                <Field
                                    name="khoiluongkienhang"
                                    component={InputField}

                                    label="Khối lượng kiện hàng(KG)"
                                    valueData={dataKhoiLuong}
                                    placeholder="Khối lượng kiện hàng..."
                                    isreadonly={true}
                                />

                                <FastField
                                    name="trangthaikienhang"
                                    component={InputField}

                                    label="Trạng thái kiện hàng"
                                    placeholder="Trạng thái kiện hàng..."
                                />



                                <Field
                                    name="loaikienhang"
                                    component={InputField}

                                    label="Loại kiện hàng"
                                    valueData={dataLoaiKienHang}
                                    placeholder="Loại kiện hàng..."
                                    isreadonly={true}
                                />

                                {/* <Field
                                    name="khochuahang"
                                    component={SelectField}

                                    label="Kho chứa hàng"
                                    placeholder="Kho chứa hàng..."
                                    onchangeData={handOnchangKhoChua}
                                    options={dataWareHouse}
                                /> */}

                                <Field
                                    name="khochuahang"
                                    component={InputField}

                                    label="Kho chứa hàng"
                                    valueData={dataKhoChuaKienHang}
                                    placeholder="Kho chứa hàng..."
                                    isreadonly={true}
                                />

                                <Field
                                    name="diachikhohang"
                                    component={InputField}

                                    label="Địa chỉ kho hàng"
                                    valueData={dataAddress}
                                    placeholder="Địa chỉ kho hàng..."
                                    isreadonly={true}
                                />
                                <FastField
                                    name="tennguoinhan"
                                    component={InputField}

                                    label="Thông tin người nhận"

                                    placeholder="Tên người nhận..."
                                />
                                <FastField
                                    name="sdtnguoinhan"
                                    component={InputField}

                                    placeholder="Số điện thoại người nhận..."

                                />
                                <FastField
                                    name="diachinguoinhan"
                                    component={InputField}

                                    placeholder="Địa chỉ người nhận..."
                                />

                                <Field
                                    name="tennguoigui"
                                    component={InputField}

                                    label="Thông tin người gửi"
                                    placeholder="Tên người gửi..."
                                    valueData={dataTenNguoiGui}
                                    isreadonly={true}
                                />
                                <Field
                                    name="sdtnguoigui"
                                    component={InputField}

                                    placeholder="Số điện thoại người gửi..."
                                    isreadonly={true}
                                    valueData={dataSDTNguoiGui}
                                />

                                {/* <Field
                                    name="dongia"
                                    component={CurrencyFormatField}

                                    label="Đơn giá"

                                /> */}

                                <Field
                                    name="dongia"
                                    component={InputField}

                                    label="Đơn giá"
                                    valueData={dataDonGia}
                                    placeholder="Đơn giá..."
                                    isreadonly={true}
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

export default CreatePXK;