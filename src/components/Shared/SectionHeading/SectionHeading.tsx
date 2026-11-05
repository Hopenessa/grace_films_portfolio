import { Title, Copy } from "./SectionHeading.styles";
export default function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <Title tabIndex={-1}>{title}</Title>
      <Copy>{description}</Copy>
    </div>
  );
}
