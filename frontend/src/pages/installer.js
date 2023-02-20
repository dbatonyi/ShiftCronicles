import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
const config = require("../../config");

const Installer = () => {
  const router = useRouter();

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const apiMaintenanceCheck = async () => {
      try {
        const data = await fetch(`${config.serverUrl}/api/maintenance-mode`, {
          credentials: "include",
        });
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
              <h1>App configuration</h1>
              <div className="form-group">
                <h3>Database config:</h3>
                <label htmlFor="db-username">DB Username</label>
                <input name="db-username" type="text" required />
                <label htmlFor="db-password">DB Password</label>
                <input name="db-password" type="password" required />
                <label htmlFor="db-name">Database name</label>
                <input name="db-name" type="text" required />
                <label htmlFor="db-host">Host name</label>
                <input name="db-host" type="text" required />
                <label htmlFor="db-dialect">Dialect</label>
                <select id="db-dialect" name="db-dialect">
                  <option value="mariadb">MariaDB</option>
                  <option value="postgres">PostgreSQL</option>
                </select>
              </div>
              <div className="form-group">
                <h3>API config:</h3>
                <label htmlFor="frontend-url">Frontend URL</label>
                <input name="frontend-url" type="text" required />
                <p>Currently only yahoo account is allowed!</p>
                <label htmlFor="smtp-host">SMTP Host</label>
                <input name="smtp-host" type="text" required />
                <label htmlFor="smtp-email">SMTP Email</label>
                <input name="smtp-email" type="text" required />
                <label htmlFor="smtp-password">SMTP Password</label>
                <input name="smtp-password" type="password" required />
                <label htmlFor="jwt-key">JWT Key</label>
                <input name="jwt-key" type="text" required />
                <label htmlFor="api-token">API Token</label>
                <input name="api-token" type="text" required />
              </div>
              <div className="submit-btn">
                <button className="btn" type="submit">
                  Submit
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
