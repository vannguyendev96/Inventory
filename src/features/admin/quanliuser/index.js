import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react';
import { FastField, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import {
  Button, CardFooter
} from 'reactstrap';
import userApi from 'src/api/userlogin';
import InputField from 'src/custom-fields/InputField';
import FullPageLoader from 'src/views/fullpageloading';
import * as Yup from 'yup';
import DanhsachThukho from './Danhsachthukho';




function QuanLiUser() {

  const [dataThuKho, setDataThuKho] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  const initialValues = {
    tenuser: '',
    email: '',
    chucvu: 'Thủ kho',
    sdt: '',
    kholamviec: '',
    username: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    tenuser: Yup.string().required('Vui lòng nhập tên user'),
    email: Yup.string().required('Vui lòng nhập email'),

    kholamviec: Yup.string().required('Vui lòng nhập Kho làm việc'),
    sdt: Yup.number().required('Vui lòng nhập số điện thoại'),
    username: Yup.string().required('Vui lòng nhập tên đăng nhập'),
    password: Yup.string().required('Vui lòng nhập tên mật khẩu')
  })

  const handleSubmitForm = async (values) => {

    //call service register
    await userApi.register(values)
      .then(response => {
        toast.success("Tạo tài khoản user thành công");
        fetchDataThuKho();
      })
      .catch(error => toast.error("Tạo tài khoản không thành công"))

  }

  const fetchDataThuKho = async () => {
    try {
      setIsLoading(true);
      await userApi.getall()
        .then(response => {
          setDataThuKho(response.data);
        })
        .catch(error => console.log(error))
      setIsLoading(false);
    } catch (error) {
      console.log(error)
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchDataThuKho();
  }, [])

  const handleDeleteThuKho = async (email) => {
    await userApi.deleteuser(email)
      .then(response => {
        toast.success("Xóa tài khoản thành công");
        fetchDataThuKho();
      })
      .catch(error => {
        toast.error(error.response.data.message);
      })
  }

  const handleUpdateThuKho = async (username, tenTK, emailTK, chucvuTK, sdtTK, kholamviecTK) => {
    console.log(username);
    const user = {
      username: username,
      chucvu: chucvuTK,
      tenuser: tenTK,
      email: emailTK,
      sdt: sdtTK,
      kholamviec: kholamviecTK
    }
    await userApi.updateeuser(user)
      .then(response => {
        toast.success("Chỉnh sữa tài khoản thành công");
        fetchDataThuKho();
      })
      .catch(error => {
        toast.error(error.response.data.message);
      })

  }

  // if(isLoading){
  //   return(
  //     <FullPageLoader/>
  //   )
  // }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => handleSubmitForm(values)}
    >
      {formikProps => {

        return (
          <>
            <CRow>
              <CCol sm="12" xl="12">
                <CCard>
                  <CCardHeader>
                    Thông tin thủ kho
                  </CCardHeader>
                  <CCardBody>
                    <Form action="" className="form-horizontal">
                      <FastField
                        name="tenuser"
                        component={InputField}

                        label="Tên thủ kho"
                        placeholder="Tên thủ kho..."
                      />


                      <FastField
                        name="email"
                        component={InputField}

                        label="Email"
                        placeholder="Email..."
                      />

                      <FastField
                        name="chucvu"
                        component={InputField}

                        label="Chức vụ"
                        placeholder="Thủ kho"
                        isreadonly={true}
                      />

                      <FastField
                        name="kholamviec"
                        component={InputField}

                        label="Kho làm việc"
                        placeholder="Kho làm việc..."
                      />

                      <FastField
                        name="sdt"
                        component={InputField}

                        label="Số điện thoại"
                        placeholder="Số điện thoại..."
                        type="number"
                      />

                      <FastField
                        name="username"
                        component={InputField}

                        label="Thông tin đăng nhập"
                        placeholder="Tên đăng nhập..."
                      />

                      <FastField
                        name="password"
                        component={InputField}

                        label=""
                        placeholder="Mật khẩu..."
                      />

                      <CardFooter>
                        <Button type="submit" size="sm" color="primary" ><i className="fa fa-dot-circle-o"></i>Tạo tài khoản thủ kho</Button>
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
                    Danh sách thủ kho
                  </CCardHeader>
                  <CCardBody>
                    <DanhsachThukho data={dataThuKho} deleteThukho={handleDeleteThuKho} updateThukho={handleUpdateThuKho} />
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>


            <ToastContainer />
          </>
        )
      }}
    </Formik>
  );
}

export default QuanLiUser;