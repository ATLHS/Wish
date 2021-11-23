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
      .then(
        (response) => response,
        (err) => console.log(err)
      );
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
      .then(
        (response) => response,
        (err) => console.log(err)
      );
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
      .then(
        (response) => response,
        (err) => console.log(err)
      );
  },
};

export default user;
