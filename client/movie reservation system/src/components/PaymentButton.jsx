function PaymentButton() {
  return (
    <div className="mt-8 flex justify-end">
      <button
        className="bg-[#D4A62A] hover:bg-[#E3B532] transition-all duration-300
                   text-black font-semibold text-lg
                   px-8 py-4 rounded-xl shadow-lg"
      >
        Proceed to Payment →
      </button>
    </div>
  );
}

export default PaymentButton;