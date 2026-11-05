import styled from "styled-components";

export const Section = styled.section`
  padding: 56px 0 64px;
  border-bottom: 1px solid #383a32;
  background: linear-gradient(115deg, #ffffff03, transparent 70%);
`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  align-items: center;
  gap: clamp(32px, 6vw, 90px);

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`;

export const Copy = styled.div`
  max-width: 680px;

  h2 {
    font-size: 14px;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: #aaa99f;
    margin-bottom: 18px;
  }

  h3 {
    font-size: clamp(28px, 3vw, 40px);
    font-weight: 400;
    line-height: 1.2;
    margin-bottom: 18px;
  }

  p {
    font-size: 16px;
    line-height: 1.75;
    color: #b7b7ae;
  }
`;

export const Links = styled.nav`
  min-width: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-left: 1px solid #ffffff26;
  padding-left: clamp(24px, 3vw, 44px);

  @media (max-width: 850px) {
    border-left: 0;
    padding-left: 0;
    gap: 20px;
  }

  a {
    display: flex;
    align-items: center;
    gap: 18px;
    min-height: 68px;
    padding: 8px 4px;
    color: #f4edde;
    transition: color 0.2s;

    > svg {
      flex-shrink: 0;
      color: var(--color-gold);
    }

    > span {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 0;
    }

    small {
      color: #b7b7ae;
      font-size: 13px;
    }

    span > span {
      font-size: clamp(16px, 1.4vw, 20px);
      line-height: 1.5;
      overflow-wrap: anywhere;
    }

    &:hover,
    &:focus-visible {
      color: var(--color-gold);
    }
  }
`;
