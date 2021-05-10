import React from 'react';
import PropTypes from 'prop-types';
import {
    Table, CardFooter, Button
} from 'reactstrap';

DanhSachKienHang.propTypes = {
    data: PropTypes.array,
};

DanhSachKienHang.defaultProps = {
    data: null,
}


function DanhSachKienHang(props) {

    const { data } = props;
    const dataKienHang = data !== null ? data : [];

    return (
        <>
            <Table responsive hover size="sm">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên kiện hàng</th>
                        <th>Số lượng</th>
                        <th>Trạng thái</th>
                        <th>Loại kiện</th>
                        <th>Kho chứa</th>
                        <th>Địa chỉ kho hàng</th>
                        <th>Thông tin người nhận</th>
                        <th>Thông tin người gửi</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        dataKienHang.map((dataList, index) => {
                            const { malohang, nguoitaolohang, tenkienhang,soluongkienhang, 
                                trangthai, loaikienhang, khochuakienhang, diachikhochua,
                                tennguoinhan, sdtnguoinhan, diachinguoinhan,
                                tennguoigui, sdtnguoigui, diachinguoigui} = dataList //destructuring
                            return (
                                <tr
                                    key={index}
                                >
                                    <td>{index + 1}</td>
                                    <td>{tenkienhang}</td>
                                    <td>{soluongkienhang}</td>
                                    <td>{trangthai}</td>
                                    <td>{loaikienhang}</td>
                                    <td>{khochuakienhang}</td>
                                    <td>{diachikhochua}</td>
                                    <td>{`Tên: ${tennguoinhan}, SDT: ${sdtnguoinhan}, Địa chỉ: ${diachinguoinhan}`}</td>
                                    <td>{`Tên: ${tennguoigui}, SDT: ${sdtnguoigui}, Địa chỉ: ${diachinguoigui}`}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            
        </>
    );
}

export default DanhSachKienHang;