import styled from "styled-components";
export const Viewer = styled.div<{ $warm: boolean }>`
  position: relative;
  margin-top: 0;
  min-height: 0;
  canvas {
    display: block;
    width: 100%;
    height: auto;
    background: #fff;
    filter: ${(p) => (p.$warm ? "sepia(0.48) brightness(0.90)" : "none")};
  }
  p {
    font-size: 13px;
    color: #b7b7ae;
    line-height: 1.7;
    padding: 20px 0;
  }
  a {
    color: var(--color-gold);
    text-decoration: underline;
  }
`;
