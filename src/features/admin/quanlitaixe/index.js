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


function QuanLiTaiXe() {
  return (
    <>
      <CRow>
        <CCol sm="12" xl="12">
          <CCard>
            <CCardHeader>
              Thông tin tài xế
          </CCardHeader>
            <CCardBody>
              <Form action="" className="form-horizontal">
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="hf-password">Tên tài xế</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="tentx"
                      name="tentx"
                      placeholder="Tên tài xế..."
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="hf-password">Chứng minh nhân dân</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="cmnd"
                      name="cmnd"
                      placeholder="Chứng minh nhân dân..."
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
                    <Label htmlFor="hf-password">Năm sinh</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="date"
                      id="dateNS"
                      name="dateNS"
                      placeholder="Năm sinh..."
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
                  <Button type="submit" size="sm" color="primary" ><i className="fa fa-dot-circle-o"></i>Tạo thông tin tài xế</Button>
                </CardFooter>
              </Form>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

    </>
  );
}

export default QuanLiTaiXe;