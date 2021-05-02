import {
    CButton
} from '@coreui/react';
import React from 'react';
import {
    Table,Button
} from 'reactstrap';

  
function DanhsachTaixe() {


    return (
        <>
            <Table responsive hover size="sm">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên tài xế</th>
                        <th>SĐT</th>
                        <th>Trạng thái</th>
                        <th>Xem thông tin chi tiết tài xế</th>
                        <th>Cập nhật thông tin tài xế</th>
                        <th>Xóa tài xế</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Tran Van A</td>
                        <td>01233333333</td>
                        <td>Đang làm việc</td>
                        <td><Button type="submit" size="sm" color="primary" >Xem</Button></td>
                        <td><Button type="submit" size="sm" color="success" >Sữa</Button></td>
                        <td><Button type="submit" size="sm" color="danger" >Xóa</Button></td>
                        
                    </tr>
                </tbody>
            </Table>

        </>
    );
}

export default DanhsachTaixe;