import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
import { toast, ToastContainer } from 'react-toastify';
import UpdatePNKPage from './pnk-update/update-pnk';

function PhieuNhapKhoDanhSach() {

    const location = useLocation();
    const [dataListPNK, setDataListPNK] = useState([]);
    const [dataPNKDetail, setDataPNKDetail] = useState([]);
    const [active, setActive] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const fetchDataPNK = async () => {
        setIsLoading(true);
        try {
            const username = localStorage.getItem("username");
            await pnkApi.getbyuser(username)
                .then(response => {
                    setIsLoading(false);
                    setDataListPNK(response.data);
                })
                .catch(error => setIsLoading(false))
        } catch (error) {
            console.log(error);
            setIsLoading(false);
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

    const handleUpdatePNK = async (malohang, tenkienhang, soluongkienhang, khoiluongkienhang, trangthai, loaikienhang, khochuakienhang,
        diachikhochua, diachinguoinhan, tennguoigui, sdtnguoigui, diachinguoigui, dongia, dataUpdate) => {
        try {
            await pnkApi.chinhsuaphieunhapkho(malohang, tenkienhang, soluongkienhang, khoiluongkienhang, trangthai, loaikienhang, khochuakienhang,
                diachikhochua, diachinguoinhan, tennguoigui, sdtnguoigui, diachinguoigui, dongia, dataUpdate)
                .then(response => {
                    toast.success("Chỉnh sữa phiếu nhập kho thành công");
                    handleRowClick(malohang);
                    fetchDataPNK();
                })
                .catch(error => toast.error(error.response.data.message))
        } catch (error) {
            toast.error("Không thể kết nối đến server");
        }
    }

    const handleDeletePNK = async (data) => {
        try {
            await pnkApi.xoaphieunhapkho(data)
                .then(response => {
                    toast.success("Đã xóa kiện hàng thành công");
                    handleRowClick(data.malohang);
                    fetchDataPNK();
                })
                .catch(error => toast.error(error.response.data.message))
        } catch (error) {
            toast.error("Không thể kết nối đến server");
        }
    }

    useEffect(() => {
        if (location.state) {
            console.log(location.state)
            toast.success(`Tạo thành công phiếu nhập kho mã ${location.state.malohang}`);
        }

        setActive(0);
        fetchDataPNK();
    }, []);



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
                                        <DanhSachLoHangPNK data={dataListPNK} handleRowClick={handleRowClick} />
                                    </CTabPane>
                                    <CTabPane>
                                        <DanhSachKienHang data={dataPNKDetail} updatePNK={handleUpdatePNK} deletePNK={handleDeletePNK} />
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

export default PhieuNhapKhoDanhSach;