import React from 'react';
import PropTypes from 'prop-types';
import {
    Table, CardFooter, Button
} from 'reactstrap';

DanhSachLoHangPNK.propTypes = {
    data: PropTypes.array,
    handleRowClick: PropTypes.func
};

DanhSachLoHangPNK.defaultProps = {
    data: null,
    handleRowClick: null
}


function DanhSachLoHangPNK(props) {

    const { data,handleRowClick } = props;
    const dataPNK = data !== null ? data : [];

    function pnkHeaderClick(malohang){
        if(handleRowClick){
            handleRowClick(malohang);
        }
    }

    return (
        <>
            <Table responsive hover size="sm">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã lô hàng</th>
                        <th>Người tạo lô hàng</th>
                        {/* <th>Tài xế</th> */}
                        <th>Đơn giá cước</th>
                        <th>Quảng đường</th>
                        <th>Thời gian tạo lô hàng</th>
                        <th>Tổng thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataPNK.map((dataList, index) => {
                            const { malohang, nguoitaolohang, ngaytaolohang,taixevanchuyen,dongiacuoc, quangduongdichuyen, tongtien} = dataList //destructuring
                            return (
                                <tr
                                    key={index}
                                    onClick={() => pnkHeaderClick(malohang)}
                                >
                                    <td>{index + 1}</td>
                                    <td>{malohang}</td>
                                    <td>{nguoitaolohang}</td>
                                    {/* <td>{taixevanchuyen}</td> */}
                                    <td>{dongiacuoc} {' VND'}</td>
                                    <td>{quangduongdichuyen} {' KM'}</td>
                                    <td>{new Date(ngaytaolohang).getFullYear() + "-" + (new Date(ngaytaolohang).getMonth() + 1) + "-" + (new Date(ngaytaolohang).getDate() -1)}</td>
                                    <td>{tongtien} {' VND'}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            
        </>
    );
}

export default DanhSachLoHangPNK;