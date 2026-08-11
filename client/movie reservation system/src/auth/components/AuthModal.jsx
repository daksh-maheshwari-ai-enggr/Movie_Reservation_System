import { useState } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";

const AuthModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("login");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-[400px] rounded-2xl border border-[#2A2740] bg-[#12111A] p-6 shadow-2xl">

        {/* Heading */}
        <h1 className="mb-6 font-display text-3xl font-semibold text-white">
          {activeTab === "login" ? "Sign In" : "Create Account"}
        </h1>

        {/* Tabs */}
        <div className="mb-6 flex overflow-hidden rounded-lg border border-[#34304C]">
          <button
            onClick={() => setActiveTab("login")}
            className={`w-1/2 py-2.5 text-base font-semibold transition-all ${
              activeTab === "login"
                ? "bg-[#D4A02A] text-black"
                : "bg-transparent text-[#9C96C8]"
            }`}
          >
            Sign In
          </button>

          <button
            onClick={() => setActiveTab("register")}
            className={`w-1/2 py-2.5 text-base font-semibold transition-all ${
              activeTab === "register"
                ? "bg-[#D4A02A] text-black"
                : "bg-transparent text-[#9C96C8]"
            }`}
          >
            Register
          </button>
        </div>

        {/* Forms */}
        {activeTab === "login" ? (
          <Login switchTab={() => setActiveTab("register")} />
        ) : (
          <Register switchTab={() => setActiveTab("login")} />
        )}

        {/* Cancel */}
        <button
          onClick={onClose}
          className="mt-6 w-full text-base text-[#8F89B3] transition hover:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AuthModal;