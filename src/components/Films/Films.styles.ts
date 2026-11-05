import styled, { keyframes } from "styled-components";
export const Section = styled.section`
  padding: 24px 0 20px;
  overflow-anchor: none;
  border-bottom: 1px solid #383a32;
`;
export const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
`;
export const Note = styled.span`
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #aaa99f;
  @media (max-width: 600px) {
    display: none;
  }
`;
export const Track = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;
  @media (max-width: 600px) {
    gap: 14px;
  }
`;
const revealFilm = keyframes`
  from {
    opacity: 0;
    transform: translateY(5px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Card = styled.article<{ $active: boolean }>`
  min-width: 0;
  flex: ${(p) => (p.$active ? "2" : "1")};
  @media (prefers-reduced-motion: no-preference) {
    > * {
      animation: ${revealFilm} 460ms cubic-bezier(0.22, 1, 0.36, 1) both;
    }

    > :nth-child(2) {
      animation-delay: 60ms;
    }
  }
  padding-top: ${(p) => (p.$active ? "0" : "10px")};
  h3 {
    font-size: ${(p) => (p.$active ? "20" : "15")}px;
    font-weight: 400;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    transition: font-size 0.3s;
  }
  p {
    font-size: 16px;
    line-height: 1.65;
    color: #b7b7ae;
    margin-top: 10px;
  }
  @media (max-width: 650px) {
    flex: ${(p) => (p.$active ? "1" : "0")};
    display: ${(p) => (p.$active ? "block" : "none")};
  }
`;
export const Preview = styled.div`
  display: block;
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  background: #252820;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(1);
    transition:
      transform 0.5s,
      filter 0.5s;
  }
  &:hover img {
    transform: scale(1.01);
    filter: brightness(1);
  }

  em {
    position: absolute;
    right: 8px;
    top: 8px;
    font-size: 9px;
    font-style: normal;
    padding: 4px 7px;
    background: #111b;
    color: #ddd7c8;
  }
`;
export const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: baseline;
  margin-top: 12px;
  time {
    font-size: 12px;
    color: #b7b7ae;
  }
`;
export const FilmCopy = styled.div`
  margin-top: 14px;

  > span {
    color: #aaa99f;
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  > div {
    margin-top: 4px;
  }
`;

export const FilmCounter = styled.span`
  color: #b7b7ae;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`;

export const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;
export const Dots = styled.div`
  display: flex;
  gap: 6px;
  button {
    padding: 10px 0;
    width: clamp(18px, 5vw, 42px);
    &::after {
      content: "";
      display: block;
      height: 3px;
      border-radius: 5px;
      background: #373b34;
    }
    &[aria-pressed="true"]::after {
      background: var(--color-gold);
    }
  }
`;
export const Arrows = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  button {
    border: 1px solid #383a32;
    border-radius: 50%;
    width: 38px;
    height: 38px;
    display: grid;
    place-items: center;
    background: #ffffff04;
    &:hover {
      border-color: var(--color-gold);
      color: var(--color-gold);
    }
  }
`;

export const PreviewPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 18px;
  text-align: center;
  background: radial-gradient(ellipse at 50% 25%, #30342b 0, #191d18 65%);
  box-shadow: inset 0 0 0 1px rgb(231 181 82 / 0.15);
  &::before {
    content: "";
    width: 48px;
    height: 1px;
    background: var(--color-gold);
  }
  strong {
    font-family: Manrope, sans-serif;
    font-size: clamp(18px, 1.7vw, 28px);
    font-weight: 400;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    line-height: 1.4;
    color: #e9dfc9;
  }
  small {
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #b6ad99;
    line-height: 1.8;
  }
`;

export const SelectCard = styled.button`
  display: block;
  width: 100%;
  border: 0;
  padding: 0;
  text-align: left;
  background: transparent;
  h3 {
    min-height: 2lh;
  }

  &:hover,
  &:focus-visible {
    color: var(--color-gold);

    & > ${Preview} {
      box-shadow: 0 0 0 1px var(--color-gold);
    }
  }
`;
export const Details = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  color: #b7b7ae;
  font-size: 12px;

  ${SelectCard}:hover &,
  ${SelectCard}:focus-visible & {
    color: var(--color-gold);
  }
`;
export const WatchBadge = styled.span`
  position: absolute;
  left: 12px;
  bottom: 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid var(--color-gold);
  border-radius: 999px;
  background: #111e;
  color: var(--color-gold);
  font-size: 13px;
  font-weight: 600;
  transition: background 0.2s ease, color 0.2s ease;

  ${Preview}:hover &,
  ${Preview}:focus-visible & {
    background: var(--color-gold);
    color: #111;
  }
`;
