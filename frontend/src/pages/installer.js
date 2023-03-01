import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
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

        if (!response.ok) {
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
        <div className="shiftcronicles-installer">
          <div className="shiftcronicles-installer__form-container">
            <form onSubmit={submit}>
              <h1>{t("installerTitle")}</h1>
              <div className="form-group">
                <h3>{t("databaseConfig")}</h3>
                <label htmlFor="db-username">{t("dbUsername")}</label>
                <input name="db-username" type="text" required />
                <label htmlFor="db-password">{t("dbPassword")}</label>
                <input name="db-password" type="password" required />
                <label htmlFor="db-name">{t("dbName")}</label>
                <input name="db-name" type="text" required />
                <label htmlFor="db-host">{t("dbHost")}</label>
                <input name="db-host" type="text" required />
                <label htmlFor="db-dialect">{t("dbDialect")}</label>
                <select id="db-dialect" name="db-dialect">
                  <option value="mariadb">{t("dbDialectOptionMaria")}</option>
                  <option value="postgres">
                    {t("dbDialectOptionPostgre")}
                  </option>
                </select>
              </div>
              <div className="form-group">
                <h3>{t("adminTitle")}</h3>
                <label htmlFor="admin-email">{t("adminEmail")}</label>
                <input name="admin-email" type="text" required />
                <label htmlFor="admin-password">{t("adminPassword")}</label>
                <input name="admin-password" type="password" required />
                <label htmlFor="admin-firstname">{t("adminFirstname")}</label>
                <input name="admin-firstname" type="text" required />
                <label htmlFor="admin-lastname">{t("adminLastname")}</label>
                <input name="admin-lastname" type="text" required />
              </div>
              <div className="form-group">
                <h3>{t("apiConfig")}</h3>
                <label htmlFor="frontend-url">{t("frontendUrl")}</label>
                <input name="frontend-url" type="text" required />
                <p>{t("smtpText")}</p>
                <label htmlFor="smtp-host">{t("smtpHost")}</label>
                <input name="smtp-host" type="text" required />
                <label htmlFor="smtp-email">{t("smtpEmail")}</label>
                <input name="smtp-email" type="text" required />
                <label htmlFor="smtp-password">{t("smtpPassword")}</label>
                <input name="smtp-password" type="password" required />
                <label htmlFor="jwt-key">{t("jwtKey")}</label>
                <input name="jwt-key" type="text" required />
                <label htmlFor="api-token">{t("apiToken")}</label>
                <input name="api-token" type="text" required />
              </div>
              <div className="submit-btn">
                <button className="btn" type="submit">
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
