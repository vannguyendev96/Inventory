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
    deleteThukho: PropTypes.func,
    updateThukho: PropTypes.func
};

DanhsachThukho.defaultProps = {
    data: null,
    deleteThukho: null,
    updateThukho: null
}

function DanhsachThukho(props) {
    const [primary, setPrimary] = useState(false);
    const [deleteTK, setDeleteTK] = useState(false);

    const [email, setEmail] = useState(false);

    const [tenthukhoDetail, setTenthukhoDetail] = useState('');
    const [emailUserDetail, setEmailUserDetail] = useState('');
    const [chucvuDetail, setChucvuDetail] = useState('');
    const [sdtDetail, setSdtDetail] = useState('');
    const [emailDetail, setEmailDetail] = useState('');

    const { data, deleteThukho, updateThukho} = props;

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

    function handleUpdateTK(username,tenTK,emailTK,chucvuTK,sdtTK,kholamviecTK){
        if(updateThukho){
            updateThukho(username,tenTK,emailTK,chucvuTK,sdtTK,kholamviecTK);
        }
    }

    function openPopUpDetailUser(name,emailUser,roll,sdt,email){
        setPrimary(!primary);

        setTenthukhoDetail(name);
        setEmailUserDetail(emailUser);
        setChucvuDetail(roll);
        setSdtDetail(sdt);
        setEmailDetail(email);
    }

    return (
        <>
            <Table responsive hover size="sm">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>T??n th??? kho</th>
                        <th>S??T</th>
                        <th>Kho l??m vi???c</th>
                        <th>Xem th??ng tin chi ti???t th??? kho</th>
                        <th>C???p nh???t th??ng tin th??? kho</th>
                        <th>X??a th??? kho</th>
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
                                        <td>{index+1}</td>
                                        <td>{name}</td>
                                        <td>{sdt}</td>
                                        <td>{kholamviec}</td>
                                        <td>
                                            <Button type="submit" size="sm" color="primary" onClick={() => openPopUpDetailUser(name,emailUser,roll,sdt,email)} >See</Button>
                                            <CModal
                                                show={primary}
                                                onClose={() => setPrimary(!primary)}
                                                color="primary"
                                            >
                                                <CModalHeader closeButton>
                                                    <CModalTitle>Chi ti???t th??? kho</CModalTitle>
                                                </CModalHeader>
                                                <CModalBody>
                                                    <ChitietThukho tenthukho={tenthukhoDetail} email={emailUserDetail} chucvu={chucvuDetail} sdt={sdtDetail} username={emailDetail}/>
                                                </CModalBody>
                                                <CModalFooter>

                                                    <CButton color="secondary" onClick={() => setPrimary(!primary)}>
                                                        Close
                                                </CButton>
                                                </CModalFooter>
                                            </CModal>
                                        </td>
                                        <td>
                                            <ChinhsuaThukho editTK={handleUpdateTK} username={email} tenthukho={name} email={emailUser} chucvu={roll} sdt={sdt} kholamviec={kholamviec}/>
                                        </td>
                                        <td>
                                            <Button type="submit" size="sm" color="danger" onClick={() => openPopUpDeleteUser(email)}>Delete</Button>
                                            <CModal
                                                show={deleteTK}
                                                onClose={() => setDeleteTK(!deleteTK)}
                                                color="danger"
                                            >
                                                <CModalHeader closeButton>
                                                    <CModalTitle>X??a th??? kho</CModalTitle>
                                                </CModalHeader>
                                                <CModalBody>
                                                    B???n c?? ch???c mu???n x??a th??ng tin th??? kho n??y ?
                                                </CModalBody>
                                                <CModalFooter>
                                                    <CButton color="danger" onClick={handleDeleteThuKho}>
                                                        X??a
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