import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Login = () => {
  let history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClickLogin = () => {
    //history.push("/phieu-nhap-kho");
    if(username === 'user'){
      localStorage.setItem("role", "user");
      history.push("/phieu-nhap-kho");
    }
    else if(username === 'admin'){
      localStorage.setItem("role", "admin");
      history.push("/kho-hang");
    }
  }
 
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Đăng nhập</h1>
                    <p className="text-muted">Đăng nhập vào tài khoản của bạn</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" autoComplete="username" onChange={(e) => setUsername(e.target.value)}/>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)}/>
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" onClick={handleClickLogin}>Login</CButton>
                      </CCol>
                      
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>HCMUT</h2>
                    <p>Hệ thống quản lí kho</p>
                    
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
