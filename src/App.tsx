import { GlobalStyle } from "./styles/GlobalStyles";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Films from "./components/Films/Films";
import Screenplays from "./components/Screenplays/Screenplays";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import { Opening } from "./components/Hero/Hero.styles";
import GoTop from "./components/GoTop/GoTop";
export default function App() {
  return (
    <>
      <GlobalStyle />
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          const main = document.getElementById("main-content");
          main?.focus({ preventScroll: true });
          main?.scrollIntoView({ block: "start" });
        }}
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Opening id="home">
          <Hero />
        </Opening>
        <Films />
        <Screenplays />
        <Contact />
      </main>
      <Footer />
      <GoTop />
    </>
  );
}
