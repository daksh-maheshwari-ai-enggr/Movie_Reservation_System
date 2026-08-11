import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = ({ switchTab }) => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const result = await login(formData);

    if (!result.success) {
      setError(result.message);
      return;
    }

    // Admin → Direct Dashboard
    if (result.user.role === "Admin") {
      navigate("/admin");
      return;
    }

    // Member → Login Success Page
    navigate("/login-success");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email */}
      <div>
        <label className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-[#8E89B4]">
          Email Address
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          required
          className="w-full rounded-lg border border-[#2D2944] bg-[#171621] px-4 py-3 text-sm text-white outline-none transition focus:border-[#D4A02A]"
        />
      </div>

      {/* Password */}
      <div>
        <label className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-[#8E89B4]">
          Password
        </label>

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
          className="w-full rounded-lg border border-[#2D2944] bg-[#171621] px-4 py-3 text-sm text-white outline-none transition focus:border-[#D4A02A]"
        />
      </div>

      {error && (
        <p className="text-sm text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-[#D4A02A] py-3 text-base font-semibold text-black transition hover:opacity-90"
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
};

export default Login;