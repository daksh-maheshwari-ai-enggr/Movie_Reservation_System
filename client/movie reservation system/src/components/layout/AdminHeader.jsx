export function AdminHeader() {
  return (
    <header className="border-b border-[#252536] bg-[#0a0a12]">
      <div className="flex min-h-[97px] items-center justify-between gap-7 px-5 sm:px-9 lg:px-12">
        <a href="#home" className="font-display text-2xl font-bold tracking-[-0.06em] sm:text-3xl"><span className="text-[#d69b22]">CINÉ</span><span>VAULT</span></a>
        <nav className="hidden items-center gap-10 text-lg text-[#9b99bd] md:flex">
          <a href="#films" className="hover:text-[#f6f3eb]">Films</a><a href="#bookings" className="hover:text-[#f6f3eb]">My Bookings</a><a href="#admin" className="text-[#d69b22]">Admin</a>
        </nav>
        <div className="ml-auto hidden items-center gap-4 text-right sm:flex">
          <div><p className="font-semibold">Morgan Adeyemi</p><p className="text-sm text-[#9997ba]">Administrator</p></div>
          <span className="rounded border border-[#634511] bg-[#20190e] px-3 py-1 text-sm font-medium text-[#d69b22]">ADMIN</span>
          <button className="text-lg text-[#9b99bd] hover:text-white">Sign out</button>
        </div>
        <button className="sm:hidden text-[#d69b22]" aria-label="Open navigation">☰</button>
      </div>
    </header>
  )
}
