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
            <h3>Let’s bring a story to life.</h3>
            <p>
              Have a film in mind, a screenplay to explore, or a story worth
              telling? I’d love to hear from you. Get in touch to talk about
              directing, writing, and creative collaborations.
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
