import styled from "styled-components";

export const Foot = styled.footer`
  padding: 28px 72px 34px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 28px;
  flex-wrap: wrap;
  text-align: left;

  p {
    font-size: 14px;
    color: #d8d5c9;
  }

  span {
    color: #8c9083;
    font-size: 12px;
    letter-spacing: 0.08em;
  }

  @media (max-width: 600px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }
`;
