import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { TopButton } from "./GoTop.styles";

export default function GoTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 300);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  if (!visible) return null;

  return (
    <TopButton
      type="button"
      aria-label="Go to top"
      onClick={() => {
        document.querySelector("h1")?.focus({ preventScroll: true });
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
        });
      }}
    >
      <ArrowUp size={18} aria-hidden="true" />
    </TopButton>
  );
}
