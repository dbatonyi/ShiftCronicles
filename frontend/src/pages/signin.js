import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { AuthContext } from "../layouts/Layout";

const signIn = () => {
  const { actions, authFailed } = useContext(AuthContext);

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");
    actions.signIn(email, password);
  };

  useEffect(() => {
    if (authFailed) {
      const signinPassword = document.querySelector(".signin-password");
      signinPassword.value = "";
    }
  }, [authFailed]);

  return (
    <div className="shiftcronicles-signin">
      <div className="shiftcronicles-signin__form-container">
        <form onSubmit={submit}>
          <h1>Please sign in</h1>
          {authFailed ? (
            <div className="shiftcronicles-signin__form-container--error">
              Wrong email or password!
            </div>
          ) : (
            ""
          )}
          <label htmlFor="email">Email Address</label>
          <input className="text" name="email" type="email" required />

          <label htmlFor="password">Password</label>
          <input
            className="signin-password"
            name="password"
            type="password"
            required
          />

          <div className="submit-btn">
            <button className="btn" type="submit">
              Sign in
            </button>
          </div>
        </form>
        <div className="shiftcronicles-signin__form-container--password-reset">
          <Link href="/password/new">Reset password!</Link>
        </div>
        <div className="shiftcronicles-signin__form-container--sign-up">
          <Link href="/signup">I don't have a user yet!</Link>
        </div>
      </div>
    </div>
  );
};

export default signIn;
