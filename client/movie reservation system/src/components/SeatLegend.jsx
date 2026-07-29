function SeatLegend() {
  const legends = [
    {
      label: "Available",
      color: "bg-[#4A4764]",
    },
    {
      label: "Selected",
      color: "bg-[#D4A62A]",
    },
    {
      label: "Reserved",
      color: "bg-[#1A1828]",
    },
    {
      label: "Blocked",
      color: "bg-[#6C2F45]",
    },
  ];

  return (
    <div className="mt-10 flex justify-center">
      <div className="flex items-center gap-10">
        {legends.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3"
          >
            <div
              className={`h-7 w-7 rounded-md ${item.color}`}
            ></div>

            <span className="text-lg text-[#8E8AA9]">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeatLegend;