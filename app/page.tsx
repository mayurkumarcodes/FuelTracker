// pages/index.js
"use client";

import { useState } from "react";
import Auth from "./components/Auth";
import FuelLog from "./components/FUELLOG";

export default function Home() {
  const [authSuccess, setAuthSuccess] = useState(false);

  const handleAuthSuccess = () => {
    setAuthSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {authSuccess ? <FuelLog /> : <Auth onAuthSuccess={handleAuthSuccess} />}
    </div>
  );
}
