import React, { useContext, useEffect } from "react";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { AuthContext } from "../layouts/Layout";

const signIn = () => {
  const { t } = useTranslation("signin");

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
    <div className="shiftcronicles-signin min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <LanguageSwitcher />
      <div className="shiftcronicles-signin__form-container mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form onSubmit={submit} className="space-y-6">
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t("signInTitle")}
          </h1>
          {authFailed ? (
            <div className="shiftcronicles-signin__form-container--error">
              {t("signInAuthError")}
            </div>
          ) : (
            ""
          )}
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            {t("signInEmail")}
          </label>
          <input
            className="text appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            name="email"
            type="email"
            required
          />

          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            {t("signInPassword")}
          </label>
          <input
            className="signin-password appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            name="password"
            type="password"
            required
          />

          <div className="submit-btn">
            <button
              className="btn inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-6"
              type="submit"
            >
              {t("signInSubmit")}
            </button>
          </div>
        </form>
        <div className="shiftcronicles-signin__form-container--password-reset font-medium text-indigo-600 hover:text-indigo-500">
          <Link href="/password/new">{t("signInPassReset")}</Link>
        </div>
        <div className="shiftcronicles-signin__form-container--sign-up font-medium text-indigo-600 hover:text-indigo-500">
          <Link href="/signup">{t("signInRegistration")}</Link>
        </div>
      </div>
    </div>
  );
};

export default signIn;
