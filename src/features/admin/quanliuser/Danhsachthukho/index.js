
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
import PropTypes from 'prop-types';
import ChinhsuaThukho from '../popupeditthukho';

DanhsachThukho.propTypes = {
    data: PropTypes.array,
    deleteThukho: PropTypes.func
};

DanhsachThukho.defaultProps = {
    data: null,
    deleteThukho: null
}

function DanhsachThukho(props) {
    const [primary, setPrimary] = useState(false);
    const [update, setUpdate] = useState(false);
    const [deleteTK, setDeleteTK] = useState(false);
    const [email, setEmail] = useState(false);

    const { data, deleteThukho} = props;

    const dataThuKho = data !== null ? data : [];

    const handleDeleteThuKho = async () => {
        setDeleteTK(!deleteTK)
        if(deleteThukho){
            deleteThukho(email);
        }
    }

    function openPopUpDeleteUser(email){
        setDeleteTK(!deleteTK);
        setEmail(email);
    }

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
                    
                        {
                            dataThuKho.map((dataList, index) => {
                                const { _id, name, sdt, kholamviec, email, emailUser, roll} = dataList //destructuring
                                return (
                                    <tr
                                        key={_id}
                                    >
                                        <td>1</td>
                                        <td>{name}</td>
                                        <td>{sdt}</td>
                                        <td>{kholamviec}</td>
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
                                                    <ChitietThukho tenthukho={name} email={emailUser} chucvu={roll} sdt={sdt}/>
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
                                                    <ChinhsuaThukho tenthukho={name} email={emailUser} chucvu={roll} sdt={sdt} kholamviec={kholamviec}/>
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
                                            <Button type="submit" size="sm" color="danger" onClick={() => openPopUpDeleteUser(email)}>Xóa</Button>
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
                                                    <CButton color="danger" onClick={handleDeleteThuKho}>
                                                        Xóa
                                                    </CButton>
                                                    <CButton color="secondary" onClick={() => setDeleteTK(!deleteTK)}>
                                                        Close
                                                    </CButton>
                                                </CModalFooter>
                                            </CModal>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                   
                </tbody>
            </Table>

        </>
    );
}

export default DanhsachThukho;