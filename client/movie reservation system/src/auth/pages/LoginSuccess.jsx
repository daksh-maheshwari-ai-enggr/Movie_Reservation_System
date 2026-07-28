import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginSuccess = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user?.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate, user]);

  return (
    <div className="min-h-screen bg-[#0E0D13] flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-[#2D2944] bg-[#171621] p-10 text-center shadow-2xl">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#D4A02A] text-4xl font-bold text-black">
          ✓
        </div>

        <h1 className="mt-6 text-3xl font-bold text-white">
          Login Successful
        </h1>

        <p className="mt-3 text-[#B6B2D4]">
          Welcome back!
        </p>

        <p className="mt-2 text-sm text-[#8E89B4]">
          Redirecting to your dashboard...
        </p>

        <button
          onClick={() => navigate("/login")}
          className="mt-8 w-full rounded-lg border border-[#D4A02A] py-3 text-[#D4A02A] transition hover:bg-[#D4A02A] hover:text-black"
        >
          Back to Sign In
        </button>
      </div>
    </div>
  );
};

export default LoginSuccess;