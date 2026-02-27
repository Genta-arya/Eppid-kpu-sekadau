import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import LocationModal from "./LocationModal";

const ProtectedRoute = ({ children }) => {
  const [permission, setPermission] = useState(null);

  // ✅ Generate / ambil device_id
  const getDeviceId = () => {
    let deviceId = localStorage.getItem("device_id");

    if (!deviceId) {
      deviceId = uuidv4();
      localStorage.setItem("device_id", deviceId);
    }

    return deviceId;
  };

  const checkPermission = async () => {
    if (!navigator.permissions) {
      setPermission("prompt");
      return;
    }

    try {
      const result = await navigator.permissions.query({
        name: "geolocation",
      });

      setPermission(result.state);

      result.onchange = () => {
        setPermission(result.state);
      };
    } catch (err) {
      setPermission("prompt");
    }
  };

  const getIPAddress = async () => {
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      return data.ip;
    } catch (error) {
      console.error("Gagal ambil IP:", error);
      return null;
    }
  };

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const userAgent = navigator.userAgent;
        const ip = await getIPAddress();
        const deviceId = getDeviceId();

        const payload = {
          device_id: deviceId,
          latitude,
          longitude,
          user_agent: userAgent,
          ip_address: ip,
          timestamp: new Date().toISOString(),
        };

        console.log("Tracking Payload:", payload);

        // 🔥 Kalau mau kirim ke backend tinggal fetch POST di sini
      },
      (error) => {
        console.error("Gagal ambil lokasi:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    checkPermission();
  }, []);

  useEffect(() => {
    if (permission === "granted") {
      getLocation();
    }
  }, [permission]);

  if (permission === null) return null;

  if (permission !== "granted") {
    return <LocationModal refreshPermission={checkPermission} />;
  }

  return children;
};

export default ProtectedRoute;