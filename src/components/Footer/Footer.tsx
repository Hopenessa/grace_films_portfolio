import { Container } from "../Shared/Container";
import { Foot, Row } from "./Footer.styles";

export default function Footer() {
  return (
    <Foot>
      <Container>
        <Row>
          <p>© {new Date().getFullYear()} Grace Darling</p>
          <span>Gold Mustang Studio</span>
        </Row>
      </Container>
    </Foot>
  );
}
