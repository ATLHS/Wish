const axios = require("axios").default;

const user = {
  handleEmail(email, username) {
    return axios
      .post("/api/auth/signup", { email, username })
      .then(({ data }) => data)
      .catch(({ response }) => Promise.reject(response.data));
  },
  handleSignIn(email, password) {
    return axios
      .post("/api/auth/signin", { email, password })
      .then(({ data }) => data)
      .catch(({ response }) => Promise.reject(response.data));
  },
  handleConfirmCode(email, code) {
    return axios
      .post("/api/auth/email", { email, code })
      .then(({ data }) => data)
      .catch(({ response }) => Promise.reject(response.data));
  },
  handleUserPaswword(email, password) {
    return axios
      .post("/api/auth/password", { email, password })
      .then(({ data }) => data)
      .catch(({ response }) => Promise.reject(response.data));
  },
};

export default user;
