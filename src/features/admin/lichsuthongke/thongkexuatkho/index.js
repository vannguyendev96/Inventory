import React, { useEffect, useState } from 'react';
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
} from '@coreui/react'
import {
  Button,
  Col,
  FormGroup
} from 'reactstrap';
import SearchReport from './formSearch';
import DanhSachLoHangPXKAdmin from './fromDanhsach/pxkHearder';
import DanhSachKienHangXuatKhoAdmin from './fromDanhsach/pxkDetail';
import pxkAPI from 'src/api/pxkAPI';

function Report() {
  const [active, setActive] = useState(0);
  const [dataListPXK, setDataListPXK] = useState([]);
  const [dataPXKDetail, setDataPXKDetail] = useState([]);

  const fetchDataPXK = async () => {
    try {
      await pxkAPI.getbyuser('')
        .then(response => {
          setDataListPXK(response.data);
        })
        .catch(error => console.log(error))
    } catch (error) {
      console.log(error)
    }
  }

  const handleRowClick = async (malohang) => {
    try {
      await pxkAPI.getbymalohang(malohang)
        .then(response => {
          setDataPXKDetail(response.data);
        })
        .catch(error => console.log(error))
    } catch (error) {
      console.log(error)
    }
    setActive(1);
  }

  const searchDate = async (queryString, fromDate, toDate) => {
    const dataQuery = {
      date_from: fromDate,
      date_to: toDate
    };
    await pxkAPI.search(queryString, dataQuery)
      .then(response => {
        setDataListPXK(response.data);
        setActive(0);
      })
      .catch(error => console.log(error))
  }

  const searchMaLoHang = async (queryString, malohang) => {
    await pxkAPI.search(queryString, malohang)
      .then(response => {
        setDataListPXK(response.data);
        setActive(0);
      })
      .catch(error => console.log(error))
  }

  const searchNguoitao = async (queryString, nguoitaolohang) => {
    await pxkAPI.search(queryString, nguoitaolohang)
      .then(response => {
        setDataListPXK(response.data);
        setActive(0);
      })
      .catch(error => console.log(error))
  }

  const searchKhohang = async (queryString, khohang) => {
    await pxkAPI.search(queryString, khohang)
      .then(response => {
        setDataListPXK(response.data);
        setActive(0);
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchDataPXK();
  }, [])

  return (
    <>
      <CRow>
        <CCol sm="12" xl="12">
          <CCard>
            <CCardHeader>
              Thông tin tìm kiếm
            </CCardHeader>
            <CCardBody>
              <SearchReport handleSearch={searchDate} handleOnChangeMaLoHang={searchMaLoHang}
                handleOnChangeTenNguoitao={searchNguoitao} handleOnChangeKhoHang={searchKhohang} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>


      <CRow>
        <CCol xs="12" md="12" className="mb-4">
          <CCard>
            <CCardHeader>
              <FormGroup row>
                <Col xs="12" md="2">
                  Danh sách xuất kho
                </Col>
                <Col xs="12" md="2">
                  <Button block outline active color="primary" aria-pressed="true" onClick={() => fetchDataPXK()}>Reset</Button>
                </Col>
              </FormGroup>
            </CCardHeader>
            <CCardBody>
              <CTabs activeTab={active} onActiveTabChange={idx => setActive(idx)}>
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink>
                      Danh sách lô hàng
                      {active === 0 && ''}
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink>
                      Chi tiết lô hàng
                      {active === 1 && ''}
                    </CNavLink>
                  </CNavItem>

                </CNav>
                <CTabContent>
                  <CTabPane>
                    <DanhSachLoHangPXKAdmin data={dataListPXK} handleRowClick={handleRowClick} />
                  </CTabPane>
                  <CTabPane>
                    <DanhSachKienHangXuatKhoAdmin data={dataPXKDetail} />
                  </CTabPane>

                </CTabContent>
              </CTabs>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}

export default Report;