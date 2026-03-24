import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Mail, Lock } from "lucide-react";
import { FaGoogle, FaApple, FaFacebookF } from "react-icons/fa";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/register", {
        name,
        email,
        password
      });

      alert(res.data.message);

      navigate("/login");

    } catch (error) {

      alert(error.response?.data?.message || "Register failed");

    } finally {

      setLoading(false);

    }

  };

  return (
    <div
      className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-400
      relative overflow-hidden"
    >

      <div
        className="absolute inset-0 opacity-10 
        bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] 
        bg-[length:20px_20px]"
      />

      <div className="relative w-[460px] px-10 py-12 text-white">

        <div className="flex items-center gap-3 mb-6">
          <div className="text-4xl">⚡</div>
          <div>
            <h1 className="text-2xl font-semibold">Register</h1>
            <p className="text-sm opacity-90">
              Create an account to get started
            </p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* NAME */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md 
              text-black bg-white focus:outline-none 
              focus:ring-2 focus:ring-black"
            />
          </div>

          {/* EMAIL */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md 
              text-black bg-white focus:outline-none 
              focus:ring-2 focus:ring-black"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 rounded-md 
              text-black bg-white focus:outline-none 
              focus:ring-2 focus:ring-black"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2.5 rounded-md 
            hover:bg-gray-800 transition font-medium"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        {/* SOCIAL LOGIN */}
        <div className="flex justify-center gap-4 mt-6 text-xl">
          <FaGoogle className="cursor-pointer hover:scale-110 transition"/>
          <FaApple className="cursor-pointer hover:scale-110 transition"/>
          <FaFacebookF className="cursor-pointer hover:scale-110 transition"/>
        </div>

      </div>
    </div>
  );

}

export default Register;