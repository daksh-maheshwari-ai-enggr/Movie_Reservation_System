import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import css from "./styles.css?raw";

const style = document.createElement("style");
style.textContent = css;
document.head.appendChild(style);

createRoot(document.getElementById("root")).render(<App />);
