import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle
} from '@coreui/react';
import React, { useState } from 'react';
import {
    Table, Button
} from 'reactstrap';

import PropTypes from 'prop-types';
import ChitietTaiXe from '../popupchitiet';
import ChinhsuaTX from '../popupedit';

DanhsachTaixe.propTypes = {
    data: PropTypes.array,
    deleteDriver: PropTypes.func,
    updateDriver: PropTypes.func
};

DanhsachTaixe.defaultProps = {
    data: null,
    deleteDriver: null,
    updateDriver: null
}


function DanhsachTaixe(props) {

    const { data, deleteDriver, updateDriver } = props;
    const dataDriver = data !== null ? data : [];

    const [detail, setDetail] = useState(false);
    const [deleteTK, setDeleteTK] = useState(false);
    const [cmndTXDelete, setCMNDTXDelete] = useState('');

    const [tentxDetail, setTentxDetail] = useState('');
    const [sdtDetail, setSdtDetail] = useState('');
    const [trangthaiDetail, setTrangthaiDetail] = useState('');
    const [namsinhDetail, setNamSinhDetail] = useState('');
    const [provineDetail, setProvineDetail] = useState('');
    const [districtDetail, setDistrictDetail] = useState('');
    const [phuongDetail, setPhuongDetail] = useState('');
    const [cmndDetail, setCMNDDetail] = useState('');

    function openPopUpDetailTX(tentx, trangthai, sdt, namsinh, provine, district, phuong, cmnd) {
        setDetail(!detail);

        setTentxDetail(tentx);
        setSdtDetail(sdt);
        setTrangthaiDetail(trangthai);
        setNamSinhDetail(namsinh);
        setProvineDetail(provine);
        setDistrictDetail(district);
        setPhuongDetail(phuong);
        setCMNDDetail(cmnd);
    }

    function handleUpdateTK(cmnd, tenTX, sdtTX, trangthaiTX, namsinhTX, provineTX, districtTX, phuongTX) {
        if (updateDriver) {
            updateDriver(cmnd, tenTX, sdtTX, trangthaiTX, namsinhTX, provineTX, districtTX, phuongTX);
        }
    }

    function openPopUpDeleteTX(cmnd){
        setDeleteTK(!deleteTK);
        setCMNDTXDelete(cmnd);
    }

    const handleDeleteTX =  () => {
        setDeleteTK(!deleteTK)
        if(deleteDriver){
            deleteDriver(cmndTXDelete);
        }
    }


    return (
        <>
            <Table responsive hover size="sm">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>T??n t??i x???</th>
                        <th>S??T</th>
                        <th>Tr???ng th??i</th>
                        <th>N??m sinh</th>
                        <th>Kho l??m vi???c</th>
                        <th>Xem th??ng tin chi ti???t t??i x???</th>
                        <th>C???p nh???t th??ng tin t??i x???</th>
                        <th>X??a t??i x???</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataDriver.map((dataList, index) => {
                            let i = 1;
                            const { _id, tentx, trangthai, sdt, namsinh, provine, district, phuong, cmnd, kholamviec } = dataList //destructuring
                            return (
                                <tr
                                    key={_id}
                                >
                                    <td>{index + 1}</td>
                                    <td>{tentx}</td>
                                    <td>{sdt}</td>
                                    <td>{trangthai}</td>
                                    <td>{(new Date(namsinh)).toISOString().substr(0, 10)}</td>
                                    <td>{kholamviec}</td>
                                    <td>
                                        <Button type="submit" size="sm" color="primary" onClick={() => openPopUpDetailTX(tentx, trangthai, sdt, namsinh, provine, district, phuong,cmnd)} >See</Button>
                                        <CModal
                                            show={detail}
                                            onClose={() => setDetail(!detail)}
                                            color="primary"
                                        >
                                            <CModalHeader closeButton>
                                                <CModalTitle>Chi ti???t t??i x???</CModalTitle>
                                            </CModalHeader>
                                            <CModalBody>
                                                <ChitietTaiXe cmnd={cmndDetail} tentx={tentxDetail} sdt={sdtDetail} trangthai={trangthaiDetail} namsinh={namsinhDetail}
                                                    provine={provineDetail} district={districtDetail} phuong={phuongDetail} />
                                            </CModalBody>
                                            <CModalFooter>
                                                <CButton color="secondary" onClick={() => setDetail(!detail)}>
                                                    Close
                                                </CButton>
                                            </CModalFooter>
                                        </CModal>
                                    </td>
                                    <td>
                                        <ChinhsuaTX
                                            editTK={handleUpdateTK}
                                            cmnd={cmnd}
                                            tentx={tentx} sdt={sdt} trangthai={trangthai} namsinh={namsinh}
                                            provine={provine} district={district} phuong={phuong}
                                        />
                                    </td>
                                    <td>
                                        <Button type="submit" size="sm" color="danger" onClick={() => openPopUpDeleteTX(cmnd)}>Delete</Button>
                                        <CModal
                                            show={deleteTK}
                                            onClose={() => setDeleteTK(!deleteTK)}
                                            color="danger"
                                        >
                                            <CModalHeader closeButton>
                                                <CModalTitle>X??a t??i x???</CModalTitle>
                                            </CModalHeader>
                                            <CModalBody>
                                                B???n c?? ch???c mu???n x??a th??ng tin t??i x??? n??y ?
                                                </CModalBody>
                                            <CModalFooter>
                                                <CButton color="danger" onClick={handleDeleteTX}>
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

export default DanhsachTaixe;