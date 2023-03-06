import React from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
const config = require("../../../config");

const NewPassword = () => {
  const router = useRouter();
  const { t } = useTranslation("newpassword");

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
    <div className="shiftcronicles-password min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <LanguageSwitcher />
      <div className="shiftcronicles-password__form-container mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form onSubmit={submit} className="space-y-6">
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t("newPassTitle")}
          </h1>

          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            {t("newPassEmail")}
          </label>
          <input
            name="email"
            type="email"
            required
            className="text appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />

          <div className="submit-btn">
            <button
              className="btn inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-6"
              type="submit"
            >
              {t("newPassSubmit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
