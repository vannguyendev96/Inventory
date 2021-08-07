import React, { useEffect, useRef, useState } from 'react';
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
import Select from "react-select";
import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle
} from '@coreui/react';
import { ErrorMessage } from 'formik';

DanhSachTonKho.propTypes = {
    data: PropTypes.array,
    onSubmit: PropTypes.func,
    handleRowClick: PropTypes.func,
    onChangeSttKiemKe: PropTypes.func
};

DanhSachTonKho.defaultProps = {
    data: null,
    onSubmit: null,
    handleRowClick: null,
    onChangeSttKiemKe: null
}


function DanhSachTonKho(props) {

    const { data, onSubmit, handleRowClick, onChangeSttKiemKe } = props;
    const dataPNK = data !== null ? data : [];

    const [deleteTK, setDeleteTK] = useState(false);
    const [dataKiemKeClick, setDataKiemKeClick] = useState({});
    const [soluongkiemke, setSoLuongKiemKe] = useState(0);
    const [trangthaikienhang, setTrangThaiKienHang] = useState('');

    const [isCheckSL, setIsCheckSL] = useState(false);
    const [errorSL, setErrorSL] = useState('');

    const [tenkienhangPOPUP, setTenkienhangPOPUP] = useState('');
    const [soluongPOPUP, setSoluongPOPUP] = useState('');

    function openPopUpkiemke(data, tenkienhang, soluongkienhang) {
        setTenkienhangPOPUP(tenkienhang);
        setSoluongPOPUP(soluongkienhang);

        setSoLuongKiemKe(0);
        setTrangThaiKienHang('')

        setDeleteTK(!deleteTK);
        setDataKiemKeClick(data);

    }

    function handleNewKiemKe() {
        setDeleteTK(!deleteTK);
        if (onSubmit) {
            onSubmit(dataKiemKeClick, soluongkiemke, trangthaikienhang)
        }
        setSoLuongKiemKe(0);
        setTrangThaiKienHang('')
    }

    function handleTrangThaiKiemKe(target){
        if(onChangeSttKiemKe){
            const dataValue = target.value !== '' ? target.value : 'Sắp chuyển';
            onChangeSttKiemKe(dataValue);
        }
    }

    const handleOnchangeSL = (target) => {
        const value = target.value;
        setSoLuongKiemKe(value)
        // if (value < 0 || value > soluongPOPUP) {
        //     setIsCheckSL(true);
        //     setErrorSL(`Số lượng tồn kho nhập vào phải bé hơn số lượng kiện hàng trong kho (${soluongPOPUP}) và lớn hơn 0 `)
        // }
        // else {
        //     setIsCheckSL(false);
        //     setErrorSL('')
        // }
    }

    const optionstrangthaikiemke = [
        {value:'Sắp chuyển', label:'Sắp chuyển'},
        {value:'Chưa chuyển', label:'Chưa chuyển'}
    ]

    function pnkHeaderClick(tenkienhang, dongia, loaikienhang, khochuakienhang) {
        if (handleRowClick) {
            handleRowClick(tenkienhang, dongia, loaikienhang, khochuakienhang);
        }
    }

    useEffect( () => {
        if (soluongkiemke < 0 || parseFloat(soluongkiemke, 10) > parseFloat(soluongPOPUP, 10) ) {
            setIsCheckSL(true);
            setErrorSL(`Số lượng tồn kho nhập vào phải bé hơn số lượng kiện hàng trong kho (${soluongPOPUP}) và lớn hơn 0 `)
        }
        else {
            setIsCheckSL(false);
            setErrorSL('')
        }
    },[soluongkiemke])
    

    return (
        <>
            <Table responsive hover size="sm">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên kiện hàng</th>
                        <th>Số lượng tồn kho</th>
                        <th>Khối lượng tồn kho</th>
                        <th>Đơn giá</th>
                        <th>Loại kiện hàng</th>
                        <th>Kho chứa</th>
                        <th>Trạng thái</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataPNK.map((dataList, index) => {
                            const { tenkienhang, soluongkienhang, khoiluongkienhang, dongia, loaikienhang, khochuakienhang, kiemke, ngaykiemke } = dataList //destructuring
                            return (
                                <tr
                                    key={index}

                                >
                                    <td>{index + 1}</td>
                                    <td>{tenkienhang}</td>
                                    <td>{soluongkienhang}</td>
                                    <td>{khoiluongkienhang}</td>
                                    <td>{dongia}</td>
                                    <td>{loaikienhang}</td>
                                    <td>{khochuakienhang}</td>
                                    <td>
                                        <Button type="submit" size="sm" color="success" onClick={() => openPopUpkiemke(dataList, tenkienhang, soluongkienhang)}>Kiểm kê</Button>
                                        <CModal
                                            show={deleteTK}
                                            onClose={() => setDeleteTK(!deleteTK)}
                                            color="primary"
                                        >
                                            <CModalHeader closeButton>
                                                <CModalTitle>Thông tin kiện hàng</CModalTitle>
                                            </CModalHeader>
                                            <CModalBody>
                                                <Form action="" className="form-horizontal">
                                                    <FormGroup row>
                                                        <Col md="3">
                                                            <Label htmlFor="hf-password">Tên kiện hàng</Label>
                                                        </Col>
                                                        <Col xs="12" md="9">
                                                            <Input
                                                                type="text"
                                                                id="tenkienhang"
                                                                name="tenkienhang"
                                                                defaultValue={tenkienhangPOPUP}
                                                            />
                                                        </Col>
                                                    </FormGroup>

                                                    <FormGroup row>
                                                        <Col md="3">
                                                            <Label htmlFor="hf-password">Số lượng kiểm kê</Label>
                                                        </Col>
                                                        <Col xs="12" md="9">
                                                            <Input
                                                                type="number"
                                                                id="soluong"
                                                                name="soluong"
                                                                value={soluongkiemke}
                                                                //onChange={handleOnchangeSL}
                                                                onChange={(e) => setSoLuongKiemKe(e.target.value)}
                                                                invalid={isCheckSL}
                                                            />
                                                            <FormFeedback>{errorSL}</FormFeedback>
                                                        </Col>
                                                    </FormGroup>

                                                    <FormGroup row>
                                                        <Col md="3">
                                                            <Label htmlFor="hf-password">Trạng thái kiện hàng</Label>
                                                        </Col>
                                                        <Col xs="12" md="9">
                                                            {/* <Input
                                                                type="text"
                                                                id="trangthai"
                                                                name="trangthai"
                                                                value={trangthaikienhang}
                                                                onChange={(e) => setTrangThaiKienHang(e.target.value)}
                                                            /> */}
                                                            <Select
                                                                defaultValue={optionstrangthaikiemke.filter(option => option.label==='Sắp chuyển')}
                                                                options={optionstrangthaikiemke}
                                                                onChange={handleTrangThaiKiemKe}
                                                                classNamePrefix="select"
                                                            />
                                                        </Col>
                                                    </FormGroup>
                                                </Form >
                                            </CModalBody>
                                            <CModalFooter>
                                                <CButton color="success" onClick={handleNewKiemKe}>
                                                    Tạo phiếu kiểm kê
                                                </CButton>
                                                <CButton color="secondary" onClick={() => setDeleteTK(!deleteTK)}>
                                                    Close
                                                </CButton>
                                            </CModalFooter>
                                        </CModal>
                                    </td>
                                    <td>
                                        <Button type="submit" size="sm" color="primary" onClick={() => pnkHeaderClick(tenkienhang, dongia, loaikienhang, khochuakienhang)}>Lịch sử kiểm kê</Button>
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

export default DanhSachTonKho;