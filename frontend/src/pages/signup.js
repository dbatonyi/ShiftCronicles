import React from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
const config = require("../../config");

const SignUp = () => {
  const { t } = useTranslation("signup");
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
    <div className="shiftcronicles-signup min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <LanguageSwitcher />
      <div className="shiftcronicles-signup-container mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form
          className="shiftcronicles-signup-container__form space-y-6"
          onSubmit={submit}
        >
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t("signupTitle")}
          </h1>

          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            {t("signupEmail")}
          </label>
          <input
            className="text appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            name="email"
            type="email"
            required
          />

          <label
            htmlFor="firstname"
            className="block text-sm font-medium text-gray-700"
          >
            {t("signupFirstName")}
          </label>
          <input
            name="firstname"
            type="text"
            required
            className="text appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />

          <label
            htmlFor="lastname"
            className="block text-sm font-medium text-gray-700"
          >
            {t("signupLastName")}
          </label>
          <input
            name="lastname"
            type="text"
            required
            className="text appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />

          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            {t("signupPassword")}
          </label>
          <input
            name="password"
            type="password"
            required
            className="text appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />

          <label
            htmlFor="repassword"
            className="block text-sm font-medium text-gray-700"
          >
            {t("signupRePassword")}
          </label>
          <input
            name="repassword"
            type="password"
            required
            className="text appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />

          <div className="submit-btn">
            <button
              className="btn inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-6"
              type="submit"
            >
              {t("signupSubmit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
