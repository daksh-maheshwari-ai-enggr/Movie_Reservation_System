import { Clock } from "lucide-react";

function HoldTimer() {
  return (
    <div className="flex justify-end mb-6">
      <div className="flex items-center gap-2 border border-[#5B4720] bg-[#1B1612] text-[#D4A62A] px-5 py-3 rounded-xl">
        <Clock size={18} />
        <span className="font-medium">
          Seats held for <strong>09:41</strong>
        </span>
      </div>
    </div>
  );
}

export default HoldTimer;