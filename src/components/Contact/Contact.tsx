import { Mail, Instagram } from "lucide-react";
import { contact } from "../../data/portfolio";
import { Container } from "../Shared/Container/Container";
import { Section, Layout, Copy, Links } from "./Contact.styles";
export default function Contact() {
  return (
    <Section id="contact" aria-labelledby="contact-heading">
      <Container>
        <Layout>
          <Copy>
            <h2 id="contact-heading" tabIndex={-1}>
              Contact
            </h2>
            <h3>Interested in working together?</h3>
            <p>
              For inquiries about script availability, rights, or developing a
              project together, please get in touch.
            </p>
          </Copy>
          <Links aria-label="Get in touch">
            <a href={"mailto:" + contact.email}>
              <Mail aria-hidden="true" size={19} />
              <span>
                <small>Email</small>
                <span>{contact.email}</span>
              </span>
            </a>

            <a
              aria-label="Instagram @gracedarlin.g (opens in a new tab)"
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram aria-hidden="true" size={19} />
              <span>
                <small>Instagram</small>
                <span>@gracedarlin.g</span>
              </span>
            </a>
          </Links>
        </Layout>
      </Container>
    </Section>
  );
}
