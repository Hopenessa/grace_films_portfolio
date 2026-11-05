import { useLayoutEffect, useRef, useState } from "react";
import { taperedArc } from "./Hero.geometry";
import { Container } from "../Shared/Container";
import {
  Section,
  Layout,
  Text,
  Tagline,
  Portrait,
  SideNote,
  Geometry,
} from "./Hero.styles";
export default function Hero() {
  const geometryRef = useRef<SVGSVGElement>(null);
  const [headerGap, setHeaderGap] = useState({ y: 0, height: 0, scale: 1 });
  useLayoutEffect(() => {
    const svg = geometryRef.current;
    const header = document.querySelector("header");
    const menuText = header?.querySelector("nav a");
    if (!svg || !header || !menuText) return;
    let active = true;
    const measure = () => {
      if (!active) return;
      const matrix = svg.getScreenCTM();
      if (!matrix) return;
      const rect = menuText.getBoundingClientRect();
      const style = getComputedStyle(menuText);
      const top = rect.top + parseFloat(style.paddingTop) - 8 - window.scrollY;
      const bottom =
        rect.bottom - parseFloat(style.paddingBottom) + 22 - window.scrollY;
      const inverse = matrix.inverse();
      const start = new DOMPoint(0, top).matrixTransform(inverse);
      const end = new DOMPoint(0, bottom).matrixTransform(inverse);
      const next = {
        y: start.y,
        height: rect.height ? end.y - start.y : 0,
        scale: Math.hypot(matrix.a, matrix.b),
      };
      setHeaderGap((previous) =>
        Math.abs(previous.y - next.y) < 0.1 &&
        Math.abs(previous.height - next.height) < 0.1 &&
        Math.abs(previous.scale - next.scale) < 0.001
          ? previous
          : next,
      );
    };
    const observer = new ResizeObserver(measure);
    observer.observe(svg);
    observer.observe(header);
    observer.observe(menuText);
    window.addEventListener("resize", measure);
    void document.fonts.ready.then(measure);
    measure();
    return () => {
      active = false;
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);
  return (
    <Section id="intro">
      <Container>
        <Layout>
          <Text>
            <h1>
              Make room
              <br />
              for a story<span>.</span>
            </h1>
            <p>
              I’m a director and screenwriter drawn to the people, places and
              in-between moments that reveal what it means to be human.
            </p>
            <p>
              I am interested in the extraordinary beneath the ordinary: a quiet
              encounter, an unexpected turn, the moment a familiar world begins
              to change. Through film and the written page, I explore the
              stories we carry, the choices we make, and what connects us to one
              another.
            </p>
            <Tagline>CHARACTER / CINEMA / A KINDER TOMORROW</Tagline>
          </Text>
          <Portrait>
            <Geometry
              ref={geometryRef}
              viewBox="-24 -310 850 950"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="aperture-fill"
                  x1="0"
                  y1="-310"
                  x2="0"
                  y2="640"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#30332d" stopOpacity=".8" />
                  <stop offset=".55" stopColor="#252821" stopOpacity=".5" />
                  <stop offset="1" stopColor="#30332d" stopOpacity=".8" />
                </linearGradient>
              </defs>
              <path
                d="M470 -310 H850 V640 H500 L330 220 Z"
                fill="#191c18"
                fillOpacity=".8"
              />
              <path
                d="M270 -310 C165 -205 -14 -10 -14 220 C-14 385 70 485 240 640 L500 640 L330 220 L470 -310 Z"
                fill="url(#aperture-fill)"
              />
              <path d={taperedArc(headerGap)} fill="var(--color-gold)" />
            </Geometry>
            <img
              src={`${import.meta.env.BASE_URL}images/Grace.webp`}
              alt="Grace, director and screenwriter"
            />
            <SideNote>
              BIG QUESTIONS.
              <br />
              HUMAN STORIES.
            </SideNote>
          </Portrait>
        </Layout>
      </Container>
    </Section>
  );
}
