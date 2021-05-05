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
import ChitietKhoHang from '../popupchitiet';
import ChinhsuaKhoHang from '../popupedit';


DanhsachKhoHang.propTypes = {
    data: PropTypes.array,
    deleteKhoHang: PropTypes.func,
    updateKhoHang: PropTypes.func
};

DanhsachKhoHang.defaultProps = {
    data: null,
    deleteKhoHang: null,
    updateKhoHang: null
}

function DanhsachKhoHang(props) {

    const { data, deleteKhoHang, updateKhoHang } = props;
    const dataKhoHang = data !== null ? data : [];

    const [detail, setDetail] = useState(false);
    const [deleteTK, setDeleteTK] = useState(false);
    const [tenkhohangDelete, setTenkhohangDelete] = useState('');

    const [tenkhohangDetail, setTenkhohangDetail] = useState('');
    const [succhuaDetail, setSucchuaDetail] = useState('');
    const [trangthaiDetail, setTrangthaiDetail] = useState('');
    const [provineDetail, setProvineDetail] = useState('');
    const [districtDetail, setDistrictDetail] = useState('');
    const [phuongDetail, setPhuongDetail] = useState('');

    function openPopUpDetailKhoHang(tenkhohang, succhua, trangthai, provine, district, phuong) {
        setDetail(!detail);

        setTenkhohangDetail(tenkhohang);
        setSucchuaDetail(succhua);
        setTrangthaiDetail(trangthai);
        setProvineDetail(provine);
        setDistrictDetail(district);
        setPhuongDetail(phuong);
    }

    function handleUpdateTK(tenKH, succhuaKH, trangthaiKH, provineKH, districtKH, phuongKH) {
        if (updateKhoHang) {
            updateKhoHang(tenKH, succhuaKH, trangthaiKH, provineKH, districtKH, phuongKH);
        }
    }

    function openPopUpDeleteKH(tenkhohang){
        setDeleteTK(!deleteTK);
        setTenkhohangDelete(tenkhohang);
    }

    const handleDeleteThuKho =  () => {
        setDeleteTK(!deleteTK)
        if(deleteKhoHang){
            deleteKhoHang(tenkhohangDelete);
        }
    }

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
                    {
                        dataKhoHang.map((dataList, index) => {
                            let i = 1;
                            const { _id, tenkhohang, succhua, trangthai, provine, district, phuong } = dataList //destructuring
                            return (
                                <tr
                                    key={_id}
                                >
                                    <td>{index + 1}</td>
                                    <td>{tenkhohang}</td>
                                    <td>{phuong} {' '} {district} {' '} {provine}</td>
                                    <td>{trangthai}</td>
                                    <td>
                                        <Button type="submit" size="sm" color="primary" onClick={() => openPopUpDetailKhoHang(tenkhohang, succhua, trangthai, provine, district, phuong)} >Xem</Button>
                                        <CModal
                                            show={detail}
                                            onClose={() => setDetail(!detail)}
                                            color="primary"
                                        >
                                            <CModalHeader closeButton>
                                                <CModalTitle>Chi tiết thủ kho</CModalTitle>
                                            </CModalHeader>
                                            <CModalBody>
                                                <ChitietKhoHang tenkhohang={tenkhohangDetail} succhuatoida={succhuaDetail} trangthai={trangthaiDetail}
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
                                        <ChinhsuaKhoHang editTK={handleUpdateTK} tenkhohang={tenkhohang} succhuatoida={succhua} trangthai={trangthai}
                                            provine={provine} district={district} phuong={phuong} />
                                    </td>
                                    <td>
                                        <Button type="submit" size="sm" color="danger" onClick={() => openPopUpDeleteKH(tenkhohang)}>Xóa</Button>
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

export default DanhsachKhoHang;