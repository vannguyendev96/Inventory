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

function PhieuXuatKho() {

  const [items, setItems] = useState([]);
  const [lydoxuatkho, setLydoxuatkho] = useState('');
  const [sotienthanhtoan, setSotienthanhtoan] = useState('');
  const [phuongthucthanhtoan, setPhuongthucthanhtoan] = useState('');

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
        diachinguoigui: values.diachinguoigui
      }
    ]);
    toast.success("Đã thêm kiện hàng vào đơn hàng");
    resetForm({});
  }

  function handleOnchangeData(value){
    setLydoxuatkho(value);
  }

  function handleOnchangeDataSTTT(value){
    setSotienthanhtoan(value);
  }

  function handleOnchangeDataPTTT(value){
    setPhuongthucthanhtoan(value);
    console.log(value)
  }

  const handleSubmitNewPXK = async () => {
    if(lydoxuatkho === ''){
      toast.error("Vui lòng nhập lý do xuất kho");
    }
    else if(sotienthanhtoan === ''){
      toast.error("Vui lòng nhập số tiền thanh toán");
    }
    else if(sotienthanhtoan === ''){
      toast.error("Vui lòng nhập phương thức thanh toán");
    }
    else{
      await pxkApi.taophieuxuatkho(items,lydoxuatkho,sotienthanhtoan,phuongthucthanhtoan)
      .then(response => {
        toast.success(`Tạo thành công phiếu xuất kho mã ${response.malohang}`);
      })
      .catch(error => {
        toast.error(error.response.data.message);
      })
    }
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
              <CreatePXK onSubmit={handleSubmitNewKienHang}/>
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
              <Lydoxuatkho onChangeData={handleOnchangeData}/>
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
              <PhuongThucThanhToan onChangeDataSTTT={handleOnchangeDataSTTT} onChangeDataPTTT={handleOnchangeDataPTTT}/>
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
              <ListCreatePXK data={items} onSubmit={handleSubmitNewPXK}/>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <ToastContainer />
    </>
  );
}

export default PhieuXuatKho;