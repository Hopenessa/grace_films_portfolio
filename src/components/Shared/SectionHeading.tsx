import styled from "styled-components";
const Title = styled.h2`
  font-size: 27px;
  font-weight: 450;
  letter-spacing: 0.17em;
  text-transform: uppercase;
`;
const Copy = styled.p`
  color: #b7b7ae;
  font-size: 15px;
  margin-top: 14px;
  line-height: 1.7;
`;
export default function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <Title>{title}</Title>
      <Copy>{description}</Copy>
    </div>
  );
}
