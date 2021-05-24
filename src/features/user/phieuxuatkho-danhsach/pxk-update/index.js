import React, { useEffect, useState } from "react";
import {
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Button,

} from 'reactstrap';
import PropTypes from 'prop-types';

import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle
} from '@coreui/react';

import CurrencyFormat from 'react-currency-format';
import Select from 'react-select';
import warehouseApi from "src/api/warehouseAPI";
import FullPageLoader from "src/views/fullpageloading";

ChinhsuaPXK.propTypes = {
    malohang: PropTypes.string,
    tenkienhang: PropTypes.string,
    soluongkienhang: PropTypes.string,
    trangthai: PropTypes.string,
    loaikienhang: PropTypes.string,
    khochuakienhang: PropTypes.string,
    diachikhochua: PropTypes.string,
    tennguoinhan: PropTypes.string,
    sdtnguoinhan: PropTypes.string,
    diachinguoinhan: PropTypes.string,
    tennguoigui: PropTypes.string,
    sdtnguoigui: PropTypes.string,
    diachinguoigui: PropTypes.string,
    dongia: PropTypes.string,
    editPXK: PropTypes.func,
};

ChinhsuaPXK.defaultProps = {
    malohang: '',
    tenkienhang: '',
    soluongkienhang: '',
    trangthai: '',
    loaikienhang: '',
    khochuakienhang: '',
    diachikhochua: '',
    tennguoinhan: '',
    sdtnguoinhan: '',
    diachinguoinhan: '',
    tennguoigui: '',
    sdtnguoigui: '',
    diachinguoigui: '',
    dongia: '',
    editPXK: null,
}

const optionsloaikienhang = [
    { value: 'Hàng dễ vỡ', label: 'Hàng dễ vỡ' },
    { value: 'Hàng điện tử', label: 'Hàng điện tử' },
    { value: 'Hàng mỹ phẩm', label: 'Hàng mỹ phẩm' }
];


function ChinhsuaPXK(props) {

    const { malohang, tenkienhang, soluongkienhang, trangthai, loaikienhang, khochuakienhang, diachikhochua,
        tennguoinhan, sdtnguoinhan, diachinguoinhan,
        tennguoigui, sdtnguoigui, diachinguoigui,
        dongia, editPXK } = props;

    const [update, setUpdate] = useState(false);
    const [dataWareHouse, setDataWareHouse] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [tenKienHangPNK, setTenKienHangPNK] = useState(tenkienhang);
    const [soluongPNK, setSoLuongPNK] = useState(soluongkienhang);
    const [trangthaiPNK, setTrangthaiPNK] = useState(trangthai);
    const [loaikienhangPNK, setLoaikienhangPNK] = useState(loaikienhang);
    const [khochuakienhangPNK, setKhochuakienhangPNK] = useState(khochuakienhang);
    const [tennguoinhanPNK, setTennguoinhanPNK] = useState(tennguoinhan);
    const [sdtnguoinhanPNK, setSdtnguoinhanPNK] = useState(sdtnguoinhan);
    const [diachinguoinhanPNK, setDiachinguoinhanPNK] = useState(diachinguoinhan);
    const [tennguoiguiPNK, setTennguoiguiPNK] = useState(tennguoigui);
    const [sdtnguoiguiPNK, setSdtnguoiguiPNK] = useState(sdtnguoigui);
    const [diachinguoiguiPNK, setDiachinguoiguiPNK] = useState(diachinguoigui);
    const [dongiaPNK, setDongiaPNK] = useState(dongia);
    const [dckhochuaPNK, setDCKhochuaPNK] = useState(diachikhochua);

    function handleOnchangeLoaiKienHang(target) {
        setLoaikienhangPNK(target.value)
    }

    const getListWarehouse = async () => {
        setIsLoading(true);
        let listWarehouse = [];
        try {
            await warehouseApi.getall()
                .then(response => {
                    const list = response.data;
                    list.forEach(element => {
                        listWarehouse.push({
                            value: element.tenkhohang,
                            label: element.tenkhohang
                        })
                    });
                    setDataWareHouse(listWarehouse);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.log(error)
                    setIsLoading(false);
                })
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getListWarehouse();
        console.log(khochuakienhang)
    }, [])

    const handOnchangKhoChua = async (target) => {
        setKhochuakienhangPNK(target.value);

        await warehouseApi.getbyidWarehouse(target.value)
            .then(response => {
                const address = `phường(xã) ${response.data.phuong} quận(huyện) ${response.data.district} tỉnh(thành phố) ${response.data.provine}`;
                setDCKhochuaPNK(address);
            })
            .catch(error => {
                console.log(error);
            })
    }

    function handleSubmitUpdate() {
        setUpdate(!update);
        if (editPXK) {
            const data = {
                malohang, tenkienhang, soluongkienhang, trangthai, loaikienhang, khochuakienhang, diachikhochua,
                tennguoinhan, sdtnguoinhan, diachinguoinhan,
                tennguoigui, sdtnguoigui, diachinguoigui,
                dongia
            }
            editPXK(malohang, tenKienHangPNK, soluongPNK, trangthaiPNK, loaikienhangPNK, khochuakienhangPNK, dckhochuaPNK,
                diachinguoiguiPNK, tennguoinhanPNK, sdtnguoinhanPNK, diachinguoinhanPNK, dongiaPNK, data);
        }
    }

    return (
        <>
            <Button type="submit" size="sm" color="success" onClick={() => setUpdate(!update)}>Edit</Button>
            <CModal
                show={update}
                onClose={() => setUpdate(!update)}
                color="primary"
                size="lg"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Chỉnh sửa thông tin phiếu xuất kho</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {isLoading ? <FullPageLoader /> :
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
                                        defaultValue={tenkienhang}
                                        onChange={(e) => setTenKienHangPNK(e.target.value)}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md="3">
                                    <Label htmlFor="hf-password">Số lượng</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <Input
                                        type="text"
                                        id="soluong"
                                        name="soluong"
                                        defaultValue={soluongkienhang}
                                        onChange={(e) => setSoLuongPNK(e.target.value)}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md="3">
                                    <Label htmlFor="hf-password">Đơn giá</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <CurrencyFormat
                                        value={dongiaPNK}
                                        thousandSeparator={true} prefix={'VND '}
                                        onValueChange={(e) => setDongiaPNK(e.value)}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md="3">
                                    <Label htmlFor="hf-password">Trạng thái</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <Input
                                        type="text"
                                        id="trangthai"
                                        name="trangthai"
                                        defaultValue={trangthai}
                                        onChange={(e) => setTrangthaiPNK(e.target.value)}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md="3">
                                    <Label htmlFor="hf-password">Loại kiện hàng</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <Select
                                        defaultValue={optionsloaikienhang.filter(option => (option.label) === loaikienhang)}
                                        onChange={handleOnchangeLoaiKienHang}
                                        options={optionsloaikienhang}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md="3">
                                    <Label htmlFor="hf-password">Kho chứa</Label>
                                </Col>
                                <Col xs="12" md="9">


                                    <Select
                                        defaultValue={dataWareHouse.filter(option => (option.label) === khochuakienhang)}
                                        // onChange={(target) => setKhochuakienhangPNK(target.value)}
                                        onChange={handOnchangKhoChua}
                                        options={dataWareHouse}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md="3">
                                    <Label htmlFor="hf-password">Địa chỉ kho chứa</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <Input
                                        type="text"
                                        id="khochua"
                                        name="khochua"
                                        value={dckhochuaPNK}
                                        readOnly={true}
                                        onChange={() => console.log('')}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md="3">
                                    <Label htmlFor="hf-password">Người nhận</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <Input
                                        type="text"
                                        id="tennguoinhan"
                                        name="tennguoinhan"
                                        defaultValue={tennguoinhan}
                                        onChange={(e) => setTennguoinhanPNK(e.target.value)}

                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md="3">

                                </Col>
                                <Col xs="12" md="9">
                                    <Input
                                        type="text"
                                        id="sdtnguoinhan"
                                        name="sdtnguoinhan"
                                        defaultValue={sdtnguoinhan}
                                        onChange={(e) => setSdtnguoinhanPNK(e.target.value)}

                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md="3">

                                </Col>
                                <Col xs="12" md="9">
                                    <Input
                                        type="text"
                                        id="diachinguoinhan"
                                        name="diachinguoinhan"
                                        defaultValue={diachinguoinhan}
                                        onChange={(e) => setDiachinguoinhanPNK(e.target.value)}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md="3">
                                    <Label htmlFor="hf-password">Người gửi</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <Input
                                        type="text"
                                        id="tennguoigui"
                                        name="tennguoigui"
                                        defaultValue={tennguoigui}
                                        //onChange={(e) => setTennguoiguiPNK(e.target.value)}
                                        readOnly={true}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md="3">

                                </Col>
                                <Col xs="12" md="9">
                                    <Input
                                        type="text"
                                        id="sdtnguoigui"
                                        name="sdtnguoigui"
                                        defaultValue={sdtnguoigui}
                                        //onChange={(e) => setSdtnguoiguiPNK(e.target.value)}
                                        readOnly={true}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md="3">

                                </Col>
                                <Col xs="12" md="9">
                                    <Input
                                        type="text"
                                        id="diachinguoigui"
                                        name="diachinguoigui"
                                        defaultValue={diachinguoigui}
                                        onChange={(e) => setDiachinguoiguiPNK(e.target.value)}
                                    />
                                </Col>
                            </FormGroup>

                        </Form >
                    }

                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={handleSubmitUpdate}>
                        Save
                    </CButton>
                    <CButton color="secondary" onClick={() => setUpdate(!update)}>
                        Close
                    </CButton>
                </CModalFooter>
            </CModal>
        </>

    );
}

export default ChinhsuaPXK;