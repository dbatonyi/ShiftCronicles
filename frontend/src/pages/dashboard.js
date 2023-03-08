import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../layouts/Layout";

const configData = require("../../config");

const Dashboard = (props) => {
  const { setStatusMessage, userInfo } = useContext(AuthContext);

  const [isChecked, setIsChecked] = useState(false);

  const attendance = async () => {
    const response = await fetch(
      `${configData.serverUrl}/api/attendance/${userInfo.uuid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authenticate: `Bearer ${configData.apiToken}`,
        },
        credentials: "include",
      }
    );
    const data = await response.json();

    if (response.status === 200) {
      setRefresh(!refresh);
      setStatusMessage(data.message);
    } else {
      console.log("Error");
    }
  };

  const handleToggle = () => {
    setIsChecked(!isChecked);
    attendance();
  };

  return (
    <div className="shiftcronicles-dashboard min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="shiftcronicles-dashboard__container mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Dashboard
        </h1>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleToggle}
            value=""
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Toggle me
          </span>
        </label>
      </div>
    </div>
  );
};

export default Dashboard;
