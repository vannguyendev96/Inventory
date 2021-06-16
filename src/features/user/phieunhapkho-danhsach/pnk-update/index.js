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
import Popup from "src/views/notifications/modals/Popup";

ChinhsuaPNK.propTypes = {
    malohang: PropTypes.string,
    tenkienhang: PropTypes.string,
    soluongkienhang: PropTypes.string,
    khoiluongkienhang: PropTypes.string,
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
    editPNK: PropTypes.func,
};

ChinhsuaPNK.defaultProps = {
    malohang: '',
    tenkienhang: '',
    soluongkienhang: '',
    khoiluongkienhang: '',
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
    editPNK: null,
}

const optionsloaikienhang = [
    { value: 'Hàng dễ vỡ', label: 'Hàng dễ vỡ' },
    { value: 'Hàng điện tử', label: 'Hàng điện tử' },
    { value: 'Hàng mỹ phẩm', label: 'Hàng mỹ phẩm' }
];


function ChinhsuaPNK(props) {

    const { malohang, tenkienhang, soluongkienhang, khoiluongkienhang,
        trangthai, loaikienhang, khochuakienhang, diachikhochua,
        tennguoinhan, sdtnguoinhan, diachinguoinhan,
        tennguoigui, sdtnguoigui, diachinguoigui,
        dongia, editPNK } = props;

    const [update, setUpdate] = useState(false);
    const [dataWareHouse, setDataWareHouse] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [tenKienHangPNK, setTenKienHangPNK] = useState(tenkienhang);
    const [soluongPNK, setSoLuongPNK] = useState(soluongkienhang);
    const [khoiluongPNK, setKhoiLuongPNK] = useState(khoiluongkienhang);
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
        setIsOpen(!isOpen);
        if (editPNK) {
            const dataUpdate = {
                malohang, tenkienhang, soluongkienhang, khoiluongkienhang,
                trangthai, loaikienhang, khochuakienhang, diachikhochua,
                tennguoinhan, sdtnguoinhan, diachinguoinhan,
                tennguoigui, sdtnguoigui, diachinguoigui,
                dongia
            }
            editPNK(malohang, tenKienHangPNK, soluongPNK, khoiluongPNK,
                trangthaiPNK, loaikienhangPNK,
                khochuakienhangPNK, dckhochuaPNK,
                diachinguoinhanPNK, tennguoiguiPNK, sdtnguoiguiPNK, diachinguoiguiPNK, dongiaPNK, dataUpdate);


        }
    }

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }



    return (
        <>
            <Button type="submit" size="sm" color="success" onClick={togglePopup}>Edit</Button>

            {isOpen && <Popup
                content={<>
                    <b>Chỉnh sửa thông tin phiếu nhập kho</b>
                    <Form action="" className="form-horizontal">
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="hf-password">Tên kiện hàng </Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input
                                    type="text"
                                    id="tenkienhang"
                                    name="tenkienhang"
                                    onChange={(e) => setTenKienHangPNK(e.target.value)}
                                    placeholder={tenkienhang}
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
                                    id={`soluong${malohang}`}
                                    name={`soluong${malohang}`}
                                    onChange={(e) => setSoLuongPNK(e.target.value)}
                                    placeholder={soluongkienhang}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="hf-password">Khối lượng {khoiluongkienhang}</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input
                                    type="text"
                                    id="khoiluong"
                                    name="khoiluong"
                                    onChange={(e) => setKhoiLuongPNK(e.target.value)}
                                    placeholder={khoiluongkienhang}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="hf-password">Đơn giá</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <CurrencyFormat
                                    placeholder={dongia}
                                    thousandSeparator={true} prefix={'VND '}
                                    onValueChange={(e) => setDongiaPNK(e.value)}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="hf-password">Trạng thái </Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input
                                    type="text"
                                    id="trangthai"
                                    name="trangthai"

                                    onChange={(e) => setTrangthaiPNK(e.target.value)}
                                    placeholder={trangthai}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="hf-password">Loại kiện hàng </Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Select
                                    onChange={handleOnchangeLoaiKienHang}
                                    options={optionsloaikienhang}
                                    placeholder={loaikienhang}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="hf-password">Kho chứa </Label>
                            </Col>
                            <Col xs="12" md="9">


                                <Select
                                    onChange={handOnchangKhoChua}
                                    options={dataWareHouse}
                                    placeholder={khochuakienhang}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="hf-password">Địa chỉ kho chứa </Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input
                                    type="text"
                                    id="khochua"
                                    name="khochua"
                                    placeholder={diachikhochua}
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
                                    placeholder={tennguoinhan}
                                    //onChange={(e) => setTennguoinhanPNK(e.target.value)}
                                    readOnly={true}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="hf-password">Số điện thoại </Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input
                                    type="text"
                                    id="sdtnguoinhan"
                                    name="sdtnguoinhan"
                                    defaultValue={sdtnguoinhanPNK}
                                    placeholder={sdtnguoinhan}
                                    //onChange={(e) => setSdtnguoinhanPNK(e.target.value)}
                                    readOnly={true}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="hf-password">Địa chỉ </Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input
                                    type="text"
                                    id="diachinguoinhan"
                                    name="diachinguoinhan"
                                    defaultValue={diachinguoinhanPNK}
                                    placeholder={diachinguoinhan}
                                    onChange={(e) => setDiachinguoinhanPNK(e.target.value)}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="hf-password">Người gửi </Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input
                                    type="text"
                                    id="tennguoigui"
                                    name="tennguoigui"
                                    defaultValue={tennguoiguiPNK}
                                    placeholder={tennguoigui}
                                    onChange={(e) => setTennguoiguiPNK(e.target.value)}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="hf-password">Số điện thoại </Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input
                                    type="text"
                                    id="sdtnguoigui"
                                    name="sdtnguoigui"
                                    defaultValue={sdtnguoiguiPNK}
                                    placeholder={sdtnguoigui}
                                    onChange={(e) => setSdtnguoiguiPNK(e.target.value)}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="hf-password">Địa chỉ </Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input
                                    type="text"
                                    id="diachinguoigui"
                                    name="diachinguoigui"
                                    placeholder={diachinguoigui}
                                    defaultValue={diachinguoiguiPNK}
                                    onChange={(e) => setDiachinguoiguiPNK(e.target.value)}
                                />
                            </Col>
                        </FormGroup>

                        <CButton color="primary" onClick={handleSubmitUpdate}>
                            Save
                        </CButton>
                        <CButton color="secondary" onClick={togglePopup}>
                            Close
                        </CButton>
                    </Form >
                </>}
                handleClose={togglePopup}
            />
            }

        </>

    );
}

export default ChinhsuaPNK;