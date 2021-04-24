import React from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'


import CreatePNK from './formPNK';
import ListCreatePNK from './listNewPNK';

function PhieuNhapKho() {
  return (
    <>
      <CRow>
        <CCol sm="12" xl="12">
          <CCard>
            <CCardHeader>
              Thông tin kiện hàng cần xuất kho
          </CCardHeader>
            <CCardBody>
                <CreatePNK />
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
              <ListCreatePNK/>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}

export default PhieuNhapKho;