import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Button,
    Table,
    FormFeedback
} from 'reactstrap';

import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle
} from '@coreui/react';
import { ErrorMessage } from 'formik';

Lichsukiemke.propTypes = {
    data: PropTypes.array
};

Lichsukiemke.defaultProps = {
    data: null,
}


function Lichsukiemke(props) {

    const { data } = props;
    const dataPNK = data !== null ? data : [];

    return (
        <>
            <Table responsive hover size="sm">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên kiện hàng</th>
                        <th>Số lượng kiểm kê</th>
                        <th>Trạng thái kiện hàng</th>
                        <th>Ngày kiểm kê</th>
                        <th>Đơn giá</th>
                        <th>Loại kiện hàng</th>
                        <th>Kho chứa</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataPNK.map((dataList, index) => {
                            const { tenkienhang, soluongkiemke,trangthaikienhang, dongia, loaikienhang, khochuakienhang, ngaykiemke } = dataList //destructuring
                            return (
                                <tr
                                    key={index}
                                    
                                >
                                    <td>{index + 1}</td>
                                    <td>{tenkienhang}</td>
                                    <td>{soluongkiemke}</td>
                                    <td>{trangthaikienhang}</td>
                                    <td>{new Date(ngaykiemke).getFullYear() + "-" + (new Date(ngaykiemke).getMonth() + 1) + "-" + new Date(ngaykiemke).getDate()}</td>
                                    <td>{dongia}</td>
                                    <td>{loaikienhang}</td>
                                    <td>{khochuakienhang}</td>
                                    
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>

        </>
    );
}

export default Lichsukiemke;