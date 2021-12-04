const user = {
  handleEmail(email, username) {
    return fetch("/api/auth/signup", {
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
  handleSignIn(email, password) {
    return fetch("/api/auth/signin", {
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
    return fetch("/api/auth/email", {
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
    return fetch("/api/auth/password", {
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
