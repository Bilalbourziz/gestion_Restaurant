"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Use the correct import for App Router
import axios from "axios";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false); // To check if we are on the client side

  const router = useRouter(); // Use router from next/navigation for App Router

  // Ensure that this is only running on the client side
  useEffect(() => {
    setIsClient(true); // Set isClient to true after component mounts
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
        { email, password },
        { withCredentials: true }
      );

      if (response.data.status) {
        Cookies.set("token", response.data.token, { expires: 7 });
        toast.success("Connexion réussie !");
        router.push("/Dashboard/table_bord");
      } else {
        setError(response.data.message || "Identifiants incorrects !");
        toast.error("Identifiants incorrects !");
      }
    } catch (err) {
      setError("Erreur de connexion !");
      toast.error("Erreur de connexion !");
    }
  };

  // Return nothing during SSR to prevent the router error
  if (!isClient) {
    return null; // This ensures we don't try to use router on server side
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Head>
        <title>Login</title>
      </Head>

      <Toaster />

      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-600">
              <div className="flex items-center justify-center h-full">
                <span className="text-white font-bold text-3xl">M</span>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 flex items-center justify-between rounded bg-red-600 text-white text-sm">
            <span>{error}</span>
            <button onClick={() => setError("")} className="focus:outline-none">
              <span className="text-xl">&times;</span>
            </button>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <Link
              href="/forgot-password"
              className="text-sm text-pink-600 hover:underline"
            >
              Mot de passe oublié?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-pink-600 text-white font-medium hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
          >
            CONNEXION
          </button>
        </form>
      </div>
    </div>
  );
}
