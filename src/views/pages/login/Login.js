import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
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
import CIcon from '@coreui/icons-react';

import { Alert } from 'reactstrap';
import { login } from '../../../redux/actions/login';
import { useDispatch, useSelector } from "react-redux";

import { setCookie } from '../../../utlis/cookies';

const Login = () => {
  let history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const [showErrorLogin, setShowErrorLogin] = useState('');

  const token = useSelector(state => state.login.token);
  const roll = useSelector(state => state.login.roll);
  const error = useSelector(state => state.login.error);
  const dispatch = useDispatch();

  const handleClickLogin = async () => {
    if (username === "") {
      setShowErrorLogin("Vui lòng nhập tên đăng nhập");
    }
    else if (password === "") {
      setShowErrorLogin("Vui lòng nhập mật khẩu");
    }
    else {
      const user = { username: username, password: password };
      const action = login(user);

      dispatch(action);
      
    }

  }
  useEffect(() => {
    if(token === 'error'){
      setShowErrorLogin("Tên đăng nhập hoặc mật khẩu không đúng");
    }
    else if(token !== null && token !== 'error' && token !== undefined){
      localStorage.setItem("role", roll);
      
      if(roll === "admin"){
        history.push("/kho-hang");
      }
      else{
        history.push("/phieu-nhap-kho");
      }
    }
   
  }, [token]);

  const handleEnter = (e) =>{
    if (e.key === 'Enter') {
      handleClickLogin();
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
                      <CInput type="text" placeholder="Username" autoComplete="username" onChange={(e) => setUsername(e.target.value)} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password" onKeyDown={handleEnter} onChange={(e) => setPassword(e.target.value)} />
                    </CInputGroup>

                    {showErrorLogin !== "" &&
                      <CRow>
                        <CCol xs="12">
                          <Alert color="danger" className="mb-4">
                            <p>{showErrorLogin}</p>
                          </Alert>
                        </CCol>
                      </CRow>
                    }

                    {/* {(token === "error") &&
                      <CRow>
                        <CCol xs="12">
                          <Alert color="danger" className="mb-4">
                            <p>Tên đăng nhập hoặc mật khẩu không đúng</p>
                          </Alert>
                        </CCol>
                      </CRow>
                    } */}

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
