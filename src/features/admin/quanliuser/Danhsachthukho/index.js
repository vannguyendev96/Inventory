
import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle
} from '@coreui/react';
import React, { useState } from 'react';
import { Button, Table } from 'reactstrap';
import ChitietThukho from '../popupchitiet';



function DanhsachThukho() {
    const [primary, setPrimary] = useState(false);
    const [update, setUpdate] = useState(false);
    const [deleteTK, setDeleteTK] = useState(false);

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
                        <td>
                            <Button type="submit" size="sm" color="primary" onClick={() => setPrimary(!primary)} >Xem</Button>
                            <CModal
                                show={primary}
                                onClose={() => setPrimary(!primary)}
                                color="primary"
                            >
                                <CModalHeader closeButton>
                                    <CModalTitle>Chi tiết thủ kho</CModalTitle>
                                </CModalHeader>
                                <CModalBody>
                                    <ChitietThukho/>
                                </CModalBody>
                                <CModalFooter>
                                    
                                    <CButton color="secondary" onClick={() => setPrimary(!primary)}>
                                        Close
                                    </CButton>
                                </CModalFooter>
                            </CModal>
                        </td>
                        <td>
                            <Button type="submit" size="sm" color="success" onClick={() => setUpdate(!update)}>Sữa</Button>
                            <CModal
                                show={update}
                                onClose={() => setUpdate(!update)}
                                color="primary"
                            >
                                <CModalHeader closeButton>
                                    <CModalTitle>Chỉnh sữa thông tin thủ kho</CModalTitle>
                                </CModalHeader>
                                <CModalBody>
                                    <ChitietThukho/>
                                </CModalBody>
                                <CModalFooter>
                                    <CButton color="primary" onClick={() => setUpdate(!update)}>
                                        Chỉnh sữa
                                    </CButton>
                                    <CButton color="secondary" onClick={() => setUpdate(!update)}>
                                        Close
                                    </CButton>
                                </CModalFooter>
                            </CModal>
                        </td>
                        <td>
                            <Button type="submit" size="sm" color="danger" onClick={() => setDeleteTK(!deleteTK)}>Xóa</Button>
                            <CModal
                                show={deleteTK}
                                onClose={() => setDeleteTK(!deleteTK)}
                                color="danger"
                            >
                                <CModalHeader closeButton>
                                    <CModalTitle>Xóa thủ kho</CModalTitle>
                                </CModalHeader>
                                <CModalBody>
                                    Bạn có chắc muốn xóa thông tin thủ kho này ?
                                </CModalBody>
                                <CModalFooter>
                                    <CButton color="danger" onClick={() => setDeleteTK(!deleteTK)}>
                                     Xóa
                                    </CButton>
                                    <CButton color="secondary" onClick={() => setDeleteTK(!deleteTK)}>
                                        Close
                                    </CButton>
                                </CModalFooter>
                            </CModal>
                        </td>

                    </tr>
                </tbody>
            </Table>

        </>
    );
}

export default DanhsachThukho;