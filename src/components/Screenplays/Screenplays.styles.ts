import styled from "styled-components";
export const Section = styled.section`
  overflow-anchor: none;
  padding: 24px 0;
  @media (min-width: 801px) {
    height: calc(100svh - 82px);
    > div {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
  border-bottom: 1px solid #383a32;
`;
export const Layout = styled.div`
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 45px;
  margin-top: 20px;
  min-height: 0;
  flex: 1;
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
`;
export const Item = styled.article<{ $active: boolean }>`
  cursor: pointer;
  transition: background 0.2s ease;
  &:hover, &:focus-within { background: rgba(231, 181, 82, 0.035); }
  position: relative;
  padding: 14px 10px 16px 20px;
  border-bottom: 1px solid #383a32;
  &:last-child {
    border-bottom: 0;
  }
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 15px;
    bottom: 22px;
    width: 3px;
    background: ${(p) => (p.$active ? "var(--color-gold)" : "transparent")};
    border-radius: 2px;
  }
  p {
    color: #b7b7ae;
    font-size: 14px;
    line-height: 1.55;
    margin-top: 8px;
  }
`;
export const Select = styled.button`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  width: 100%;
  text-align: left;
  padding: 0;
  align-items: center;
  h3 {
    font-size: 17px;
    font-weight: 400;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  small {
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #aaa99f;
    white-space: nowrap;
  }
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 7px;
  }
`;
export const Links = styled.div`
  display: flex;
  gap: 19px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
  font-size: 12px;
  a {
    display: flex;
    align-items: center;
    gap: 9px;
    color: var(--color-gold);
    &:hover {
      text-decoration: underline;
    }
  }
  span {
    font-size: 11px;
    color: #888c80;
  }
`;
export const Paper = styled.div`
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: linear-gradient(135deg, #22251f, #1a1d18);
  border: 1px solid #ffffff03;
  border-radius: 4px;
  padding: 14px 16px;
`;
export const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  padding-bottom: 12px;
  border-bottom: 1px solid #383a32;
  font-size: 13px;
  div {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  small {
    font-size: 11px;
    color: #c4c0b3;
  }
  button {
    border: 1px solid #42463b;
    border-radius: 50%;
    width: 31px;
    height: 31px;
    display: grid;
    place-items: center;
    color: var(--color-gold);
  }
`;
export const Script = styled.div`
  font-family: "Courier New", monospace;
  font-size: 12px;
  line-height: 1.9;
  color: #e4e0d5;
  white-space: pre-wrap;
  padding: 20px 4px;
  min-height: 285px;
`;
export const Demo = styled.p`
  padding-top: 8px;
  flex-shrink: 0;
  font-size: 10px;
  color: #aaa99f;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const Cover = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  min-height: 0;
  object-fit: contain;
  margin: 0 auto;
`;
export const Pending = styled.p`
  font-size: 12px;
  line-height: 1.8;
  color: #aaa99f;
  margin-top: 14px;
`;


export const List = styled.div`
  min-height: 0;
  display: flex;
  flex-direction: column;

  > [role="tablist"] {
    min-height: 0;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #6c6655 transparent;
  }
`;

export const ListNavigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 14px;
  padding-top: 12px;
  font-size: 12px;
  flex-shrink: 0;

  button {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border: 1px solid #42463b;
    border-radius: 50%;
    color: var(--color-gold);
  }
`;

export const PageSurface = styled.div<{ $expanded: boolean }>`
  margin-top: 12px;
  min-height: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;

  > img {
    flex: 1;
    min-height: 0;
  }

  > div {
    flex: 1;
    min-height: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    canvas {
      width: ${p => p.$expanded ? "100%" : "auto"};
      height: ${p => p.$expanded ? "auto" : "100%"};
      max-width: 100%;
      object-fit: contain;
    }
  }

  ${p => p.$expanded && `
    display: block;

    > div {
      display: block;
      min-height: auto;
    }

    > div canvas {
      width: 100%;
      height: 100%;
      max-width: none;
    }
  `}

  @media (max-width: 800px) {
    > img {
      height: auto;
      max-height: 420px;
    }
    ${p => !p.$expanded && `
      > div canvas {
        width: 100%;
        height: auto;
      }
    `}
  }
`;

export const ReaderDialog = styled.dialog`
  width: min(760px, calc(100vw - 32px));
  height: calc(100svh - 32px);
  max-width: none;
  max-height: none;
  margin: auto;
  padding: 16px;
  border: 1px solid #45483e;
  border-radius: 6px;
  background: #1a1d18;
  color: #f4edde;
  box-shadow: 0 16px 70px #0008;

  &[open] {
    display: flex;
    flex-direction: column;
  }

  &::backdrop {
    background: #080a08d9;
    backdrop-filter: blur(5px);
  }
`;


export const PageSheet = styled.div<{ $width: number; $warm: boolean }>`
  width: ${p => p.$width}px;
  aspect-ratio: 1 / 1.41421356237;
  margin: 0 auto;
  flex: none;
  background: ${p => p.$warm ? "#e6d8b8" : "#fff"};

  > div {
    width: 100%;
    height: 100%;
  }

  > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const ZoomControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  gap: 12px;
  padding-top: 10px;
  font-size: 12px;
  font-variant-numeric: tabular-nums;

  button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    min-width: 32px;
    min-height: 32px;
    color: var(--color-gold);
    border: 1px solid #42463b;
    border-radius: 6px;
    padding: 4px 8px;
  }
`;


export const PageColors = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;

  button {
    color: #d0cec3;

    &[aria-pressed="true"] {
      border-color: var(--color-gold);
      color: var(--color-gold);
    }
  }

  span {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #fff;

    &[data-tone="warm"] {
      background: #e6d8b8;
    }
  }
`;
