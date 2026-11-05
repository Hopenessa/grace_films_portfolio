import styled from "styled-components";
export const Container = styled.div`
  width: min(1320px, calc(100% - 112px));
  margin: 0 auto;
  @media (max-width: 900px) {
    width: calc(100% - 48px);
  }
  @media (max-width: 600px) {
    width: calc(100% - 36px);
  }
`;
