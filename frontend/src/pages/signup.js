import React from "react";
import { useRouter } from "next/router";
const config = require("../../config");

const SignUp = () => {
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const firstName = formData.get("firstname");
    const lastName = formData.get("lastname");
    const email = formData.get("email");
    const password = formData.get("password");
    const repassword = formData.get("repassword");

    if (password === repassword) {
      await fetch(`${config.serverUrl}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          firstname: firstName,
          lastname: lastName,
          password: password,
        }),
      });

      await router.push("/signin");
      return;
    }

    return console.log("Password must be match");
  };

  return (
    <div className="shiftcronicles-signup">
      <div className="shiftcronicles-signup-container">
        <form
          className="shiftcronicles-signup-container__form"
          onSubmit={submit}
        >
          <h1>Registration</h1>

          <label htmlFor="email">Email Address</label>
          <input className="text" name="email" type="email" required />

          <label htmlFor="firstname">Firstname</label>
          <input name="firstname" type="text" required />

          <label htmlFor="lastname">Lastname</label>
          <input name="lastname" type="text" required />

          <label htmlFor="password">Password</label>
          <input name="password" type="password" required />

          <label htmlFor="repassword">Re-Password</label>
          <input name="repassword" type="password" required />

          <div className="submit-btn">
            <button className="btn" type="submit">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
