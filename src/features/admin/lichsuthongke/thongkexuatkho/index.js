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

import SearchReport from './formSearch';
import DanhSachLoHangPXKAdmin from './fromDanhsach/pxkHearder';
import pxkAPI from 'src/api/pxkAPI';

function Report() {
  const [active, setActive] = useState(0);
  const [dataListPXK, setDataListPXK] = useState([]);

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
              <SearchReport />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>


      <CRow>
        <CCol xs="12" md="12" className="mb-4">
          <CCard>
            <CCardHeader>
              Danh sách xuất kho
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
                    <DanhSachLoHangPXKAdmin data={dataListPXK} />
                  </CTabPane>
                  <CTabPane>

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