import React, { useEffect, useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'


import CreatePNK from './formPNK';
import ListCreatePNK from './listNewPNK';
import FullPageLoader from '../../../views/fullpageloading';
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import pnkApi from 'src/api/pnkAPI';


function PhieuNhapKho() {
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  const handleSubmitNewPNK = async () => {
    await pnkApi.taophieunhapkho(items)
      .then(response => {
        toast.success(`Tạo thành công phiếu nhập kho mã ${response.malohang}`);
      })
      .catch(error => {
        toast.error(error.response.data.message);
      })
  }

  useEffect(() => {
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
        diachinguoigui: values.diachinguoigui
      }
    ]);
    toast.success("Đã thêm kiện hàng vào đơn hàng");
    resetForm({});
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