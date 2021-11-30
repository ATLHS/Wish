const user = {
  handleEmail(email, username) {
    return fetch("/auth/signup/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username }),
    })
      .then((res) => res.json())
      .then((response) => response)
      .catch((err) => err);
  },
  handleLogin(email, password) {
    console.log("hhh")
    return fetch("/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((response) => response)
      .catch((err) => err);
  },
  handleConfirmCode(email, code) {
    return fetch("/auth/signup/confirmemail", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, code }),
    })
      .then((res) => res.json())
      .then((response) => response)
      .catch((err) => err);
  },
  handleUserPaswword(email, password) {
    return fetch("/auth/signup/password", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((response) => response)
      .catch((err) => err);
  },
};

export default user;
