import axiosClient from "./axiosClient";

const pnkApi = {

  taophieunhapkho: (data,driver) => {
    const url = '/phieunhapkho/create-pnk';
    let raw = JSON.stringify({
      "data": data,
      "driver": driver
    });
    return axiosClient.post(url, raw);
  },

  getbyuser: (nguoitaolohang) => {
    const url = '/phieunhapkho/getbyuser-pnk';
    let raw = JSON.stringify({
      "nguoitaolohang": nguoitaolohang
    });
    return axiosClient.post(url, raw);
  },

  getbymalohang: (malohang) => {
    const url = '/phieunhapkho/getbymalohang-pnkdetail';
    let raw = JSON.stringify({
      "malohang": malohang
    });
    return axiosClient.post(url, raw);
  },

  search: (queryString, dataQuery) => {
    const url = '/phieunhapkho/search-pnk';
    let raw = JSON.stringify({
      "queryString": queryString,
      "dataQuery": dataQuery
    });
    return axiosClient.post(url, raw);
  },

  chinhsuaphieunhapkho: (malohang, tenkienhang, soluongkienhang, trangthai, loaikienhang, khochuakienhang,
    diachikhochua, diachinguoinhan, tennguoigui, sdtnguoigui, diachinguoigui, dongia, dataUpdate) => {
    const url = '/phieunhapkho/edit-pnk';
    let raw = JSON.stringify({
      "malohang": malohang,
      "tenkienhang": tenkienhang,
      "soluongkienhang": soluongkienhang,
      "trangthai": trangthai,
      "loaikienhang": loaikienhang,
      "khochuakienhang": khochuakienhang,
      "diachikhochua": diachikhochua,
      "diachinguoinhan": diachinguoinhan,
      "tennguoigui": tennguoigui,
      "sdtnguoigui": sdtnguoigui,
      "diachinguoigui": diachinguoigui,
      "dongia": dongia,
      "dataUpdate": dataUpdate
    });
    return axiosClient.post(url, raw);
  },

  xoaphieunhapkho: (dataUpdate) => {
    const url = '/phieunhapkho/delete-pnk';
    let raw = JSON.stringify({
      "dataUpdate": dataUpdate
    });
    return axiosClient.post(url, raw);
  },

}

export default pnkApi;