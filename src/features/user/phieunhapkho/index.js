import React, { useEffect, useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react';

import {
  Col,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';


import CreatePNK from './formPNK';
import ListCreatePNK from './listNewPNK';
import FullPageLoader from '../../../views/fullpageloading';
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import pnkApi from 'src/api/pnkAPI';
import Select from "react-select";
import driverApi from "src/api/driverAPI";


function PhieuNhapKho() {
  let history = useHistory();
  const [loading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [dataDriver, setDataDriver] = useState([]);
  const [driver, setDriver] = useState('');

  const handleSubmitNewPNK = async () => {
    if (driver === '') {
      toast.error(`Vui lòng chọn tài xế vận chuyển`);
    }
    else {
      console.log(items)
      await pnkApi.taophieunhapkho(items,driver)
        .then(response => {
          toast.success(`Tạo thành công phiếu nhập kho mã ${response.malohang}`);
        })
        .catch(error => {
          toast.error(error.response.data.message);
        })
    }
  }

  const getListDriver = async () => {
    setIsLoading(true);
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

  useEffect(() => {
    getListDriver();
    if (localStorage.getItem("role") === "admin") {
      history.push("/kho-hang");
    }
  }, []);

  const handleSubmitNewKienHang = (values, dataAddress, dataTenNguoiNhan, dataSDTNguoiNhan, resetForm) => {
    setItems([
      ...items,
      {
        nguoitaolohang: localStorage.getItem("username"),
        tenkienhang: values.tenkienhang,
        soluongkienhang: values.soluongkienhang,
        trangthai: values.trangthaikienhang,
        loaikienhang: values.loaikienhang,
        khochuakienhang: values.khochuahang,
        diachikhochua: dataAddress,
        tennguoinhan: dataTenNguoiNhan,
        sdtnguoinhan: dataSDTNguoiNhan,
        diachinguoinhan: values.diachinguoinhan,
        tennguoigui: values.tennguoigui,
        sdtnguoigui: values.sdtnguoigui,
        diachinguoigui: values.diachinguoigui,
        dongia: values.dongia
      }
    ]);
    toast.success("Đã thêm kiện hàng vào đơn hàng");
    //resetForm({});
  }

  function handleOnchangeDataDriver(target) {
    console.log(target.value)
    setDriver(target.value);
  }

  return (
    <>
      <CRow>
        <CCol sm="12" xl="12">
          <CCard>
            <CCardHeader>
              Thông tin kiện hàng cần nhập kho
          </CCardHeader>
            <CCardBody>
              <CreatePNK onSubmit={handleSubmitNewKienHang} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol sm="12" xl="12">
          <CCard>
            <CCardHeader>
            Thông tin tài xế
          </CCardHeader>
            <CCardBody>
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
              </Form>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>



      <CRow>
        <CCol sm="12" xl="12">
          <CCard>
            <CCardHeader>
              Danh sách kiện hàng cần nhập kho
            </CCardHeader>
            <CCardBody>
              <ListCreatePNK data={items} onSubmit={handleSubmitNewPNK} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <ToastContainer />
    </>
  );
}

export default PhieuNhapKho;