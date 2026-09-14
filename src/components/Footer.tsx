import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container>
      <Col className="text-center">
        <span className="text-muted"> Footer Content </span>
      </Col>
    </Container>
  </footer>
);

export default Footer;
