import React, { useEffect, useState } from 'react';
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
import { useSelector } from 'react-redux';
import DanhsachKhoHang from './danhsachkhohang';


function CreateKhoHang() {

  const token = useSelector(state => state.login.token);

  useEffect(() => {
    console.log(token)
  })

  return (
    <>
      <CRow>
        <CCol sm="12" xl="12">
          <CCard>
            <CCardHeader>
              Thông tin kho hàng
            </CCardHeader>
            <CCardBody>
              <Form action="" className="form-horizontal">
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="hf-password">Tên kho hàng</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="tenkhohang"
                      name="tenkhohang"
                      placeholder="Tên kho hàng..."
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="hf-password">Sức chứa tối đa</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="succhua"
                      name="succhua"
                      placeholder="Sức chứa tối đa..."
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="hf-password">Trạng thái</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="trangthai"
                      name="trangthai"
                      placeholder="Trạng thái..."
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="hf-password">Thị trấn, thành phố</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="thanhpho"
                      name="thanhpho"
                      placeholder="Thị trấn, thành phố..."
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="hf-password">Quận, huyện</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="huyen"
                      name="huyen"
                      placeholder="Quận, huyện..."
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="hf-password">Phường, xã</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="phuong"
                      name="phuong"
                      placeholder="Phường, xã..."
                    />
                  </Col>
                </FormGroup>

                <CardFooter>
                  <Button type="submit" size="sm" color="primary" ><i className="fa fa-dot-circle-o"></i>Tạo mới kho hàng</Button>
                </CardFooter>
              </Form>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol sm="12" xl="12">
          <CCard>
            <CCardHeader>
              Danh sách kho hàng
            </CCardHeader>
            <CCardBody>
              <DanhsachKhoHang/>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}

export default CreateKhoHang;