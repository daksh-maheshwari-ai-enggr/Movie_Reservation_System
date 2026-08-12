import { useEffect, useState } from "react";
import { call } from "../utils/api.js";

const fmt = (d) =>
  new Date(d).toLocaleString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

const money = (n) => `$${Number(n || 0).toFixed(2)}`;

export default function SummaryPage({ showtime, order, user, setPage, setBooking }) {
  const [remaining, setRemaining] = useState(0);
  const [busy, setBusy] = useState(false);
  const [payment, setPayment] = useState({
    number: "",
    holder: user.name,
    expiry: "",
    cvv: "",
  });
  const [paymentError, setPaymentError] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining(
        Math.max(0, Math.ceil((new Date(order.expiresAt) - Date.now()) / 1000)),
      );
    }, 500);
    return () => clearInterval(timer);
  }, [order.expiresAt]);

  const subtotal = order.labels.length * showtime.price;
  const fee = +(subtotal * 0.05).toFixed(2);

  const pay = async () => {
    const digits = payment.number.replace(/\D/g, "");
    if (
      digits.length < 12 ||
      !payment.holder.trim() ||
      !/^\d{2}\/\d{2}$/.test(payment.expiry) ||
      payment.cvv.length < 3
    ) {
      setPaymentError(
        "Enter a valid card number, cardholder name, expiry date and CVV.",
      );
      return;
    }

    setBusy(true);
    try {
      const confirmed = await call("/bookings/confirm", {
        token: user.token,
        method: "POST",
        body: JSON.stringify({
          showtimeId: showtime._id,
          labels: order.labels,
          last4: digits.slice(-4),
        }),
      });
      setBooking(confirmed);
      setPage("confirmed");
    } catch (error) {
      alert(error.message);
      setPage("seats");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="summary">
      <h1>Order Summary</h1>
      <div className="hold">
        ◷ Seats held for {String(Math.floor(remaining / 60)).padStart(2, "0")}:
        {String(remaining % 60).padStart(2, "0")}
      </div>
      <section className="card">
        <div className="summaryfilm">
          <img src={showtime.movie.posterUrl} alt={showtime.movie.title} />
          <div>
            <h2>{showtime.movie.title}</h2>
            <p>
              {showtime.theater.name}
              <br />
              {fmt(showtime.startsAt)}
            </p>
          </div>
        </div>
        <hr />
        <p>
          Seats <b>{order.labels.join(", ")}</b>
        </p>
        <p>
          {order.labels.length} × {money(showtime.price)} <b>{money(subtotal)}</b>
        </p>
        <p>
          Service fee (5%) <b>{money(fee)}</b>
        </p>
        <hr />
        <h3>
          Total <em>{money(subtotal + fee)}</em>
        </h3>
      </section>
      <section className="payment">
        <div className="payment-card">
          <span>PAYMENT CARD</span>
          <strong>
            {payment.number
              ? payment.number.replace(/\d(?=\d{4})/g, "•")
              : "••••  ••••  ••••  ••••"}
          </strong>
          <div>
            <small>
              Card Holder<b>{payment.holder || "YOUR NAME"}</b>
            </small>
            <small>
              Expires<b>{payment.expiry || "MM/YY"}</b>
            </small>
          </div>
        </div>
        <label>
          Card number
          <input
            inputMode="numeric"
            maxLength="19"
            placeholder="1234 5678 9012 3456"
            value={payment.number}
            onChange={(e) =>
              setPayment({
                ...payment,
                number: e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim(),
              })
            }
          />
        </label>
        <label>
          Cardholder name
          <input
            placeholder="Your name"
            value={payment.holder}
            onChange={(e) => setPayment({ ...payment, holder: e.target.value })}
          />
        </label>
        <div className="payment-row">
          <label>
            Expiry (MM/YY)
            <input
              placeholder="08/27"
              maxLength="5"
              value={payment.expiry}
              onChange={(e) =>
                setPayment({
                  ...payment,
                  expiry: e.target.value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2"),
                })
              }
            />
          </label>
          <label>
            CVV
            <input
              type="password"
              inputMode="numeric"
              maxLength="4"
              placeholder="•••"
              value={payment.cvv}
              onChange={(e) =>
                setPayment({ ...payment, cvv: e.target.value.replace(/\D/g, "") })
              }
            />
          </label>
        </div>
        <div className="payment-note">
          🔒 Payments are end-to-end encrypted and processed securely.
          <br />
          (Demo — no real charge.)
        </div>
        {paymentError && <p className="error">{paymentError}</p>}
        <button className="gold wide" disabled={busy || remaining === 0} onClick={pay}>
          {busy ? "Processing…" : "Pay & Confirm Booking"}
        </button>
      </section>
    </main>
  );
}
