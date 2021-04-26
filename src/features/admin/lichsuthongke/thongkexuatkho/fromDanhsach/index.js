import React from 'react';
import PropTypes from 'prop-types';
import {
    Table, CardFooter, Button
} from 'reactstrap';


function ListReportXuatKho() {


    return (
        <>
            <Table responsive hover size="sm">
                <thead>
                    <tr>
                        <th>Tên kiện hàng</th>
                        <th>Số lượng kiện hàng</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>AAAA</td>
                        <td>20</td>
                        <td>Pending</td>
                    </tr>
                </tbody>
            </Table>
            
        </>
    );
}

export default ListReportXuatKho