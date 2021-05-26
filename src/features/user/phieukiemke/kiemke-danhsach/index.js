import React from 'react';
import PropTypes from 'prop-types';
import {
    Table, CardFooter, Button
} from 'reactstrap';

DanhSachTonKho.propTypes = {
    data: PropTypes.array,
};

DanhSachTonKho.defaultProps = {
    data: null,
}


function DanhSachTonKho(props) {

    const { data } = props;
    const dataPNK = data !== null ? data : [];

    return (
        <>
            <Table responsive hover size="sm">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên kiện hàng</th>
                        <th>Số lượng tồn kho</th>
                        <th>Đơn giá</th>
                        <th>Loại kiện hàng</th>
                        <th>Kho chứa</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataPNK.map((dataList, index) => {
                            const { tenkienhang, soluongkienhang, dongia, loaikienhang, khochuakienhang, kiemke, ngaykiemke } = dataList //destructuring
                            return (
                                <tr
                                    key={index}
                                    
                                >
                                    <td>{index + 1}</td>
                                    <td>{tenkienhang}</td>
                                    <td>{soluongkienhang}</td>
                                    <td>{dongia}</td>
                                    <td>{loaikienhang}</td>
                                    <td>{khochuakienhang}</td>
                                    <td>
                                        {(kiemke === "chưa kiểm kê") ? 
                                            <Button/> 

                                            :<div>
                                                Đã kiểm kê
                                            </div>
                                        }
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