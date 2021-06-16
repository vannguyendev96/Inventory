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

    useEffect(() => {
        fetchDataKhoHang();
    }, [])

    return (
        <>
            {isLoading ? <FullPageLoader /> :
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
                                            <th>Trạng thái</th>
                                            <th>Doanh thu (VND)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            dataKhoHang.map((dataList, index) => {
                                                let i = 1;
                                                const { _id, tenkhohang, succhua, trangthai, provine, district, phuong, doanhthu } = dataList //destructuring
                                                return (
                                                    <tr
                                                        key={_id}
                                                    >
                                                        <td>{index + 1}</td>
                                                        <td>{tenkhohang}</td>
                                                        <td>{phuong} {' '} {district} {' '} {provine}</td>
                                                        <td>{trangthai}</td>
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
            }

        </>
    );
}

export default ChartReport;