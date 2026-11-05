import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
.skip-link {
  position: fixed;
  top: 8px;
  left: 8px;
  z-index: 100;
  padding: 12px 16px;
  background: #111310;
  color: var(--color-gold);
  transform: translateY(-200%);
}
.skip-link:focus {
  transform: translateY(0);
}

* {
  scrollbar-width: thin;
  scrollbar-color: var(--color-gold) #111310;
}
*::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
*::-webkit-scrollbar-track,
*::-webkit-scrollbar-corner {
  background: #111310;
}
*::-webkit-scrollbar-thumb {
  background: var(--color-gold);
  border: 2px solid #111310;
  border-radius: 999px;
}

:root {
  --color-gold: #e7b552;
}
* {
  box-sizing: border-box;
}
html {
  scroll-behavior: smooth;
  scroll-padding-top: 82px;
}
body {
  margin: 0;
  background: #111310;
  color: #f4edde;
  font-family: "DM Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
}
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 10;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Cpath fill='%23fff' filter='url(%23n)' opacity='.5' d='M0 0h180v180H0z'/%3E%3C/svg%3E");
}
h1,
h2,
h3,
p {
  margin: 0;
}
button,
a {
  -webkit-tap-highlight-color: transparent;
}
a {
  color: inherit;
  text-decoration: none;
}
button {
  font: inherit;
  color: inherit;
  cursor: pointer;
}
button:disabled {
  opacity: 0.3;
  cursor: default;
}
button {
  background: none;
  border: none;
}
button:focus-visible,
a:focus-visible,
[tabindex]:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 6px;
}
::selection {
  background: var(--color-gold);
  color: #111310;
}
img {
  display: block;
  max-width: 100%;
}
section {
  scroll-margin-top: 0;
}
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    transition: none !important;
    animation: none !important;
  }
}
`;
