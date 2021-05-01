import { getCookie } from "src/utlis/cookies";
import axiosClient from "./axiosClient";

const driverApi = {

    createInfoDriver: (driver) => {
        const url = '/drivers/createinfodriver';
        let raw = JSON.stringify({
            "cmnd": driver.cmnd, "tentx": driver.tentx, "trangthai": driver.trangthai, "sdt": driver.sdt,
            "namsinh": driver.namsinh, "provine": driver.provine,
            "district": driver.district, "phuong": driver.phuong
        });
       
        return axiosClient.post(url,raw);
    },

}

export default driverApi;