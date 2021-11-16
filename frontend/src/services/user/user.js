const user = {
  handleEmail(email, username) {
    return fetch("/users/signup/email", {
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
    fetch("/users/signup/confirmemail", {
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
};

export default user;
