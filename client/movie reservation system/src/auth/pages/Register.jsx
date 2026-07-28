import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Register = ({ switchTab }) => {
  const { register, loading } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [role, setRole] = useState("Member");
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

    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: "",
      address: "",
      role,
    });

    if (!result.success) {
      setError(result.message);
      return;
    }

    alert("Registration successful!");
    switchTab();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">

      <div>
        <label className="mb-1 block text-xs uppercase tracking-[0.22em] text-[#8E89B4]">
          Full Name
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
          className="w-full rounded-lg border border-[#2D2944] bg-[#171621] px-4 py-3 text-sm text-white outline-none transition focus:border-[#D4A02A]"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs uppercase tracking-[0.22em] text-[#8E89B4]">
          Email Address
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          className="w-full rounded-lg border border-[#2D2944] bg-[#171621] px-4 py-3 text-sm text-white outline-none transition focus:border-[#D4A02A]"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs uppercase tracking-[0.22em] text-[#8E89B4]">
          Password
        </label>

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
          required
          className="w-full rounded-lg border border-[#2D2944] bg-[#171621] px-4 py-3 text-sm text-white outline-none transition focus:border-[#D4A02A]"
        />
      </div>

      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-[#8E89B4]">
          Account Role
        </label>

        <div className="grid grid-cols-2 gap-3">

          <button
            type="button"
            onClick={() => setRole("Member")}
            className={`rounded-lg border py-3 text-sm font-semibold transition ${
              role === "Member"
                ? "border-[#D4A02A] bg-[#D4A02A] text-black"
                : "border-[#2D2944] bg-[#171621] text-white hover:border-[#D4A02A]"
            }`}
          >
            Member
          </button>

          <button
            type="button"
            onClick={() => setRole("Administrator")}
            className={`rounded-lg border py-3 text-sm font-semibold transition ${
              role === "Administrator"
                ? "border-[#D4A02A] bg-[#D4A02A] text-black"
                : "border-[#2D2944] bg-[#171621] text-white hover:border-[#D4A02A]"
            }`}
          >
            Administrator
          </button>

        </div>
      </div>

      {error && (
        <p className="text-sm text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-[#D4A02A] py-3 text-base font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Creating..." : "Create Account"}
      </button>

    </form>
  );
};

export default Register;