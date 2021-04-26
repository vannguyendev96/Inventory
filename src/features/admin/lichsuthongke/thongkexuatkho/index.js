import React, { useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'

import SearchReport from './formSearch';
import ListReportXuatKho from './fromDanhsach';


function Report() {
  return (
    <>
      <CRow>
        <CCol sm="12" xl="12">
          <CCard>
            <CCardHeader>
              Thông tin tìm kiếm
            </CCardHeader>
            <CCardBody>
              <SearchReport />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>


      <CRow>
        <CCol sm="12" xl="12">
          <CCard>
            <CCardHeader>
              Danh sách xuất kho
            </CCardHeader>
            <CCardBody>
              <ListReportXuatKho />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}

export default Report;