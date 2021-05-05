import React, { useEffect, useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react';

import {
  CardFooter,
  Button
} from 'reactstrap';
import DanhsachKhoHang from './danhsachkhohang';
import { FastField, Form, Formik, Field} from 'formik';
import { addressData } from '../../../constant/tinh-thanh-viet-nam';
import InputField from 'src/custom-fields/InputField';
import SelectField from 'src/custom-fields/SelectField';
import { toast, ToastContainer } from 'react-toastify';
import * as Yup from 'yup';
import warehouseApi from 'src/api/warehouseAPI';

function getProvine() {
  const dataProvice = [];
  addressData.forEach(element => {
    dataProvice.push({
      value: element.name,
      label: element.name
    })
  });
  return dataProvice;
}


function CreateKhoHang() {

  const initialValues = {
    tenkhohang : '',
    suchuatoida : '',
    trangthai: '',
    provine: null,
    district: null,
    phuong: null
  };

  const dataProvice = getProvine();
  const [province, setProvince] = useState({
    dataProvice
  });

  const [wards, setWards] = useState([]);
  const [district, setDistrict] = useState([]);
  const [selectedProvine, setSelectedProvine] = useState('');
  const [dataKhoHang, setDataKhoHang] = useState([]);

  function onchangeDataProvice(value) {
    setSelectedProvine(value);
    let districtList = []
    const district = addressData.find(option => option.name === value).districts;
    district.forEach(element => {
      districtList.push({
        value: element.name,
        label: element.name
      })
    });
    setDistrict(districtList);
  }

  function onchangeDataDistrict(value) {
    let wardsList = []
    const district = addressData.find(option => option.name === selectedProvine).districts;
    const wards = district.find(option => option.name === value).wards;
    wards.forEach(element => {
      wardsList.push({
        value: element.name,
        label: `${element.prefix} ${element.name}`
      })
    });
    setWards(wardsList);
  }

  const validationSchema = Yup.object().shape({
    provine: Yup.string().required('Vui lòng chọn tên tỉnh, thành phố').nullable(),
    district: Yup.string().required('Vui lòng chọn tên quận, huyện').nullable(),
    phuong: Yup.string().required('Vui lòng chọn tên phường, xã').nullable(),
    
    tenkhohang: Yup.string().required('Vui lòng nhập tên kho hàng'),
    suchuatoida: Yup.string().required('Vui lòng nhập sức chứa tối đa'),
    trangthai: Yup.string().required('Vui lòng nhập trạng thái'),

  })

  const handleSubmitForm = async (values,resetForm) => {
    await warehouseApi.createWarehouse(values)
      .then(response => {
        if(response.message === "create info warehouse success"){
          toast.success("Tạo thông tin kho hàng thành công");
          fetchDataKhoHang();
          resetForm({})
        }
        else{
          toast.success("Tạo thông tin kho hàng thất bại");
        }
      })
      .catch(error => {
        toast.error(error.response.data.message);
      })
  }

  const fetchDataKhoHang = async () => {
    try {
      await warehouseApi.getall()
        .then(response => {
          setDataKhoHang(response.data);
        })
        .catch(error => console.log(error))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDataKhoHang();
  }, [])

  const handleUpdateKhoHang = async (tenKH,succhuaKH,trangthaiKH,provineKH,districtKH,phuongKH) => {

    const warehouse = {
      tenkhohang: tenKH,
      succhua: succhuaKH,
      trangthai: trangthaiKH,
      provine: provineKH,
      district: districtKH,
      phuong: phuongKH
    }
    await warehouseApi.updateWarehouse(warehouse)
      .then(response => {
        toast.success("Chỉnh sữa kho hàng thành công");
        fetchDataKhoHang();
      })
      .catch(error => {
        toast.error(error.response.data.message);
      })

  }

  const handleDeleteKhoHang = async (tenkhohang) => {
    await warehouseApi.deleteWarehouse(tenkhohang)
      .then(response => {
        toast.success("Xóa kho hàng thành công");
        fetchDataKhoHang();
      })
      .catch(error => {
        toast.error(error.response.data.message);
      })
  }

  return (
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values, { resetForm }) => handleSubmitForm(values,resetForm)}
    >
      {formikProps => {

        return (
          <>
            <CRow>
              <CCol sm="12" xl="12">
                <CCard>
                  <CCardHeader>
                    Thông tin kho hàng
                  </CCardHeader>
                  <CCardBody>
                    <Form action="" className="form-horizontal">
                      <FastField
                        name="tenkhohang"
                        component={InputField}

                        label="Tên kho hàng"
                        placeholder="Tên kho hàng..."
                      />


                      <FastField
                        name="suchuatoida"
                        component={InputField}

                        label="Sức chứa tối đa"
                        placeholder="Sức chứa tối đa..."
                        type="number"
                      />

                      <FastField
                        name="trangthai"
                        component={InputField}

                        label="Trạng thái"
                        placeholder="Trạng thái..."
                      />

                      <FastField
                        name="provine"
                        component={SelectField}

                        label="Thị trấn, thành phố"
                        placeholder="Thị trấn, thành phố..."
                        options={province.dataProvice}
                        onchangeData={onchangeDataProvice}
                      />

                      <Field
                        name="district"
                        component={SelectField}

                        label="Quận, huyện"
                        placeholder="Quận, huyện..."
                        options={district}
                        onchangeDataDistrict={onchangeDataDistrict}
                      />

                      <Field
                        name="phuong"
                        component={SelectField}

                        label="Phường, xã"
                        placeholder="Phường, xã..."
                        options={wards}
                      />

                      <CardFooter>
                        <Button type="submit" size="sm" color="primary" ><i className="fa fa-dot-circle-o"></i>Tạo mới kho hàng</Button>
                      </CardFooter>
                    </Form>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>

            <CRow>
              <CCol sm="12" xl="12">
                <CCard>
                  <CCardHeader>
                    Danh sách kho hàng
            </CCardHeader>
                  <CCardBody>
                    <DanhsachKhoHang data={dataKhoHang} deleteKhoHang={handleDeleteKhoHang} updateKhoHang={handleUpdateKhoHang}/>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>


            <ToastContainer />
          </>
        )
      }}
    </Formik>
  );
}

export default CreateKhoHang;