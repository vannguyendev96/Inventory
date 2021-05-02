import {
    CButton
} from '@coreui/react';
import React from 'react';
import {
    Table,Button
} from 'reactstrap';

  
function DanhsachThukho() {


    return (
        <>
            <Table responsive hover size="sm">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên thủ kho</th>
                        <th>SĐT</th>
                        <th>Kho làm việc</th>
                        <th>Xem thông tin chi tiết thủ kho</th>
                        <th>Cập nhật thông tin thủ kho</th>
                        <th>Xóa thủ kho</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Tran Van A</td>
                        <td>01233333333</td>
                        <td>Kho A</td>
                        <td><Button type="submit" size="sm" color="primary" >Xem</Button></td>
                        <td><Button type="submit" size="sm" color="success" >Sữa</Button></td>
                        <td><Button type="submit" size="sm" color="danger" >Xóa</Button></td>
                        
                    </tr>
                </tbody>
            </Table>

        </>
    );
}

export default DanhsachThukho;