import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { PostAnalytic } from "../Service/Api/Analytic.api";

const TWO_HOURS = 2 * 60 * 60 * 1000;

const ProtectedRoute = ({ children }) => {
  const isSessionActive = () => {
    const storedData = localStorage.getItem("device_data");
    if (!storedData) return false;

    try {
      const parsed = JSON.parse(storedData);
      const now = Date.now();
      return now - parsed.createdAt < TWO_HOURS;
    } catch {
      return false;
    }
  };

  const createNewSession = () => {
    const newDeviceId = uuidv4();

    localStorage.setItem(
      "device_data",
      JSON.stringify({
        deviceId: newDeviceId,
        createdAt: Date.now(),
      }),
    );

    return newDeviceId;
  };

  const getIPAddress = async () => {
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      return data.ip;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    if (isSessionActive()) return;

    const deviceId = createNewSession();

    const sendTracking = async (latitude = null, longitude = null) => {
      const payload = {
        device_id: deviceId,
        latitude,
        longitude,
        userAgent: navigator.userAgent,
        ip: await getIPAddress(),
        timestamp: new Date().toISOString(),
      };

      await PostAnalytic(payload);
    };

    if (!navigator.geolocation) {
      sendTracking(null, null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        sendTracking(position.coords.latitude, position.coords.longitude);
      },
      () => {
        sendTracking(null, null);
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
      },
    );
  }, []);

  return children;
};

export default ProtectedRoute;
