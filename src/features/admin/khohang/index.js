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
    provine: Yup.string().required('Vui l??ng ch???n t??n t???nh, th??nh ph???').nullable(),
    district: Yup.string().required('Vui l??ng ch???n t??n qu???n, huy???n').nullable(),
    phuong: Yup.string().required('Vui l??ng ch???n t??n ph?????ng, x??').nullable(),
    
    tenkhohang: Yup.string().required('Vui l??ng nh???p t??n kho h??ng'),
    suchuatoida: Yup.string().required('Vui l??ng nh???p s???c ch???a t???i ??a'),
    trangthai: Yup.string().required('Vui l??ng nh???p tr???ng th??i'),

  })

  const handleSubmitForm = async (values,resetForm) => {
    await warehouseApi.createWarehouse(values)
      .then(response => {
        if(response.message === "create info warehouse success"){
          toast.success("T???o th??ng tin kho h??ng th??nh c??ng");
          fetchDataKhoHang();
          resetForm({})
        }
        else{
          toast.success("T???o th??ng tin kho h??ng th???t b???i");
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
        toast.success("Ch???nh s???a kho h??ng th??nh c??ng");
        fetchDataKhoHang();
      })
      .catch(error => {
        toast.error(error.response.data.message);
      })

  }

  const handleDeleteKhoHang = async (tenkhohang) => {
    await warehouseApi.deleteWarehouse(tenkhohang)
      .then(response => {
        toast.success("X??a kho h??ng th??nh c??ng");
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
                    Th??ng tin kho h??ng
                  </CCardHeader>
                  <CCardBody>
                    <Form action="" className="form-horizontal">
                      <FastField
                        name="tenkhohang"
                        component={InputField}

                        label="T??n kho h??ng"
                        placeholder="T??n kho h??ng..."
                      />


                      <FastField
                        name="suchuatoida"
                        component={InputField}

                        label="S???c ch???a t???i ??a"
                        placeholder="S???c ch???a t???i ??a..."
                        type="number"
                      />

                      <FastField
                        name="trangthai"
                        component={InputField}

                        label="Tr???ng th??i"
                        placeholder="Tr???ng th??i..."
                      />

                      <FastField
                        name="provine"
                        component={SelectField}

                        label="Th??? tr???n, th??nh ph???"
                        placeholder="Th??? tr???n, th??nh ph???..."
                        options={province.dataProvice}
                        onchangeData={onchangeDataProvice}
                      />

                      <Field
                        name="district"
                        component={SelectField}

                        label="Qu???n, huy???n"
                        placeholder="Qu???n, huy???n..."
                        options={district}
                        onchangeDataDistrict={onchangeDataDistrict}
                      />

                      <Field
                        name="phuong"
                        component={SelectField}

                        label="Ph?????ng, x??"
                        placeholder="Ph?????ng, x??..."
                        options={wards}
                      />

                      <CardFooter>
                        <Button type="submit" size="sm" color="primary" ><i className="fa fa-dot-circle-o"></i>T???o m???i kho h??ng</Button>
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
                    Danh s??ch kho h??ng
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