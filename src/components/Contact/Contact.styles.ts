import styled from "styled-components";

export const Section = styled.section`
  padding: 56px 0 64px;
  border-bottom: 1px solid #383a32;
  background: linear-gradient(115deg, #ffffff03, transparent 70%);
`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(180px, 1fr);
  align-items: center;
  gap: 60px;

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

export const Copy = styled.div`
  max-width: 610px;

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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  justify-self: center;

  a, span {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-size: 17px;
    min-height: 44px;
    padding: 12px 18px;
    border: 1px solid #ffffff20;
    border-radius: 8px;
    background: #ffffff04;
  }

  a {
    color: #f4edde;
    transition: border-color 0.2s, background 0.2s;

    svg {
      color: var(--color-gold);
    }

    &:hover {
      border-color: var(--color-gold);
      background: #e7b5520c;
    }
  }

  span {
    color: #b7b7ae;
  }

  @media (max-width: 650px) {
    justify-self: start;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 14px;
  }
`;
