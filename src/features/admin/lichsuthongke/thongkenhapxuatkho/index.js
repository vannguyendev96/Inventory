import {
    CCard,
    CCardBody,
    CCardHeader, CCol,
    CRow,
} from '@coreui/react';
import {
    Table, Button
} from 'reactstrap';

import {
    CChartPie
} from '@coreui/react-chartjs';
import React, { useEffect, useState } from 'react';
import pxkApi from 'src/api/pxkAPI';
import warehouseApi from 'src/api/warehouseAPI';
import FullPageLoader from 'src/views/fullpageloading';

function ChartReport() {

    const [dataKhoHang, setDataKhoHang] = useState([]);
    const [dataKienHang, setDataKienHang] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchDataKhoHang = async () => {
        try {
            await warehouseApi.getall()
                .then(response => {
                    setDataKhoHang(response.data);
                })
                .catch(error => console.log(error))
        } catch (error) {
            console.log(error)
        }
    }

    const fetchDataThongKe = async () => {
        try {
            await warehouseApi.thongke()
                .then(response => {
                    setDataKienHang(response.data);
                })
                .catch(error => console.log(error))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchDataKhoHang();
        fetchDataThongKe();
    }, [])

    return (
        <>
            {isLoading ? <FullPageLoader /> :
                <>
                    <CRow>
                        <CCol sm="12" xl="12">
                            <CCard>
                                <CCardHeader>
                                    Thống kê nhập xuất kho
                                </CCardHeader>
                                <CCardBody>
                                    <Table responsive hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Tên thủ kho</th>
                                                <th>Địa chỉ</th>
                                                <th>Số lượng kiện hàng nhập</th>
                                                <th>Số lượng kiện hàng xuất</th>
                                                <th>Tỉ lệ hàng hóa luân chuyển</th>
                                                <th>Doanh thu (VND)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dataKhoHang.map((dataList, index) => {
                                                    let i = 1;
                                                    const { _id, tenkhohang, succhua, trangthai, provine,
                                                        district, phuong, doanhthu, tongxuat, tongthu, tile } = dataList //destructuring
                                                    return (
                                                        <tr
                                                            key={_id}
                                                        >
                                                            <td>{index + 1}</td>
                                                            <td>{tenkhohang}</td>

                                                            <td>{phuong} {' '} {district} {' '} {provine}</td>
                                                            <td>{tongthu}</td>
                                                            <td>{tongxuat}</td>
                                                            {
                                                                tile ? <td>{tile} {' %'}</td> : <td>{'0 %'}</td>
                                                            }
                                                            <td>{doanhthu}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol sm="12" xl="12">
                            <CCard>
                                <CCardHeader>
                                    Thống kê kiện hàng nhập xuất kho
                                </CCardHeader>
                                <CCardBody>
                                    <Table responsive hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Tên kiện hàng</th>
                                                <th>Loai kiện hàng</th>
                                                <th>Số lượng nhập</th>
                                                <th>Số lượng xuất</th>
                                                <th>Thời gian nhập</th>
                                                <th>Thời gian xuất</th>
                                                <th>Vận tốc chuyển hàng</th>
                                                <th>Tỉ lệ hàng hóa luân chuyển</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dataKienHang.map((dataList, index) => {
                                                    let i = 1;
                                                    const { _id, tenkienhang, loaikienhang, soluongnhap, soluongxuat,
                                                        thoigiannhap, thoigianxuat, vantocchuyenhang, tilechuyenhang } = dataList //destructuring
                                                    return (
                                                        <tr
                                                            key={_id}
                                                        >
                                                            <td>{index + 1}</td>
                                                            <td>{tenkienhang}</td>
                                                            <td>{loaikienhang}</td>
                                                            <td>{soluongnhap}</td>
                                                            <td>{soluongxuat}</td>
                                                            <td>{thoigiannhap}</td>
                                                            <td>{thoigianxuat}</td>
                                                            <td>{vantocchuyenhang}</td>
                                                            {
                                                                tilechuyenhang ? <td>{tilechuyenhang} {' %'}</td> : <td>{'0 %'}</td>
                                                            }
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </>



            }

        </>
    );
}

export default ChartReport;