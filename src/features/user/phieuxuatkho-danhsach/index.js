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
import pxkAPI from 'src/api/pxkAPI';
import DanhSachLoHangPXK from './pxk-danhsachlohang';
import DanhSachKienHangPXK from './pxkdetail-danhsachkienhang';
import { toast, ToastContainer } from 'react-toastify';

function PhieuXuatKhoDanhSach() {

    const [dataListPXK, setDataListPXK] = useState([]);
    const [dataPXKDetail, setDataPXKDetail] = useState([]);
    const [active, setActive] = useState(0)

    const fetchDataPXK = async () => {
        try {
            const username = localStorage.getItem("username");
            await pxkAPI.getbyuser(username)
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

    useEffect(() => {
        fetchDataPXK();
    }, []);

    const handleUpdatePXK = async (malohang, tenkienhang, soluongkienhang, khoiluongkienhang, trangthai, loaikienhang, khochuakienhang,
        diachikhochua, diachinguoigui, tennguoinhan, sdtnguoinhan, diachinguoinhan, dongia, dataUpdate) => {
        try {
            await pxkAPI.chinhsuaphieuxuatkho(malohang, tenkienhang, soluongkienhang, khoiluongkienhang, trangthai, loaikienhang, khochuakienhang,
                diachikhochua, diachinguoigui, tennguoinhan, sdtnguoinhan, diachinguoinhan, dongia, dataUpdate)
                .then(response => {
                    toast.success("Chỉnh sữa phiếu xuất kho thành công");
                    handleRowClick(malohang);
                    fetchDataPXK();
                })
                .catch(error =>  toast.error(error.response.data.message))
        } catch (error) {
            toast.error("Không thể kết nối đến server");
        }
    }

    const handleDeletePXK = async (data) => {
        try {
            await pxkAPI.xoaphieuxuatkho(data)
                .then(response => {
                    toast.success("Đã xóa kiện hàng thành công");
                    handleRowClick(data.malohang);
                    fetchDataPXK();
                })
                .catch(error =>  toast.error(error.response.data.message))
        } catch (error) {
            toast.error("Không thể kết nối đến server");
        }
    }

    return (
        <>
            <CRow>
                <CCol xs="12" md="12" className="mb-4">
                    <CCard>
                        <CCardHeader>
                            Danh sách phiếu xuất kho
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
                                        <DanhSachLoHangPXK data={dataListPXK} handleRowClick={handleRowClick}/>
                                    </CTabPane>
                                    <CTabPane>
                                        <DanhSachKienHangPXK data={dataPXKDetail} updatePNK={handleUpdatePXK} deletePXK={handleDeletePXK}/>
                                    </CTabPane>
                                
                                </CTabContent>
                            </CTabs>
                        </CCardBody>
                    </CCard>
                </CCol>

                <ToastContainer />
            </CRow>
        </>
    )
}

export default PhieuXuatKhoDanhSach;