import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
window.history.scrollRestoration = "manual";
if (window.location.hash) {
  window.history.replaceState(
    window.history.state,
    "",
    window.location.pathname + window.location.search,
  );
}
const openAtTop = () => window.scrollTo({ top: 0, behavior: "instant" });
openAtTop();
window.addEventListener("pageshow", openAtTop);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
