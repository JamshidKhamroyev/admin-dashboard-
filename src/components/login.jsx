import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import { BiLoader } from "react-icons/bi";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoad(true)
    try {
        const { data } = await axios.post(`https://fakestoreapi.com/auth/login`, { username, password })
        localStorage.setItem("token", data?.token)
        window.location.reload()
    } catch (error) {
        toast.error(`Error: ${error.response.data}`)
    }finally {
      setLoad(false)
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-[#010112]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#0d0d1a] p-8 rounded-2xl shadow-xl w-full max-w-sm space-y-6"
      >
        <h2 className="text-white text-2xl font-bold text-center">🔐 Login</h2>

        <div className="flex flex-col relative">
          <label className="text-sm text-gray-300 mb-1" htmlFor="username">
            Username
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <FaEnvelope />
            </span>
            <input
              type="text"
              id="email"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#1a1a2e] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3f51b5]"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex flex-col relative">
          <label className="text-sm text-gray-300 mb-1" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <FaLock />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full pl-10 pr-10 py-3 rounded-lg bg-[#1a1a2e] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3f51b5]"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-[#3f51b5] hover:bg-[#5c6bc0] text-white font-semibold py-3 rounded-lg transition duration-300"
        >
            Log in
            {load && <BiLoader className="h-5 w-5 animate-spin"/>}
        </button>
      </form>
    </div>
  );
};

export default Login;
