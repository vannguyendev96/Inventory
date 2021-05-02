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


function PhieuXuatKho() {
  return (
    <>
      <CRow>
        <CCol sm="12" xl="12">
          <CCard>
            <CCardHeader>
              Thông tin kiện hàng cần xuất kho
          </CCardHeader>
            <CCardBody>
              <CreatePXK />
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
              <Lydoxuatkho/>
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
              <PhuongThucThanhToan />
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
              <ListCreatePXK />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}

export default PhieuXuatKho;