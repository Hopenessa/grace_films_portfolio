import styled from "styled-components";

export const TopButton = styled.button`
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 30;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 1px solid var(--color-gold);
  border-radius: 999px;
  background: #191c18f5;
  color: var(--color-gold);
  font-size: 13px;
  box-shadow: 0 4px 20px #0004;
  transition:
    background 0.2s,
    color 0.2s;

  &:hover {
    background: var(--color-gold);
    color: #111310;
  }

  @media (max-width: 650px) {
    right: 16px;
    bottom: 16px;
  }
`;
