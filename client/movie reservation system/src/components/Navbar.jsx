const Navbar = ({ onSignIn }) => {
  return (
    <header className="border-b border-[#242230] bg-[#0B0A10]">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center px-7">

        {/* Logo */}
        <h1 className="text-[31px] font-bold tracking-tight">
          <span className="text-[#D4A02A]">CINÉ</span>
          <span className="text-white">VAULT</span>
        </h1>

        {/* Films */}
        <button className="ml-14 text-[17px] font-medium text-[#D4A02A] transition hover:text-[#E6B447]">
          Films
        </button>

        {/* Sign In */}
        <button
          onClick={onSignIn}
          className="ml-auto rounded-lg bg-[#D4A02A] px-6 py-2.5 text-[16px] font-semibold text-black transition hover:brightness-110"
        >
          Sign In
        </button>

      </div>
    </header>
  );
};

export default Navbar;