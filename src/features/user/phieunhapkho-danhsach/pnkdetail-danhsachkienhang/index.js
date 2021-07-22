import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Table, CardFooter, Button
} from 'reactstrap';
import ChinhsuaPNK from '../pnk-update';

import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle
} from '@coreui/react';

DanhSachKienHang.propTypes = {
    data: PropTypes.array,
    updatePNK: PropTypes.func,
    deletePNK: PropTypes.func,
    updatePhieuNhapKho: PropTypes.func,
};

DanhSachKienHang.defaultProps = {
    data: null,
    updatePNK: null,
    deletePNK: null,
    updatePhieuNhapKho: null,
}


function DanhSachKienHang(props) {

    const { data, updatePNK, deletePNK, updatePhieuNhapKho } = props;
    const dataKienHang = data !== null ? data : [];

    const [deleteTK, setDeleteTK] = useState(false);
    const [dataDeleteClick, setDataDeleteClick] = useState({});

    // function handleUpdate(malohang, tenKienHangPNK, soluongPNK, khoiluongPNK, trangthaiPNK, loaikienhangPNK, khochuakienhangPNK, dckhochuaPNK,
    //     diachinguoinhanPNK, tennguoiguiPNK, sdtnguoiguiPNK, diachinguoiguiPNK, dongiaPNK, dataUpdate) {
    //     if (updatePNK) {
    //         // updatePNK(malohang, tenKienHangPNK, soluongPNK, khoiluongPNK, trangthaiPNK, loaikienhangPNK, khochuakienhangPNK, dckhochuaPNK,
    //         //     diachinguoinhanPNK, tennguoiguiPNK, sdtnguoiguiPNK, diachinguoiguiPNK, dongiaPNK.dongia, dataUpdate)
    //         console.log(dataUpdate)
    //     }

    // }
    function handleUpdate(malohang, tenKienHangPNK, soluongPNK, khoiluongPNK, trangthaiPNK, loaikienhangPNK, khochuakienhangPNK, dckhochuaPNK,
             diachinguoinhanPNK, tennguoiguiPNK, sdtnguoiguiPNK, diachinguoiguiPNK, dongiaPNK, dataUpdate) {
        if (updatePNK) {
            updatePNK(malohang, tenKienHangPNK, soluongPNK, khoiluongPNK, trangthaiPNK, loaikienhangPNK, khochuakienhangPNK, dckhochuaPNK,
                diachinguoinhanPNK, tennguoiguiPNK, sdtnguoiguiPNK, diachinguoiguiPNK, dongiaPNK, dataUpdate)
        }

    }


    function handleDeleteKienHang() {
        setDeleteTK(!deleteTK);
        if (deletePNK) {
            deletePNK(dataDeleteClick);
        }
    }

    function openPopUpdelete(data) {
        setDeleteTK(!deleteTK);
        setDataDeleteClick(data);
    }

    return (
        <>
            <Table responsive hover size="sm">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên kiện hàng</th>
                        <th>Số lượng</th>
                        <th>Khối lượng</th>
                        <th>Đơn giá</th>
                        <th>Trạng thái</th>
                        <th>Loại kiện</th>
                        <th>Kho chứa</th>
                        {/* <th>Địa chỉ kho hàng</th> */}
                        <th>Thông tin người nhận</th>
                        <th>Thông tin người gửi</th>
                        <th>Chỉnh sửa</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataKienHang.map((dataList, index) => {
                            const { malohang, nguoitaolohang, tenkienhang, soluongkienhang, khoiluongkienhang,
                                trangthai, loaikienhang, khochuakienhang, diachikhochua,
                                tennguoinhan, sdtnguoinhan, diachinguoinhan,
                                tennguoigui, sdtnguoigui, diachinguoigui, dongia } = dataList //destructuring
                            return (
                                <tr
                                    key={index}
                                >
                                    <td>{index + 1}</td>
                                    <td>{tenkienhang}</td>
                                    <td>{soluongkienhang}</td>
                                    <td>{khoiluongkienhang}</td>
                                    <td>{dongia}</td>
                                    <td>{trangthai}</td>
                                    <td>{loaikienhang}</td>
                                    <td>{khochuakienhang}</td>
                                    {/* <td>{diachikhochua}</td> */}
                                    <td>{`Tên: ${tennguoinhan}, SDT: ${sdtnguoinhan}, Địa chỉ: ${diachinguoinhan}`}</td>
                                    <td>{`Tên: ${tennguoigui}, SDT: ${sdtnguoigui}, Địa chỉ: ${diachinguoigui}`}</td>
                                    <td>
                                        <ChinhsuaPNK
                                            malohang={malohang}
                                            tenkienhang={tenkienhang}
                                            soluongkienhang={soluongkienhang}
                                            khoiluongkienhang={khoiluongkienhang}
                                            dongia={dongia}
                                            trangthai={trangthai}
                                            loaikienhang={loaikienhang}
                                            khochuakienhang={khochuakienhang}
                                            diachikhochua={diachikhochua}
                                            tennguoinhan={tennguoinhan}
                                            sdtnguoinhan={sdtnguoinhan}
                                            diachinguoinhan={diachinguoinhan}

                                            tennguoigui={tennguoigui}
                                            sdtnguoigui={sdtnguoigui}
                                            diachinguoigui={diachinguoigui}

                                            editPNK={handleUpdate}
                                        />
                                    </td>
                                    <td>
                                        <Button type="submit" size="sm" color="danger" onClick={() => openPopUpdelete(dataList)}>Delete</Button>
                                        <CModal
                                            show={deleteTK}
                                            onClose={() => setDeleteTK(!deleteTK)}
                                            color="danger"
                                        >
                                            <CModalHeader closeButton>
                                                <CModalTitle>Xóa kiện hàng</CModalTitle>
                                            </CModalHeader>
                                            <CModalBody>
                                                Bạn có chắc muốn xóa thông tin kiện hàng này ?
                                                    
                                                </CModalBody>
                                                <CModalFooter>
                                                    <CButton color="danger" onClick={handleDeleteKienHang}>
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

export default DanhSachKienHang;