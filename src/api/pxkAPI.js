import axiosClient from "./axiosClient";

const pnkApi = {

  taophieuxuatkho: (data, lydoxuatkho, sotienthanhtoan, phuongthucthanhtoan, taixevanchuyen) => {
    const url = '/phieuxuatkho/create-pxk';
    let raw = JSON.stringify({
      "data": data,
      "lydoxuatkho": lydoxuatkho,
      "sotienthanhtoan": sotienthanhtoan,
      "phuongthucthanhtoan": phuongthucthanhtoan,
      "taixevanchuyen": taixevanchuyen
    });
    return axiosClient.post(url, raw);
  },

  getbyuser: (nguoitaolohang) => {
    const url = '/phieuxuatkho/getbyuser-pxk';
    let raw = JSON.stringify({
      "nguoitaolohang": nguoitaolohang
    });
    return axiosClient.post(url, raw);
  },

  getbymalohang: (malohang) => {
    const url = '/phieuxuatkho/getbymalohang-pxkdetail';
    let raw = JSON.stringify({
      "malohang": malohang
    });
    return axiosClient.post(url, raw);
  },

  search: (queryString, dataQuery) => {
    const url = '/phieuxuatkho/search-pxk';
    let raw = JSON.stringify({
      "queryString": queryString,
      "dataQuery": dataQuery
    });
    return axiosClient.post(url, raw);
  },

  report: () => {
    const url = '/phieuxuatkho/report';
    return axiosClient.get(url);
  },

  chinhsuaphieuxuatkho: (malohang, tenkienhang, soluongkienhang, trangthai, loaikienhang, khochuakienhang,
    diachikhochua, diachinguoigui, tennguoinhan, sdtnguoinhan, diachinguoinhan, dongia, dataUpdate) => {
    const url = '/phieuxuatkho/edit-pxk';
    let raw = JSON.stringify({
      "malohang": malohang,
      "tenkienhang": tenkienhang,
      "soluongkienhang": soluongkienhang,
      "trangthai": trangthai,
      "loaikienhang": loaikienhang,
      "khochuakienhang": khochuakienhang,
      "diachikhochua": diachikhochua,
      "diachinguoigui": diachinguoigui,
      "tennguoinhan": tennguoinhan,
      "sdtnguoinhan": sdtnguoinhan,
      "diachinguoinhan": diachinguoinhan,
      "dongia": dongia,
      "dataUpdate": dataUpdate
    });
    return axiosClient.post(url, raw);
  },

  xoaphieuxuatkho: (dataUpdate) => {
    const url = '/phieuxuatkho/delete-pxk';
    let raw = JSON.stringify({
      "dataUpdate": dataUpdate
    });
    return axiosClient.post(url, raw);
  },
}

export default pnkApi;