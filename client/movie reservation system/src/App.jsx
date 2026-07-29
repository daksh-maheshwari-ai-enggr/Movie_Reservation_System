import { BrowserRouter, Routes, Route } from "react-router-dom";
import SeatReservation from "./pages/SeatReservation";
import OrderSummary from "./pages/OrderSummary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SeatReservation />} />
        <Route path="/order-summary" element={<OrderSummary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;