// components/Auth.js
"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Auth({ onAuthSuccess }) {
  const [email, setEmail] = useState("mayurkmrp@gmail.com");
  const [password, setPassword] = useState("M@yurkmrp1");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        alert(error.message);
      } else {
        onAuthSuccess();
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        alert(error.message);
      } else {
        alert("Sign up successful! Please check your email.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 mt-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 mt-4 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-blue-600 text-white rounded"
          disabled={loading}
        >
          {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <button
        className="mt-4 text-blue-600"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin
          ? "Don't have an account? Sign Up"
          : "Already have an account? Log In"}
      </button>
    </div>
  );
}
