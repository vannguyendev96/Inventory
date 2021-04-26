import React, { useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react';

import {
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  CardFooter,
  Button,
  FormText,
} from 'reactstrap';


function QuanLiUser() {
  return (
    <>
      <CRow>
        <CCol sm="12" xl="12">
          <CCard>
            <CCardHeader>
              Thông tin user
          </CCardHeader>
            <CCardBody>
              <Form action="" className="form-horizontal">
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="hf-password">Tên user</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="tentx"
                      name="tentx"
                      placeholder="Tên user..."
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="hf-password">Email</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Email..."
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="hf-password">Chức vụ</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="chucvu"
                      name="chucvu"
                      placeholder="Chức vụ..."
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="hf-password">Số điện thoại</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="number"
                      id="sdt"
                      name="sdt"
                      placeholder="Số điện thoại..."
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="hf-password">Thông tin đăng nhập</Label>
                  </Col>
                  <Col xs="12" md="4">
                    <Input
                      type="text"
                      id="tendn"
                      name="tendn"
                      placeholder="Tên đăng nhập..."
                    />
                  </Col>

                  <Col xs="12" md="4">
                    <Input
                      type="text"
                      id="mk"
                      name="mk"
                      placeholder="Mật khẩu..."
                    />
                  </Col>
                </FormGroup>

                

                <CardFooter>
                  <Button type="submit" size="sm" color="primary" ><i className="fa fa-dot-circle-o"></i>Tạo tài khoản thủ kho</Button>
                </CardFooter>
              </Form>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

    </>
  );
}

export default QuanLiUser;