import {
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CCard,
  CCardBody,
  CTabs,
  CCardHeader,
} from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import kiemkeApi from 'src/api/kiemkeAPI';
import pnkApi from 'src/api/pnkAPI';
import DanhSachTonKho from './kiemke-danhsach';
import Lichsukiemke from './kiemke-lichsu';

function PhieuKiemKe() {

  const [dataListTonKho, setDataListTonKho] = useState([]);
  const [dataLichSuKiemKe, setDataLichSuKiemKe] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [active, setActive] = useState(0)

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

  const handleSubmit = async (data, soluong, trangthai) => {
    await kiemkeApi.createkiemke(data, soluong, trangthai)
      .then(response => {
        toast.success(`Tạo thành công phiếu kiểm kê`);
      })
      .catch(error => {
        toast.error(error.response.data.message);
      })
  }

  const handleRowClick = async (tenkienhang,dongia,loaikienhang,khochuakienhang) => {
    try {
      const dataClick = {
        tenkienhang,dongia,loaikienhang,khochuakienhang
      }
        await kiemkeApi.getdetail(dataClick)
            .then(response => {
              setDataLichSuKiemKe(response.data)
             
            })
            .catch(error => console.log(error))
    } catch (error) {
        console.log(error)
    }
    setActive(1);
}

  return (
    <>
      <CRow>
        <CCol xs="12" md="12" className="mb-4">
          <CCard>
            <CCardHeader>
              Kiện hàng tồn kho
            </CCardHeader>
            <CCardBody>
              <CTabs activeTab={active} onActiveTabChange={idx => setActive(idx)}>
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink>
                      Danh sách kiện hàng tồn kho
                      {active === 0 && ''}
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink>
                      Lịch sử kiểm kê
                      {active === 1 && ''}
                    </CNavLink>
                  </CNavItem>

                </CNav>
                <CTabContent>
                  <CTabPane>
                    <DanhSachTonKho data={dataListTonKho} onSubmit={handleSubmit} handleRowClick={handleRowClick}/>
                  </CTabPane>
                  <CTabPane>
                      <Lichsukiemke data={dataLichSuKiemKe}/>
                  </CTabPane>

                </CTabContent>
              </CTabs>
            </CCardBody>
          </CCard>
        </CCol>

        <ToastContainer />
      </CRow>
    </>
  );
}

export default PhieuKiemKe;