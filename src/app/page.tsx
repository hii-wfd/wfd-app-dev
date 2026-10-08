import { Col, Container, Image, Row } from 'react-bootstrap';
import {
  FaServer,
  FaChartLine,
  FaBrain,
  FaShieldAlt,
} from "react-icons/fa";

/** The Home page. */
const Home = () => (
  <main>
    {/* 1. Welcome Banner */}
    <section
      className="welcome-banner d-flex align-items-center text-left deep-sea-title"
      style={{
        minHeight: '500px',
        backgroundImage: "url('/landing-page-background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <h1 className="display-1 fw-bold mb-5">
              JOIN OUR TEAM!
            </h1>
            <p className="lead fs-4">
              HII's Mission Technologies division is  seeking local college students to apply for our internship program located in Honolulu!
            </p>
          </Col>
        </Row>
      </Container>
    </section>

    {/* Icons */}
    <section className="section-spacing">
      <Container>
        <Row className="deep-sea-title justify-content-center">
          <Col md={10} lg={10}>
            <div className="d-flex justify-content-between text-center">

              <div className="d-flex flex-column align-items-center">
                <FaServer size={90} />
                <h5 className="mt-4 mb-0">IT</h5>
              </div>

              <div className="d-flex flex-column align-items-center">
               <FaChartLine size={90} />
                <h5 className="mt-4 mb-0">Data Science</h5>
              </div>

              <div className="d-flex flex-column align-items-center">
                <FaBrain size={90} />
                <h5 className="mt-4 mb-0">Intelligence</h5>
             </div>

              <div className="d-flex flex-column align-items-center">
                <FaShieldAlt size={90} />
                <h5 className="mt-4 mb-0">Cybersecurity</h5>
              </div>

            </div>
          </Col>
        </Row>
      </Container>
    </section>

    {/* Our Program */}
    <section className="section-spacing">
      <Container>
        <Row className="align-items-center gx-5 deep-sea-title justify-content-center">
          <Col md={10}>
            <h2 className="display-5 fw-bold deep-sea-text mb-4">
              OUR PROGRAM
            </h2>

            <p className="lead">
              The HII internship program features specializations in the fields of IT, Data Science, Intelligence, and Cyber.
            </p>

            <p className="lead">
              Work directly with seasoned professionals in the intelligence community, providing critical support to military and government clients. 
              
              Get a unique behind-the-scenes look at the private government contracting industry and gain the skills that will set you apart in your career.
            </p>
              
            <p className="lead">
              Don’t miss out on this rare opportunity to make a difference and build your future!
            </p>
          </Col>
        </Row>
      </Container>
    </section>

    {/* Summer Opportunities */}
    <section className="section-spacing">
      <Container>
        <Row className="align-items-center gx-5 deep-sea-title justify-content-center">
          <Col md={6}>
            <img
              src="/speaking.jpg"
              alt="Speaking at P3I Showcase"
              className="img-fluid"
            />
          </Col>
          <Col md={6}>
            <h2 className="display-5 fw-bold deep-sea-text mb-4">
              SUMMER OPPORTUNITIES AT HOME!
            </h2>

            <p className="lead">
              Step into the world of intelligence and make a real impact supporting the Department of Defense in the Indo-Pacific region. 
              Over eight exciting weeks, you’ll dive into expert-led briefings, sharpen essential skills, and tackle hands-on projects that put you at the center of the action. 
              The experience culminates in a dynamic capstone project where you and your team will apply everything you’ve learned.
            </p>
          </Col>
        </Row>
      </Container>
    </section>

    {/* About / Introduction + YouTube Video */}
    <section className="section-spacing">
      <Container>
        <Row className="align-items-center g-5">
          <Col lg={6}>
            <h2 className="display-5 fw-bold deep-sea-text mb-4">
              HII MISSION TECHNOLOGIES
            </h2>

            <p className="lead deep-sea-text">
              HII's Mission Technologies Division provides innovative solutions for national security and defense, 
              specializing in AI, cybersecurity, unmanned systems, and advanced technologies. Their cutting-edge capabilities help 
              government and military clients tackle evolving global threats. Focused on collaboration and innovation, HII transforms 
              complex challenges into mission-ready solutions.
            </p>

            <p className="deep-sea-text">
              To learn more about HII Mission Technologies, visit our website <a href="https://www.hii.com/mission-technologies" target="_blank" rel="noopener noreferrer">here</a>.
            </p>
          </Col>

          <Col lg={6}>
            <div className="ratio ratio-16x9">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/ZtIcV7POCsw?si=G7yxhCGFs52ZORIi" 
              title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; 
              encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>

              </iframe>
            </div>
          </Col>
        </Row>
      </Container>
    </section>

    {/* Intern Testimonies */}
<section className="section-spacing">
  <Container>
    {/* Section Title */}
    <div className="text-center mb-5">
      <h2 className="display-5 fw-bold deep-sea-text">MEET THE TEAM</h2>
    </div>

    {/* Team Members */}
    <Row className="g-4">
      {/* Team Member 1 */}
      <Col md={6} lg={3}>
        <div className="text-center">
          <Image
            src="/images/team-1.jpg"
            alt="Team Member 1"
            fluid
            rounded
          />
          <h4 className="mt-3 deep-sea-text">Team Member Name</h4>
          <p className="deep-sea-text">
            A short description about this team member and their role in
            the program.
          </p>
        </div>
      </Col>

      {/* Team Member 2 */}
      <Col md={6} lg={3}>
        <div className="text-center">
          <Image
            src="/images/team-2.jpg"
            alt="Team Member 2"
            fluid
            rounded
          />
          <h4 className="mt-3 deep-sea-text">Team Member Name</h4>
          <p className="deep-sea-text">
            A short description about this team member and their role in
            the program.
          </p>
        </div>
      </Col>

      {/* Team Member 3 */}
      <Col md={6} lg={3}>
        <div className="text-center">
          <Image
            src="/images/team-3.jpg"
            alt="Team Member 3"
            fluid
            rounded
          />
          <h4 className="mt-3 deep-sea-text">Team Member Name</h4>
          <p>
            A short description about this team member and their role in
            the program.
          </p>
        </div>
      </Col>

      {/* Team Member 4 */}
      <Col md={6} lg={3}>
        <div className="text-center">
          <Image
            src="/images/team-4.jpg"
            alt="Team Member 4"
            fluid
            rounded
          />
          <h4 className="mt-3 deep-sea-text">Team Member Name</h4>
          <p>
            A short description about this team member and their role in
            the program.
          </p>
        </div>
      </Col>

      {/* Team Member 5 */}
      <Col md={6} lg={3}>
        <div className="text-center">
          <Image
            src="/images/team-5.jpg"
            alt="Team Member 5"
            fluid
            rounded
          />
          <h4 className="mt-3 deep-sea-text">Team Member Name</h4>
          <p className="deep-sea-text">
            A short description about this team member and their role in
            the program.
          </p>
        </div>
      </Col>

      {/* Team Member 6 */}
      <Col md={6} lg={3}>
        <div className="text-center">
          <Image
            src="/images/team-6.jpg"
            alt="Team Member 6"
            fluid
            rounded
          />
          <h4 className="mt-3 deep-sea-text">Team Member Name</h4>
          <p className="deep-sea-text">
            A short description about this team member and their role in
            the program.
          </p>
        </div>
      </Col>

      {/* Team Member 7 */}
      <Col md={6} lg={3}>
        <div className="text-center">
          <Image
            src="/images/team-7.jpg"
            alt="Team Member 7"
            fluid
            rounded
          />
          <h4 className="mt-3 deep-sea-text">Team Member Name</h4>
          <p className="deep-sea-text">
            A short description about this team member and their role in
            the program.
          </p>
        </div>
      </Col>

      {/* Team Member 8 */}
      <Col md={6} lg={3}>
        <div className="text-center">
          <Image
            src="/images/team-8.jpg"
            alt="Team Member 8"
            fluid
            rounded
          />
          <h4 className="mt-3 deep-sea-text">Team Member Name</h4>
          <p className="deep-sea-text">
            A short description about this team member and their role in
            the program.
          </p>
        </div>
      </Col>
    </Row>
  </Container>
</section>

    {/* FAQ + Requirements */}
    <section className="section-spacing">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold deep-sea-text">FAQs</h2>
          <p className="lead deep-sea-text">
            Frequently asked questions about the program
          </p>
        </div>
        <Row className="align-items-center gx-5 deep-sea-title justify-content-center">
          {/* FAQ */}
          <Col lg={6}>
            <div className="mb-4">
              <h3 className="h5 fw-bold">
                Is it paid?
              </h3>
              <p className="deep-sea-text">
                Yes! Interns are paid on a competitive pay scale based on their experience and education.
              </p>
            </div>

            <div className="mb-4">
              <h3 className="h5 fw-bold">
                Where are we located?
              </h3>
              <p>
                The primary location of work takes place at our corporate office in the heart of Downtown Honolulu. There may be opportunities to work at various onsite client locations. 
              </p>
            </div>

          </Col>

          <Col lg={6}>
            <div className="mb-4">
              <h3 className="h5 deep-sea-title fw-bold">
                What are the hours?
              </h3>
              <p>
                Hours are flexible to fit around your school schedules! 
              </p>
            </div>

            <div className="mb-4">
              <h3 className="h5 deep-sea-title fw-bold">
                Do I need a clearance to start?
              </h3>
              <p>
                No! Government security clearances are not required to start. However, you must be eligible to obtain and maintain one.  
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>

<section className="section-spacing">
  <Container>
    <div className="text-center mb-5">
      <h2 className="display-5 fw-bold deep-sea-text">
        Requirements to Apply:
      </h2>
    </div>

    <Row className="justify-content-center g-3">
      <Col lg={8}>
        <div className="d-flex align-items-center gap-3 fw-bold p-4 bg-light rounded shadow-sm">
          <span className="fs-4">✓</span>
          <p className="mb-0 deep-sea-text fs-5">
            High School Diploma or equivalent.
          </p>
        </div>
      </Col>

      <Col lg={8}>
        <div className="d-flex align-items-center gap-3 fw-bold p-4 bg-light rounded shadow-sm">
          <span className="fs-4">✓</span>
          <p className="mb-0 deep-sea-text fs-5">
            Actively pursuing a bachelor's degree.
          </p>
        </div>
      </Col>

      <Col lg={8}>
        <div className="d-flex align-items-center gap-3 fw-bold p-4 bg-light rounded shadow-sm">
          <span className="fs-4">✓</span>
          <p className="mb-0 deep-sea-text fs-5">
            Must be a U.S. Citizen.
          </p>
        </div>
      </Col>

      <Col lg={8}>
        <div className="d-flex align-items-center gap-3 fw-bold p-4 bg-light rounded shadow-sm">
          <span className="fs-4">✓</span>
          <p className="mb-0 deep-sea-text fs-5">
            Must have the ability to obtain and maintain a security clearance.
          </p>
        </div>
      </Col>
    </Row>
  </Container>
</section>

    {/* Mailing List */}
{/* Mailing List */}
<section className="section-spacing">
  <Container>
    <Row className="justify-content-center">
      <Col md={8} lg={6} className="text-center">
        <h2 className="display-5 fw-bold deep-sea-text">
          Join Our Mailing List
        </h2>

        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSeoPsT4NDqSX_ywhbw-R-kbwmORkwoOVO3WHNucIc4JGd4iiQ/viewform"
          className="btn btn-lg text-white my-4"
          style={{
            backgroundColor: "var(--sky-blue)",
            borderColor: "var(--sky-blue)",
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          CLICK HERE
        </a>
      </Col>
    </Row>
  </Container>
</section>
  </main>
);

export default Home;