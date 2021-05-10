import axiosClient from "./axiosClient";

const pnkApi = {

  taophieunhapkho: (data) => {
    const url = '/phieunhapkho/create-pnk';
    let raw = JSON.stringify({
      "data": data
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

}

export default pnkApi;