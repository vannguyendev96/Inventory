import axiosClient from "./axiosClient";

const warehouseApi = {

    createWarehouse: (warehouse) => {
        const url = '/warehouses/create-warehouse';
        let raw = JSON.stringify({
            "tenkhohang": warehouse.tenkhohang, "succhua": warehouse.suchuatoida, "trangthai": warehouse.trangthai,
            "provine": warehouse.provine, "district": warehouse.district, "phuong": warehouse.phuong
        });

        return axiosClient.post(url, raw);
    },

    getall: () => {
        const url = '/warehouses/getlist-warehouse';

        return axiosClient.get(url);
    },

    thongke: () => {
        const url = '/warehouses/thongkekienhang';

        return axiosClient.get(url);
    },

    updateWarehouse: (warehouse) => {
        const url = '/warehouses/update-warehouse';
        let raw = JSON.stringify({
            "tenkhohang": warehouse.tenkhohang, "succhua": warehouse.succhua, "trangthai": warehouse.trangthai,
            "provine": warehouse.provine, "district": warehouse.district, "phuong": warehouse.phuong
        });
        return axiosClient.post(url, raw);
    },

    deleteWarehouse: (tenkhohang) => {
        const url = '/warehouses/delete-warehouse';
        let raw = JSON.stringify({
            "tenkhohang": tenkhohang
        });
        return axiosClient.post(url, raw);
    },

    getbyidWarehouse: (tenkhohang) => {
        const url = '/warehouses/getbyid-warehouse';
        let raw = JSON.stringify({
            "tenkhohang": tenkhohang
        });
        return axiosClient.post(url, raw);
    },
}

export default warehouseApi;