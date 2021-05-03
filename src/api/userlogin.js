import axiosClient from "./axiosClient";

const userApi = {
  login: (user) => {
    const url = '/users/signin';
    let raw = JSON.stringify({
      "email": user.username, "password": user.password
    });
    return axiosClient.post(url, raw);
  },

  register: (user) => {
    const url = '/users/signup';
    let raw = JSON.stringify({
      "email": user.username, "password": user.password, "roll": user.chucvu, "name": user.tenuser,
      "emailUser": user.email, "sdt": "0" + user.sdt.toString(), "kholamviec": user.kholamviec
    });
    return axiosClient.post(url, raw);
  },

  getall: () => {
    const url = '/users/getall';
    
    return axiosClient.get(url);
  },

  deleteuser: (email) => {
    const url = '/users/delete-user';
    let raw = JSON.stringify({
      "email": email
    });
    return axiosClient.post(url,raw);
  },

}

export default userApi;