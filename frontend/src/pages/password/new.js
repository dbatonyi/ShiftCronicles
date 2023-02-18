import React from "react";
import { useRouter } from "next/router";
const config = require("../../../config");

const NewPassword = () => {
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");

    await fetch(`${config.serverUrl}/api/password/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: email,
      }),
    });

    await router.push("/");
  };

  return (
    <div className="shiftcronicles-password">
      <div className="shiftcronicles-password__form-container">
        <form onSubmit={submit}>
          <h1>Reset Password</h1>

          <label htmlFor="email">Email</label>
          <input name="email" type="email" required />

          <div className="submit-btn">
            <button className="btn" type="submit">
              Reset password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
