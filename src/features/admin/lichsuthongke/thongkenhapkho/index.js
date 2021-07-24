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
import SearchReportNhapKho from './formSearch';
import pnkApi from 'src/api/pnkAPI';
import DanhSachLoHangPNKAdmin from './formDanhsach/pnkHeader';
import DanhSachKienHangAdmin from './formDanhsach/pnkDetail';


function ReportNhapKho() {

  const [active, setActive] = useState(0);
  const [dataListPNK, setDataListPNK] = useState([]);
  const [dataPNKDetail, setDataPNKDetail] = useState([]);

  const fetchDataPNK = async () => {
    try {
      await pnkApi.getbyuser('')
        .then(response => {
          setDataListPNK(response.data);
        })
        .catch(error => console.log(error))
    } catch (error) {
      console.log(error)
    }
  }

  const handleRowClick = async (malohang) => {
    try {
      await pnkApi.getbymalohang(malohang)
        .then(response => {
          setDataPNKDetail(response.data);
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
    await pnkApi.search(queryString, dataQuery)
      .then(response => {
        setDataListPNK(response.data);
        setActive(0);
      })
      .catch(error => console.log(error))
  }

  const searchMaLoHang = async (queryString, malohang) => {
    await pnkApi.search(queryString, malohang)
      .then(response => {
        setDataListPNK(response.data);
        setActive(0);
      })
      .catch(error => console.log(error))
  }

  const searchNguoitao = async (queryString, nguoitaolohang) => {
    await pnkApi.search(queryString, nguoitaolohang)
      .then(response => {
        setDataListPNK(response.data);
        setActive(0);
      })
      .catch(error => console.log(error))
  }

  const searchKhohang = async (queryString, khohang) => {
    await pnkApi.search(queryString, khohang)
      .then(response => {
        setDataListPNK(response.data);
        setActive(0);
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchDataPNK();
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
              <SearchReportNhapKho handleSearch={searchDate} handleOnChangeMaLoHang={searchMaLoHang}
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
                  Danh sách nhập kho
                </Col>
                <Col xs="12" md="2">
                  <Button block outline active color="primary" aria-pressed="true" onClick={() => fetchDataPNK()}>Reset</Button>
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
                    <DanhSachLoHangPNKAdmin data={dataListPNK} handleRowClick={handleRowClick} />
                  </CTabPane>
                  <CTabPane>
                    <DanhSachKienHangAdmin data={dataPNKDetail} />
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

export default ReportNhapKho;