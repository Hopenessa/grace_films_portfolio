import { Mail, Instagram } from "lucide-react";
import { contact } from "../../data/portfolio";
import { Container } from "../Shared/Container";
import { Section, Layout, Copy, Links } from "./Contact.styles";
export default function Contact() {
  return (
    <Section id="contact" aria-labelledby="contact-heading">
      <Container>
        <Layout>
          <Copy>
            <h2 id="contact-heading">Contact</h2>
            <h3>Interested in working together?</h3>
            <p>
              For inquiries about script availability, rights, or developing a
              project together, please get in touch.
            </p>
          </Copy>
          <Links aria-label="Get in touch">
            {contact.email ? (
              <a href={"mailto:" + contact.email}>
                <Mail size={19} />
                Email me
              </a>
            ) : (
              <span title="Email address will be added">
                <Mail size={19} />
                Email me
              </span>
            )}
            {contact.instagram ? (
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={19} />
                Instagram
              </a>
            ) : (
              <span title="Instagram link will be added">
                <Instagram size={19} />
                Instagram
              </span>
            )}
          </Links>
        </Layout>
      </Container>
    </Section>
  );
}
