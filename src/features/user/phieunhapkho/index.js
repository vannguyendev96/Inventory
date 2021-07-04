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
import CurrencyFormat from 'react-currency-format';
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
  const [fromDate, setFromDate] = useState('');

  const [quangduongvanchuyen, setQuangduongvanchuyen] = useState('');
  const [dongiacuoc, setDongiacuoc] = useState('');

  const handleSubmitNewPNK = async () => {
    if (driver === '') {
      toast.error(`Vui lòng chọn tài xế vận chuyển`);
    }
    else if (fromDate === '') {
      toast.error("Vui lòng nhập ngay nhap kho");
    }
    else {
      setIsLoading(true);
      await pnkApi.taophieunhapkho(items, driver, dongiacuoc, quangduongvanchuyen, fromDate)
        .then(response => {
          // console.log("a")
          // toast.success(`Tạo thành công phiếu nhập kho mã ${response.malohang}`);
          setIsLoading(false);
          history.push({
            pathname: '/phieu-nhap-kho-danhsach',
            state: {
              malohang: response.malohang,
            },
          });
        })
        .catch(error => {
          setIsLoading(false);
          toast.error(error.response.data.message);
        })
    }
    // 
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
        khoiluongkienhang: values.khoiluongkienhang,
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

    setDriver(target.value);
  }

  function getDifferenceInDays(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
  }

  return (
    <div>
      {loading ? <FullPageLoader /> :
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

                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="hf-password">Quảng đường vận chuyển(KM)</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input
                          type="number"
                          id="qdvc"
                          name="qdvc"
                          placeholder="Quảng đường vận chuyển(KM)..."
                          onChange={(e) => setQuangduongvanchuyen(e.target.value)} //setQuangduongvanchuyen
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="hf-password">Đơn giá cước</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <CurrencyFormat
                          thousandSeparator={true} prefix={'VND '}
                          onValueChange={(values) => setDongiacuoc(values.value)}
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
                  Ngay Nhap Kho
                </CCardHeader>
                <CCardBody>
                  <Form action="" className="form-horizontal">

                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="hf-password">Ngay Nhap Kho</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input
                          type="date"
                          id="fromdate"
                          name="fromdate"
                          placeholder="Từ ngày..."
                          onChange={event => setFromDate(event.target.value)}
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
      }
    </div>

  );
}

export default PhieuNhapKho;