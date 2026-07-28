const Hero = () => {
  return (
    <section
      className="relative border-b border-[#242230]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(11,10,16,0.78), rgba(11,10,16,0.82)), url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1800&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-7xl px-7 pt-16 pb-14">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#D4A02A]">
          NOW SHOWING
        </p>

        <h1 className="max-w-2xl text-5xl font-bold leading-tight text-white md:text-6xl">
          This Week's Films
        </h1>
      </div>
    </section>
  );
};

export default Hero;