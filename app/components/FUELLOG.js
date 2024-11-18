// components/FuelLog.js
"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function FuelLog() {
  const [fuelAdded, setFuelAdded] = useState("");
  const [cost, setCost] = useState("");
  const [odometer, setOdometer] = useState("");
  const [user, setUser] = useState(null);

  const handleAddFuelLog = async (e) => {
    e.preventDefault();
    if (!fuelAdded || !cost || !odometer) return;

    const { error } = await supabase.from("fuel_logs").insert([
      {
        user_id: user.id,
        fuel_added: fuelAdded,
        cost: cost,
        odometer: odometer,
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Fuel log added successfully");
      setFuelAdded("");
      setCost("");
      setOdometer("");
    }
  };

  // Check for user authentication
  useEffect(() => {
    // Function to load the session on page load or refresh
    const loadSession = async () => {
      const { data: session, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error.message);
        return;
      }

      if (session?.user) {
        setUser(session.user); // If session exists, set the user
      }
    };

    loadSession();

    // Listen for changes to the session state (login, logout, etc.)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user || null); // Update user state when session changes
      }
    );

    // Cleanup by unsubscribing from the listener
    return () => {
      // `authListener` contains the unsubscribe function in Supabase v2
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {user ? (
        <>
          <h2 className="text-xl font-semibold">Add Fuel Log</h2>
          <form onSubmit={handleAddFuelLog}>
            <input
              type="number"
              placeholder="Fuel Added (L)"
              value={fuelAdded}
              onChange={(e) => setFuelAdded(e.target.value)}
              className="w-full p-2 mt-4 border border-gray-300 rounded"
            />
            <input
              type="number"
              placeholder="Cost (₹)"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="w-full p-2 mt-4 border border-gray-300 rounded"
            />
            <input
              type="number"
              placeholder="Odometer"
              value={odometer}
              onChange={(e) => setOdometer(e.target.value)}
              className="w-full p-2 mt-4 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-green-600 text-white rounded"
            >
              Add Fuel Log
            </button>
          </form>
        </>
      ) : (
        <p>Please log in to add a fuel log</p>
      )}
    </div>
  );
}
