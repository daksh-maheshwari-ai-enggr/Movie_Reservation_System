function Navbar() {
  return (
    <header className="border-b border-[#252238] bg-[#0B0913]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        {/* Logo */}
        <div>
          <h1 className="text-3xl font-bold tracking-[0.2em]">
            <span className="text-[#D6A53A]">CINÉ</span>
            <span className="text-white">VAULT</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-10">
          <button className="text-[#D6A53A] font-medium">
            Films
          </button>

          <button className="text-[#8E8AAB] hover:text-white transition">
            My Bookings
          </button>
        </nav>

        {/* User */}
        <div className="text-right">
          <p className="font-semibold">
            Alex Rivera
          </p>

          <p className="text-sm text-[#8E8AAB]">
            Member
          </p>

          <button className="text-sm text-[#D6A53A] hover:underline">
            Sign Out
          </button>
        </div>

      </div>
    </header>
  );
}

export default Navbar;