import React, { useState } from 'react';
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

import CreatePXK from './formPXK';
import PhuongThucThanhToan from './formThanhToan';
import ListCreatePXK from './listNewPXK';
import Lydoxuatkho from './formlydoxuatkho';
import { toast, ToastContainer } from 'react-toastify';
import pxkApi from 'src/api/pxkAPI';
import SelectDriver from './formDriver';

function PhieuXuatKho() {

  const [items, setItems] = useState([]);
  const [lydoxuatkho, setLydoxuatkho] = useState('');
  const [sotienthanhtoan, setSotienthanhtoan] = useState('');
  const [phuongthucthanhtoan, setPhuongthucthanhtoan] = useState('');

  const [taixevanchuyen, setTaixevanchuyen] = useState('');
  const [quangduongvanchuyen, setQuangduongvanchuyen] = useState('');
  const [dongiacuoc, setDongiacuoc] = useState('');
  const [fromDate, setFromDate] = useState('');

  const [soluongtonkho, setSoluongtonkho] = useState(0);

  const [tongtien, setTongtien] = useState(0);

  const handleSubmitNewKienHang = (values, dataTenKienHang, dataLoaiKienHang, dataKhoChuaKienHang, dataDonGia,
    dataKhoiLuong, dataAddress, dataTenNguoiGui, dataSDTNguoiGui, resetForm) => {
    if (parseFloat(values.soluongkienhang, 10) > soluongtonkho) {
      toast.error(`Tồn kho của kiện hàng ${dataTenKienHang} chỉ còn ${soluongtonkho}`);
    }
    else if(values.sdtnguoinhan === dataSDTNguoiGui)
    {
      toast.error("Số điện thoại người nhận và người gửi phải khác nhau");
    }
    else {
      setItems([
        ...items,
        {
          nguoitaolohang: localStorage.getItem("username"),
          tenkienhang: dataTenKienHang,
          soluongkienhang: values.soluongkienhang,
          khoiluongkienhang: dataKhoiLuong,
          trangthai: values.trangthaikienhang,
          loaikienhang: dataLoaiKienHang,
          khochuakienhang: dataKhoChuaKienHang,
          diachikhochua: dataAddress,
          tennguoinhan: values.tennguoinhan,
          sdtnguoinhan: values.sdtnguoinhan,
          diachinguoinhan: values.diachinguoinhan,
          tennguoigui: dataTenNguoiGui,
          sdtnguoigui: dataSDTNguoiGui,
          diachinguoigui: values.diachinguoigui,
          dongia: dataDonGia
        }
      ]);

      const arrayItems = [
        ...items,
        {
          nguoitaolohang: localStorage.getItem("username"),
          tenkienhang: dataTenKienHang,
          soluongkienhang: values.soluongkienhang,
          khoiluongkienhang: dataKhoiLuong,
          trangthai: values.trangthaikienhang,
          loaikienhang: dataLoaiKienHang,
          khochuakienhang: dataKhoChuaKienHang,
          diachikhochua: dataAddress,
          tennguoinhan: values.tennguoinhan,
          sdtnguoinhan: values.sdtnguoinhan,
          diachinguoinhan: values.diachinguoinhan,
          tennguoigui: dataTenNguoiGui,
          sdtnguoigui: dataSDTNguoiGui,
          diachinguoigui: values.diachinguoigui,
          dongia: dataDonGia
        }
      ];

      let total = 0;
      arrayItems.forEach(kienhang => {
        const dongiaConvert = (kienhang.dongia).split(",").join("");
        total = tongtien + parseFloat(dongiaConvert, 10) * parseFloat(kienhang.soluongkienhang, 10) * parseFloat(dataKhoiLuong, 10);
      });
      setTongtien(total);

      toast.success("Đã thêm kiện hàng vào đơn hàng");
    }

    //resetForm({});
  }

  function handleOnchangeData(value) {
    setLydoxuatkho(value);
  }

  function handleOnchangeDataSTTT(value) {
    setSotienthanhtoan(value);
  }

  function handleOnchangeDataPTTT(value) {
    setPhuongthucthanhtoan(value);
  }

  const handleSubmitNewPXK = async () => {
    if (lydoxuatkho === '') {
      toast.error("Vui lòng nhập lý do xuất kho");
    }
    else if (taixevanchuyen === '') {
      toast.error("Vui lòng nhập tài xế vận chuyển");
    }
    else if (quangduongvanchuyen === '') {
      toast.error("Vui lòng nhập quản đường vận chuyển");
    }
    else if (dongiacuoc === '') {
      toast.error("Vui lòng nhập đơn giá cước");
    }
    else if (fromDate === '') {
      toast.error("Vui lòng nhập ngay xuat kho");
    }
    else {
      const pttt = (phuongthucthanhtoan !== '') ? phuongthucthanhtoan : 'Chuyển khoản';
      await pxkApi.taophieuxuatkho(items, lydoxuatkho, tongtien, pttt,
        taixevanchuyen, dongiacuoc, quangduongvanchuyen, fromDate)
        .then(response => {
          toast.success(`Tạo thành công phiếu xuất kho mã ${response.malohang}`);
        })
        .catch(error => {
          toast.error(error.response.data.message);
        })
    }
  }

  function handleOnChangeDataDriver(driver) {
    setTaixevanchuyen(driver)
  }

  function handleOnChangeDataDongia(value) {
    setDongiacuoc(value)
  }

  function handleOnChangeDataQuangduong(value) {
    setQuangduongvanchuyen(value)
  }

  function handleOnChangeSoLuong(soluong) {
    setSoluongtonkho(soluong);
  }

  return (
    <>
      <CRow>
        <CCol sm="12" xl="12">
          <CCard>
            <CCardHeader>
              Thông tin kiện hàng cần xuất kho
            </CCardHeader>
            <CCardBody>
              <CreatePXK onSubmit={handleSubmitNewKienHang} onChangeSoLuong={handleOnChangeSoLuong} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol sm="12" xl="12">
          <CCard>
            <CCardHeader>
              Lý do xuất kho
            </CCardHeader>
            <CCardBody>
              <Lydoxuatkho onChangeData={handleOnchangeData} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol sm="12" xl="12">
          <CCard>
            <CCardHeader>
              Thông tin thanh toán
            </CCardHeader>
            <CCardBody>
              <PhuongThucThanhToan valueCurrency={tongtien} onChangeDataSTTT={handleOnchangeDataSTTT} onChangeDataPTTT={handleOnchangeDataPTTT} />
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
              <SelectDriver onChangeDataDriver={handleOnChangeDataDriver}
                onChangeDataDonGia={handleOnChangeDataDongia}
                onChangeDataQuangDuong={handleOnChangeDataQuangduong} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol sm="12" xl="12">
          <CCard>
            <CCardHeader>
              Ngày Xuất Kho
            </CCardHeader>
            <CCardBody>
              <Form action="" className="form-horizontal">

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="hf-password">Ngày Xuất Kho</Label>
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
              Danh sách kiện hàng cần xuất kho
            </CCardHeader>
            <CCardBody>
              <ListCreatePXK data={items} onSubmit={handleSubmitNewPXK} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <ToastContainer />
    </>
  );
}

export default PhieuXuatKho;