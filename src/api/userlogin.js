import axiosClient from "./axiosClient";

const userApi = {
    login: (user) => {
      const url = '/users/signin';
      let raw = JSON.stringify({
        "email": user.username, "password": user.password
    });
      return axiosClient.post(url, raw);
    },
  
  }
  
  export default userApi;