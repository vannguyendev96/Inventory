import React, { useState } from 'react';
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

function PhieuNhapKho() {

  const [loading, setLoading] = useState(false);

  const handleSubmitNewPNK = () =>{
    setLoading(true);
  }

  if(loading){
    return <FullPageLoader />
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
                <CreatePNK />
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
              <ListCreatePNK onSubmit={handleSubmitNewPNK}/>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}

export default PhieuNhapKho;