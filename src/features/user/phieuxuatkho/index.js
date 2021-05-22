import React, { useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react';

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

  const [tongtien, setTongtien] = useState(0);

  const handleSubmitNewKienHang = (values, dataAddress, dataTenNguoiGui, dataSDTNguoiGui, resetForm) => {
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
        tennguoinhan: values.tennguoinhan,
        sdtnguoinhan: values.tennguoinhan,
        diachinguoinhan: values.diachinguoinhan,
        tennguoigui: dataTenNguoiGui,
        sdtnguoigui: dataSDTNguoiGui,
        diachinguoigui: values.diachinguoigui,
        dongia: values.dongia
      }
    ]);


    const arrayItems = [
      ...items,
      {
        nguoitaolohang: localStorage.getItem("username"),
        tenkienhang: values.tenkienhang,
        soluongkienhang: values.soluongkienhang,
        trangthai: values.trangthaikienhang,
        loaikienhang: values.loaikienhang,
        khochuakienhang: values.khochuahang,
        diachikhochua: dataAddress,
        tennguoinhan: values.tennguoinhan,
        sdtnguoinhan: values.tennguoinhan,
        diachinguoinhan: values.diachinguoinhan,
        tennguoigui: dataTenNguoiGui,
        sdtnguoigui: dataSDTNguoiGui,
        diachinguoigui: values.diachinguoigui,
        dongia: values.dongia
      }
    ];

    let total = 0;
    arrayItems.forEach(kienhang => {
      const dongiaConvert = (kienhang.dongia).split(",").join("");
      total = tongtien + parseFloat(dongiaConvert, 10);
    });
    setTongtien(total);

    toast.success("Đã thêm kiện hàng vào đơn hàng");
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
    console.log(value)
  }

  const handleSubmitNewPXK = async () => {
    if (lydoxuatkho === '') {
      toast.error("Vui lòng nhập lý do xuất kho");
    }
    else if (taixevanchuyen === '') {
      toast.error("Vui lòng nhập tài xế vận chuyển");
    }
    else {
      const pttt = (phuongthucthanhtoan !== '') ? phuongthucthanhtoan : 'Chuyển khoản';
      await pxkApi.taophieuxuatkho(items, lydoxuatkho, tongtien, pttt, taixevanchuyen)
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

  return (
    <>
      <CRow>
        <CCol sm="12" xl="12">
          <CCard>
            <CCardHeader>
              Thông tin kiện hàng cần xuất kho
          </CCardHeader>
            <CCardBody>
              <CreatePXK onSubmit={handleSubmitNewKienHang} />
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
              <SelectDriver onChangeDataDriver={handleOnChangeDataDriver} />
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