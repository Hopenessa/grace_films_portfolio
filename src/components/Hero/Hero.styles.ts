import styled from "styled-components";
export const Section = styled.section`
  position: relative;
  overflow: visible;
  border-bottom: 1px solid #383a32;
`;

export const StoryNote = styled.div`
  position: absolute;
  top: 82px;
  right: max(8px, calc((100vw - 1480px) / 2));
  width: 96px;
  z-index: 4;
  pointer-events: none;
  &::before {
    content: "FOR SCREEN.\\A FOR STAGE.";
    white-space: pre;
    font-size: 11px;
    line-height: 1.8;
    letter-spacing: 0.22em;
    color: #b1a185;
  }
  &::after {
    content: "";
    position: absolute;
    top: 53px;
    right: 73px;
    width: 23px;
    height: 1px;
    background: #b1a185;
  }
  @media (max-width: 1599px) {
    display: none;
  }
`;
export const Layout = styled.div`
  min-height: 610px;
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  align-items: center;
  gap: 24px;
  padding: 40px 0 65px;
  @media (max-width: 900px) {
    min-height: 490px;
    gap: 20px;
  }
  @media (max-width: 650px) {
    grid-template-columns: 1fr;
    padding: 35px 0 45px;
    gap: 40px;
  }
`;
export const Text = styled.div`
  position: relative;
  z-index: 2;
  h1 {
    font-family: Manrope, sans-serif;
    font-size: clamp(52px, 7vw, 100px);
    font-weight: 800;
    letter-spacing: -0.055em;
    line-height: 1.02;
    span {
      color: var(--color-gold);
    }
  }
  p {
    color: #d0cec3;
    font-size: 18px;
    line-height: 1.8;
    max-width: 600px;
    margin-top: 26px;
  }
  p + p {
    margin-top: 14px;
    color: #aaa99f;
  }
  @media (max-width: 900px) {
    p {
      font-size: 16px;
    }
  }
`;
export const Tagline = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-top: 32px;
  color: #aaa99f;
  font-size: 12px;
  letter-spacing: 0.18em;
  line-height: 1.8;
  &::after {
    content: "CHARACTER / HORROR / DRAMA";
  }
  &::before {
    content: "";
    width: 43px;
    height: 2px;
    background: var(--color-gold);
    flex-shrink: 0;
  }
`;
export const Portrait = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  max-width: 420px;
  transform: translateX(12px);
  justify-self: center;
  isolation: isolate;
  img {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    filter: brightness(0.92);
    object-position: 50% 42%;
  }
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    box-shadow: inset 0 0 65px #0005;
    z-index: 3;
    pointer-events: none;
  }
  @media (max-width: 650px) {
    transform: none;
    width: 76%;
    max-width: 350px;
  }
`;

export const SideNote = styled.div`
  z-index: 4;
  position: absolute;
  left: calc(100% + 44px);
  top: 67%;
  width: 100px;
  font-size: 11px;
  line-height: 2.1;
  letter-spacing: 0.2em;
  color: #aaa99f;
  &::before {
    content: "";
    display: block;
    width: 25px;
    height: 1px;
    background: var(--color-gold);
    margin-bottom: 17px;
  }
  &::after {
    content: "ART SHOULD\\A UNSETTLE US.";
    white-space: pre;
  }
  @media (max-width: 1599px) {
    display: none;
  }
`;
export const Opening = styled.div`
  padding-top: 66px;
  @media (max-width: 650px) {
    padding-top: 59px;
  }
  position: relative;
  overflow: hidden;
  isolation: isolate;
`;
export const Geometry = styled.svg`
  position: absolute;
  left: calc(-2.2727% - 1px);
  top: -70.455%;
  width: 193.182%;
  height: 215.909%;
  overflow: visible;
  z-index: 1;
  pointer-events: none;
  @media (max-width: 650px) {
    display: none;
  }
`;
