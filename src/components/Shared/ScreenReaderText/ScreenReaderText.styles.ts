import styled from "styled-components";

export const HiddenText = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: pre-wrap;
  border: 0;
`;
