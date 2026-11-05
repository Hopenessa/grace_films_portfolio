import { useState, useEffect, type MouseEvent } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "../Shared/Container";
import { Bar, Row, Logo, Nav, MenuButton } from "./Header.styles";
const navigation = [
  ["Home", "home"],
  ["Films", "films"],
  ["Screenplays", "screenplays"],
  ["Contact", "contact"],
];
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24);
  const [active, setActive] = useState("home");
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
      const threshold =
        (document.querySelector("header")?.getBoundingClientRect().height ??
          66) + 32;
      let current = "home";
      for (const [, id] of navigation) {
        if (id === "home") continue;
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= threshold)
          current = id;
      }
      if (
        window.scrollY > 0 &&
        window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 3
      )
        current = "contact";
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  const navigate = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    )
      return;
    event.preventDefault();
    setOpen(false);
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? "instant"
      : "smooth";
    if (id === "home") window.scrollTo({ top: 0, behavior });
    else
      document.getElementById(id)?.scrollIntoView({ block: "start", behavior });
  };
  return (
    <Bar $scrolled={scrolled} $menuOpen={open}>
      <Container>
        <Row>
          <Logo
            href="#home"
            aria-label="Gold Mustang Studio home"
            onClick={(event) => navigate(event, "home")}
          >
            <img
              src={`${import.meta.env.BASE_URL}images/studio-logo.svg`}
              alt="Gold Mustang Studio"
            />
          </Logo>
          <Nav $open={open} aria-label="Main navigation">
            {navigation.map(([label, id]) => (
              <a
                key={id}
                href={"#" + id}
                onClick={(event) => navigate(event, id)}
                aria-current={active === id ? "location" : undefined}
              >
                {label}
              </a>
            ))}
          </Nav>
          <MenuButton
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X /> : <Menu />}
          </MenuButton>
        </Row>
      </Container>
    </Bar>
  );
}
