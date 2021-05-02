import {
    CButton
} from '@coreui/react';
import React from 'react';
import {
    Table,Button
} from 'reactstrap';

  
function DanhsachKhoHang() {


    return (
        <>
            <Table responsive hover size="sm">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên thủ kho</th>
                        <th>Địa chỉ</th>
                        <th>Trạng thái</th>
                        <th>Xem thông tin chi tiết kho hàng</th>
                        <th>Cập nhật thông tin kho hàng</th>
                        <th>Xóa kho hàng</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Kho A</td>
                        <td>Bình thạnh</td>
                        <td>Còn trống</td>
                        <td><Button type="submit" size="sm" color="primary" >Xem</Button></td>
                        <td><Button type="submit" size="sm" color="success" >Sữa</Button></td>
                        <td><Button type="submit" size="sm" color="danger" >Xóa</Button></td>
                        
                    </tr>
                </tbody>
            </Table>

        </>
    );
}

export default DanhsachKhoHang;