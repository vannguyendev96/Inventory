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
import { useSelector } from 'react-redux';

function PhieuNhapKho() {
  let history = useHistory();
  const [loading, setLoading] = useState(false);

  const roll = useSelector(state => state.login.roll);

  const handleSubmitNewPNK = () =>{
    setLoading(true);
  }

  useEffect(() => {
    if(localStorage.getItem("role") === "admin"){
      history.push("/kho-hang");
    } 
  }, []);
  
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