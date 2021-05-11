import axiosClient from "./axiosClient";

const pnkApi = {

  taophieuxuatkho: (data, lydoxuatkho, sotienthanhtoan, phuongthucthanhtoan) => {
    const url = '/phieuxuatkho/create-pxk';
    let raw = JSON.stringify({
      "data": data,
      "lydoxuatkho": lydoxuatkho,
      "sotienthanhtoan": sotienthanhtoan,
      "phuongthucthanhtoan": phuongthucthanhtoan
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
}

export default pnkApi;