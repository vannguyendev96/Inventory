import {
  CCard,
  CCardBody,
  CCardHeader, CCol,
  CRow
} from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import pnkApi from 'src/api/pnkAPI';
import DanhSachTonKho from './kiemke-danhsach';

function PhieuKiemKe() {

  const [dataListTonKho, setDataListTonKho] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDataTonKho = async () => {
    setIsLoading(true);
    try {
      await pnkApi.getlistkhtk()
        .then(response => {
          setIsLoading(false);
          setDataListTonKho(response.data);
        })
        .catch(error => setIsLoading(false))
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchDataTonKho();
  }, []);

  return (
    <>
      <CRow>
        <CCol xs="12" md="12" className="mb-4">
          <CCard>
            <CCardHeader>
              Danh sách kiện hàng tồn kho
            </CCardHeader>
            <CCardBody>
                <DanhSachTonKho data={dataListTonKho}/>
            </CCardBody>
          </CCard>
        </CCol>

        <ToastContainer />
      </CRow>
    </>
  );
}

export default PhieuKiemKe;