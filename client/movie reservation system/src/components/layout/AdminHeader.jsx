import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthContext";

export function AdminHeader() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="border-b border-[#252536] bg-[#0a0a12]">
      <div className="flex min-h-[97px] items-center justify-between gap-7 px-5 sm:px-9 lg:px-12">
        <button
          onClick={() => navigate("/")}
          className="font-display text-2xl font-bold tracking-[-0.06em] sm:text-3xl"
        >
          <span className="text-[#d69b22]">CINÉ</span>
          <span>VAULT</span>
        </button>

        <nav className="hidden items-center gap-10 text-lg text-[#9b99bd] md:flex">
          <button
            onClick={() => navigate("/")}
            className="hover:text-[#f6f3eb]"
          >
            Films
          </button>

          <button
            onClick={() => navigate("/")}
            className="hover:text-[#f6f3eb]"
          >
            My Bookings
          </button>

          <button className="text-[#d69b22]">
            Admin
          </button>
        </nav>

        <div className="ml-auto hidden items-center gap-4 text-right sm:flex">
          <div>
            <p className="font-semibold">
              {user?.name || "Administrator"}
            </p>
            <p className="text-sm text-[#9997ba]">
              {user?.role || "Administrator"}
            </p>
          </div>

          <span className="rounded border border-[#634511] bg-[#20190e] px-3 py-1 text-sm font-medium text-[#d69b22]">
            ADMIN
          </span>

          <button
            onClick={handleLogout}
            className="text-lg text-[#9b99bd] hover:text-white"
          >
            Sign out
          </button>
        </div>

        <button
          className="sm:hidden text-[#d69b22]"
          aria-label="Open navigation"
        >
          ☰
        </button>
      </div>
    </header>
  );
}