function Seat({ seat, status, onClick }) {
  const colors = {
    available: "bg-[#4A4764] hover:bg-[#5E5A7A]",
    selected: "bg-[#D4A62A]",
    reserved: "bg-[#1A1828]",
    blocked: "bg-[#6C2F45]",
  };

  return (
    <button
      title={`${seat.id} • ${seat.category} • $${seat.price}`}
      onClick={onClick}
      className={`w-8 h-8 rounded-lg border border-[#67627F] transition-all duration-200 hover:scale-110 ${colors[status]}`}
    />
  );
}

export default Seat;