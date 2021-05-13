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
                        <th>Tên tài xế</th>
                        <th>SĐT</th>
                        <th>Trạng thái</th>
                        <th>Năm sinh</th>
                        <th>Xem thông tin chi tiết tài xế</th>
                        <th>Cập nhật thông tin tài xế</th>
                        <th>Xóa tài xế</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataDriver.map((dataList, index) => {
                            let i = 1;
                            const { _id, tentx, trangthai, sdt, namsinh, provine, district, phuong, cmnd } = dataList //destructuring
                            return (
                                <tr
                                    key={_id}
                                >
                                    <td>{index + 1}</td>
                                    <td>{tentx}</td>
                                    <td>{sdt}</td>
                                    <td>{trangthai}</td>
                                    <td>{(new Date(namsinh)).toISOString().substr(0, 10)}</td>
                                    <td>
                                        <Button type="submit" size="sm" color="primary" onClick={() => openPopUpDetailTX(tentx, trangthai, sdt, namsinh, provine, district, phuong,cmnd)} >See</Button>
                                        <CModal
                                            show={detail}
                                            onClose={() => setDetail(!detail)}
                                            color="primary"
                                        >
                                            <CModalHeader closeButton>
                                                <CModalTitle>Chi tiết tài xế</CModalTitle>
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
                                                <CModalTitle>Xóa tài xế</CModalTitle>
                                            </CModalHeader>
                                            <CModalBody>
                                                Bạn có chắc muốn xóa thông tin tài xế này ?
                                                </CModalBody>
                                            <CModalFooter>
                                                <CButton color="danger" onClick={handleDeleteTX}>
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

export default DanhsachTaixe;