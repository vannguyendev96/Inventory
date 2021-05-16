import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react';
import { FastField, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  Button, CardFooter
} from 'reactstrap';
import InputField from 'src/custom-fields/InputField';
import SelectField from 'src/custom-fields/SelectField';
import FullPageLoader from 'src/views/fullpageloading';
import { addressData } from '../../../constant/tinh-thanh-viet-nam';
import * as Yup from 'yup';
import driverApi from 'src/api/driverAPI';
import { toast, ToastContainer } from 'react-toastify';
import DanhsachTaixe from './danhsachtaixe';

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


function QuanLiTaiXe() {

  const initialValues = {
    tentx: '',
    provine: null,
    district: null,
    cmnd: '',
    trangthai: '',
    sdt: '',
    namsinh: '',
    phuong: null
  };

  const phoneRegExp = /((09|03|07|08|05)+([0-9]{8})\b)/g //validate sdt
  const nameRegExp = /^[^0-9]+$/

  const validationSchema = Yup.object().shape({
    provine: Yup.string().required('Vui lòng chọn tên tỉnh, thành phố').nullable(),
    district: Yup.string().required('Vui lòng chọn tên quận, huyện').nullable(),
    phuong: Yup.string().required('Vui lòng chọn tên phường, xã').nullable(),
    tentx: Yup.string().matches(nameRegExp,'Tên tài xế không đúng định dạng').required('Vui lòng nhập tên tài xế'),
    cmnd: Yup.string().required('Vui lòng nhập chứng minh nhân dân'),
    trangthai: Yup.string().required('Vui lòng nhập trạng thái'),
    namsinh: Yup.string().required('Vui lòng nhập năm sinh'),
    sdt: Yup.string().matches(phoneRegExp, 'Số điện thoại của bạn không đúng định dạng').required('Vui lòng nhập số điện thoại'), // them cai phoneRegExp vao may cho can validate sdt
  })


  const dataProvice = getProvine();
  const [province, setProvince] = useState({
    dataProvice
  });

  const [wards, setWards] = useState([]);
  const [district, setDistrict] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvine, setSelectedProvine] = useState('');
  const [dataDriver, setDataDriver] = useState([]);

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

  const handleSubmitForm = async (values,resetForm) => {
    await driverApi.createInfoDriver(values)
      .then(response => {
        if(response.message === "create info driver success"){
          toast.success("Tạo thông tin tài xế thành công");
          fetchDataDriver();
          resetForm({})
        }
        else{
          toast.success("Tạo thông tin tài xế thất bại");
        }
      })
      .catch(error => {
        if(error.response.status === 403){
          toast.error("Tài xế đã được tạo trước đó")
        }
        else{
          toast.error("Tạo thông tin tài xế thất bại")
        }
      })
  }

  const fetchDataDriver = async () => {
    try {
      await driverApi.getall()
        .then(response => {
          setDataDriver(response.data);
        })
        .catch(error => console.log(error))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDataDriver();
  }, [])

  const handleUpdateDriver = async (cmnd,tenTX,sdtTX,trangthaiTX,namsinhTX,provineTX,districtTX,phuongTX) => {
    const driver = {
      cmnd: cmnd,
      tentx: tenTX,
      sdt: sdtTX,
      trangthai: trangthaiTX,
      namsinh: namsinhTX,
      provine: provineTX,
      district: districtTX,
      phuong: phuongTX
    }
    await driverApi.updateDriver(driver)
      .then(response => {
        toast.success("Chỉnh sữa tài xế thành công");
        fetchDataDriver();
      })
      .catch(error => {
        toast.error(error.response.data.message);
      })
  }

  const handleDeleteTX = async (cmnd) => {
    await driverApi.deleteDriver(cmnd)
      .then(response => {
        toast.success("Xóa tài xế thành công");
        fetchDataDriver();
      })
      .catch(error => {
        toast.error(error.response.data.message);
      })
  }


  return (
    <Formik
      enableReinitialize
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
                    Thông tin tài xế
                  </CCardHeader>
                  <CCardBody>
                    <Form action="" className="form-horizontal">
                      <FastField
                        name="tentx"
                        component={InputField}

                        label="Tên tài xế"
                        placeholder="Tên tài xế..."
                      />

                      <FastField
                        name="cmnd"
                        component={InputField}

                        label="Chứng minh nhân dân"
                        placeholder="Chứng minh nhân dân..."
                      />

                      <FastField
                        name="trangthai"
                        component={InputField}

                        label="Trạng thái"
                        placeholder="Trạng thái..."
                      />

                      <FastField
                        name="sdt"
                        component={InputField}

                        label="Số điện thoại"
                        placeholder="Số điện thoại..."
                      />

                      <FastField
                        name="namsinh"
                        component={InputField}

                        label="Năm sinh"
                        placeholder="Năm sinh..."
                        type="date"
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
                        <Button type="submit" size="sm" color="primary" ><i className="fa fa-dot-circle-o"></i>Tạo thông tin tài xế</Button>
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
                    Danh sách tài xế
                  </CCardHeader>
                  <CCardBody>
                    <DanhsachTaixe data={dataDriver} deleteDriver={handleDeleteTX} updateDriver={handleUpdateDriver}/>
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

export default QuanLiTaiXe;