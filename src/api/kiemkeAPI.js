import axiosClient from "./axiosClient";

const kiemkeApi = {

    createkiemke: (data, soluong, trangthai) => {
        const url = '/kiemke/createkiemke';
        let raw = JSON.stringify({
            "data": data, 
            "soluong": soluong, 
            "trangthai": trangthai
        });

        return axiosClient.post(url, raw);
    },

    getdetail: (data) => {
        const url = '/kiemke/getdetail';
        let raw = JSON.stringify({
            "data": data
        });

        return axiosClient.post(url, raw);
    },

}

export default kiemkeApi;