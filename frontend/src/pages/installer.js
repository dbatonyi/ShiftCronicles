import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const config = require("../../config");

const Installer = () => {
  const { t } = useTranslation("installer");
  const router = useRouter();

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const apiMaintenanceCheck = async () => {
      try {
        const data = await fetch(`${config.serverUrl}/api/maintenance-mode`, {
          credentials: "include",
        });

        if (!data.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setLoader(false);
      } catch (error) {
        router.push("/signin");
      }
    };

    apiMaintenanceCheck();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    await fetch(`${config.serverUrl}/api/installer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        username: formData.get("db-username"),
        password: formData.get("db-password"),
        database: formData.get("db-name"),
        host: formData.get("db-host"),
        dialect: formData.get("db-dialect"),
        frontendUrl: formData.get("frontend-url"),
        smtpHost: formData.get("smtp-host"),
        smtpEmail: formData.get("smtp-email"),
        smtpPassword: formData.get("smtp-password"),
        jwtkey: formData.get("jwt-key"),
        apiToken: formData.get("api-token"),
        adminEmail: formData.get("admin-email"),
        adminPassword: formData.get("admin-password"),
        adminFirstname: formData.get("admin-firstname"),
        adminLastname: formData.get("admin-lastname"),
      }),
    });

    await router.push("/");
  };

  return (
    <>
      {!loader ? (
        <div className="shiftcronicles-installer min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <LanguageSwitcher />
          <div className="shiftcronicles-installer__form-container mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <form onSubmit={submit}>
              <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {t("installerTitle")}
              </h1>
              <div className="form-group my-8">
                <h3 className="text-xl font-bold mt-6 mb-6">
                  {t("databaseConfig")}
                </h3>
                <label
                  htmlFor="db-username"
                  className="text-gray-700 font-semibold block mb-2"
                >
                  {t("dbUsername")}
                </label>
                <input
                  name="db-username"
                  type="text"
                  required
                  className="w-full border border-gray-400 p-2 rounded"
                />
                <label
                  htmlFor="db-password"
                  className="text-gray-700 font-semibold block mb-2"
                >
                  {t("dbPassword")}
                </label>
                <input
                  name="db-password"
                  type="password"
                  required
                  className="w-full border border-gray-400 p-2 rounded"
                />
                <label
                  htmlFor="db-name"
                  className="text-gray-700 font-semibold block mb-2"
                >
                  {t("dbName")}
                </label>
                <input
                  name="db-name"
                  type="text"
                  required
                  className="w-full border border-gray-400 p-2 rounded"
                />
                <label
                  htmlFor="db-host"
                  className="text-gray-700 font-semibold block mb-2"
                >
                  {t("dbHost")}
                </label>
                <input
                  name="db-host"
                  type="text"
                  required
                  className="w-full border border-gray-400 p-2 rounded"
                />
                <label
                  htmlFor="db-dialect"
                  className="text-gray-700 font-semibold block mb-2"
                >
                  {t("dbDialect")}
                </label>
                <select
                  id="db-dialect"
                  name="db-dialect"
                  className="w-full border border-gray-400 p-2 rounded cursor-pointer"
                >
                  <option value="mariadb">{t("dbDialectOptionMaria")}</option>
                  <option value="postgres">
                    {t("dbDialectOptionPostgre")}
                  </option>
                </select>
              </div>
              <div className="form-group">
                <h3 className="text-xl font-bold mt-6 mb-6">
                  {t("adminTitle")}
                </h3>
                <label
                  htmlFor="admin-email"
                  className="text-gray-700 font-semibold block mb-2"
                >
                  {t("adminEmail")}
                </label>
                <input
                  name="admin-email"
                  type="text"
                  required
                  className="w-full border border-gray-400 p-2 rounded"
                />
                <label
                  htmlFor="admin-password"
                  className="text-gray-700 font-semibold block mb-2"
                >
                  {t("adminPassword")}
                </label>
                <input
                  name="admin-password"
                  type="password"
                  required
                  className="w-full border border-gray-400 p-2 rounded"
                />
                <label
                  htmlFor="admin-firstname"
                  className="text-gray-700 font-semibold block mb-2"
                >
                  {t("adminFirstname")}
                </label>
                <input
                  name="admin-firstname"
                  type="text"
                  required
                  className="w-full border border-gray-400 p-2 rounded"
                />
                <label
                  htmlFor="admin-lastname"
                  className="text-gray-700 font-semibold block mb-2"
                >
                  {t("adminLastname")}
                </label>
                <input
                  name="admin-lastname"
                  type="text"
                  required
                  className="w-full border border-gray-400 p-2 rounded"
                />
              </div>
              <div className="form-group">
                <h3 className="text-xl font-bold mt-6 mb-6">
                  {t("apiConfig")}
                </h3>
                <label
                  htmlFor="frontend-url"
                  className="text-gray-700 font-semibold block mb-2"
                >
                  {t("frontendUrl")}
                </label>
                <input
                  name="frontend-url"
                  type="text"
                  required
                  className="w-full border border-gray-400 p-2 rounded"
                />
                <p className="mt-2 mb-4 text-sm text-gray-600 max-w">
                  {t("smtpText")}
                </p>
                <label
                  htmlFor="smtp-host"
                  className="text-gray-700 font-semibold block mb-2"
                >
                  {t("smtpHost")}
                </label>
                <input
                  name="smtp-host"
                  type="text"
                  required
                  className="w-full border border-gray-400 p-2 rounded"
                />
                <label
                  htmlFor="smtp-email"
                  className="text-gray-700 font-semibold block mb-2"
                >
                  {t("smtpEmail")}
                </label>
                <input
                  name="smtp-email"
                  type="text"
                  required
                  className="w-full border border-gray-400 p-2 rounded"
                />
                <label
                  htmlFor="smtp-password"
                  className="text-gray-700 font-semibold block mb-2"
                >
                  {t("smtpPassword")}
                </label>
                <input
                  name="smtp-password"
                  type="password"
                  required
                  className="w-full border border-gray-400 p-2 rounded"
                />
                <label
                  htmlFor="jwt-key"
                  className="text-gray-700 font-semibold block mb-2"
                >
                  {t("jwtKey")}
                </label>
                <input
                  name="jwt-key"
                  type="text"
                  required
                  className="w-full border border-gray-400 p-2 rounded"
                />
                <label
                  htmlFor="api-token"
                  className="text-gray-700 font-semibold block mb-2"
                >
                  {t("apiToken")}
                </label>
                <input
                  name="api-token"
                  type="text"
                  required
                  className="w-full border border-gray-400 p-2 rounded"
                />
              </div>
              <div className="submit-btn">
                <button
                  className="btn inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-6 mb-6"
                  type="submit"
                >
                  {t("installerSubmit")}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Installer;
