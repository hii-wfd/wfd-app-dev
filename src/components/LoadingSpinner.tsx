import { Container, Row, Spinner } from 'react-bootstrap';

const LoadingSpinner = () => (
  <section className='section-spacing'>
  <Container>
    <Row className="justify-content-md-center">
      <Spinner animation="border" />
      Getting data
    </Row>
  </Container>
  </section>
);

export default LoadingSpinner;
