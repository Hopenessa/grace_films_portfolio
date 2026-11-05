import styled from "styled-components";
export const Bar = styled.header<{ $scrolled: boolean; $menuOpen: boolean }>`
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  background: ${({ $scrolled, $menuOpen }) => ($scrolled || $menuOpen ? "rgba(25, 28, 24, .94)" : "transparent")};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? "blur(18px)" : "none")};
  -webkit-backdrop-filter: ${({ $scrolled }) => ($scrolled ? "blur(18px)" : "none")};
  box-shadow: ${({ $scrolled }) => ($scrolled ? "0 8px 28px rgba(0,0,0,.2), inset 0 -1px rgba(231,181,82,.16)" : "0 8px 28px transparent, inset 0 -1px transparent")};
  transition:
    background 0.25s ease,
    box-shadow 0.25s ease,
    backdrop-filter 0.25s ease;
  padding: 8px 0;
`;
export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
`;
export const Logo = styled.a`
  display: block;
  flex-shrink: 0;
  img {
    width: 60px;
    height: 50px;
    object-fit: cover;
  }
  @media (max-width: 650px) {
    img {
      width: 52px;
      height: 43px;
    }
  }
`;
export const Nav = styled.nav<{ $open: boolean }>`
  display: flex;
  gap: 33px;
  margin-right: 10%;
  a {
    font-size: 17px;
    line-height: 1.4;
    padding: 6px 0;
    position: relative;
    color: #d6d4cb;
    text-shadow:
      0 0 4px #111310,
      0 0 7px #111310;
    &[href="#contact"] {
      isolation: isolate;
      &::before {
        content: "";
        position: absolute;
        inset: -5px -12px;
        z-index: -1;
        background: transparent;
      }
    }
    &[aria-current="location"] {
      color: var(--color-gold);
    }
    &:hover {
      color: var(--color-gold);
    }
    &[aria-current="location"]::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 26px;
      height: 2px;
      background: var(--color-gold);
    }
  }
  @media (max-width: 1100px) {
    margin-right: 0;
    gap: 24px;
  }
  @media (max-width: 650px) {
    display: ${(p) => (p.$open ? "flex" : "none")};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #191c17;
    padding: 25px;
    flex-direction: column;
    border-bottom: 1px solid #383a32;
  }
`;
export const MenuButton = styled.button`
  display: none;
  padding: 8px;
  @media (max-width: 650px) {
    display: block;
  }
`;
