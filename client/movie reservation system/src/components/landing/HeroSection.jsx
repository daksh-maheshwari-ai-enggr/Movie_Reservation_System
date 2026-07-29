function HeroSection() {
  return (
    <section
      className="relative h-[280px] overflow-hidden border-b border-[#26223A]"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1800')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#090811]/80"></div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#090811] via-[#090811]/60 to-transparent"></div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-between px-8">

        {/* Left Side */}
        <div>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[6px] text-[#D4AF37]">
            NOW SHOWING
          </p>

          <h1
            className="text-6xl font-black leading-none text-white"
            style={{
              fontFamily: "Georgia, serif",
            }}
          >
            This Week's
            <br />
            Films
          </h1>

        </div>

        {/* Right side left empty for now.
            Later we'll add the poster collage exactly like the Figma */}
        <div className="hidden lg:block w-[420px]"></div>

      </div>
    </section>
  );
}

export default HeroSection;