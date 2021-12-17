const axios = require("axios").default;

const gift = {
  createGift(data) {
    const formData = new FormData();
    Object.keys(data).map((key) => formData.append(key, data[key]));
    return axios
      .post("/api/gift/create", formData)
      .then(({ data }) => data)
      .catch(({ response }) => Promise.reject(response.data));
  },
  //   deleteGift(email, password) {
  //     return axios
  //       .post("/api/gift/delete", { email, password })
  //       .then(({ data }) => data)
  //       .catch(({ response }) => Promise.reject(response.data));
  //   },
  //   updateGift(email, code) {
  //     return axios
  //       .post("/api/gift/update", { email, code })
  //       .then(({ data }) => data)
  //       .catch(({ response }) => Promise.reject(response.data));
  //   },
};

export default gift;
