import React, { useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'

import SearchReportNhapKho from './formSearch';
import ListReportNhapKho from './formDanhsach';


function ReportNhapKho() {
  return (
    <>
      <CRow>
        <CCol sm="12" xl="12">
          <CCard>
            <CCardHeader>
              Thông tin tìm kiếm
            </CCardHeader>
            <CCardBody>
              <SearchReportNhapKho />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>


      <CRow>
        <CCol sm="12" xl="12">
          <CCard>
            <CCardHeader>
              Danh sách nhập kho
            </CCardHeader>
            <CCardBody>
              <ListReportNhapKho />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}

export default ReportNhapKho;