import React, { useEffect, useState } from 'react'
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
import pnkApi from 'src/api/pnkAPI';
import DanhSachLoHangPNK from './pnk-danhsachlohang';
import DanhSachKienHang from './pnkdetail-danhsachkienhang';

function PhieuNhapKhoDanhSach() {

    const [dataListPNK, setDataListPNK] = useState([]);
    const [dataPNKDetail, setDataPNKDetail] = useState([]);
    const [active, setActive] = useState(1)

    const fetchDataPNK = async () => {
        try {
            const username = localStorage.getItem("username");
            await pnkApi.getbyuser(username)
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

    useEffect(() => {
        setActive(0);
        fetchDataPNK();
    }, [])

    return (
        <>
            <CRow>
                <CCol xs="12" md="12" className="mb-4">
                    <CCard>
                        <CCardHeader>
                            Danh sách phiếu nhập kho
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
                                        <DanhSachLoHangPNK data={dataListPNK} handleRowClick={handleRowClick}/>
                                    </CTabPane>
                                    <CTabPane>
                                        <DanhSachKienHang data={dataPNKDetail}/>
                                    </CTabPane>
                                
                                </CTabContent>
                            </CTabs>
                        </CCardBody>
                    </CCard>
                </CCol>


            </CRow>
        </>
    )
}

export default PhieuNhapKhoDanhSach;