import { Col, Container, Image, Row } from 'react-bootstrap';
import {
  FaServer,
  FaChartLine,
  FaBrain,
  FaShieldAlt,
  FaDollarSign,
  FaMapMarkerAlt,
  FaSearch,
  FaClock,
} from "react-icons/fa";
import { ArrowRight } from 'react-bootstrap-icons';
import Accordion from "react-bootstrap/Accordion";
import AccordionItem from "react-bootstrap/AccordionItem";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";

/** The Home page. */
const Home = () => (
  <main>
    {/* 1. Welcome Banner */}
    <section
      id="hero"
      className="welcome-banner d-flex align-items-center text-left deep-sea-title section-spacing"
      style={{
        minHeight: '500px',
        backgroundImage: "url('/landing-page-background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <h1 className="display-1 fw-bold mb-5 mt-5">
              JOIN OUR TEAM!
            </h1>
            <p className="lead fs-4">
              HII&apos;s Mission Technologies division is  seeking local college students to apply for our internship program located in Honolulu!
            </p>
          </Col>
        </Row>
      </Container>
    </section>

    {/* Icons */}
    <section className="section-spacing">
      <Container>
        <Row className="deep-sea-title justify-content-center">
          <Col lg={10}>
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
          <Col lg={10}>
            <h2 className="display-7 deep-sea-text mb-4">
              Our Program
            </h2>

            <p className="lead">
              The HII internship program features specializations in the fields of IT, Data Science, Intelligence, and Cyber.
            </p>

            <p className="lead">
              Work directly with seasoned professionals in the intelligence community, providing critical support to military and government clients. 
              
              Get a unique behind-the-scenes look at the private government contracting industry and gain the skills that will set you apart in your career.
            </p>
              
            <p className="lead">
              Don&apos;t miss out on this rare opportunity to make a difference and build your future!
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
            <h2 className="display-7 deep-sea-text mb-4">
              Summer opportunities at home!
            </h2>

            <p className="lead">
              Step into the world of intelligence and make a real impact supporting the Department of Defense in the Indo-Pacific region. 
              
            </p>
            <p className="lead">
              Over eight exciting weeks, you&apos;ll dive into expert-led briefings, sharpen essential skills, and tackle hands-on projects that put you at the center of the action. 
            </p>
            <p className="lead">
              The experience culminates in a dynamic capstone project where you and your team will apply everything you&apos;ve learned.
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
            <h2 className="display-7 deep-sea-text mb-4">
              HII Mission Technologies
            </h2>

            <p className="lead deep-sea-text">
              HII Mission Technologies Division provides innovative solutions for national security and defense, 
              specializing in AI, cybersecurity, unmanned systems, and advanced technologies. 
            </p>
            <p className="lead deep-sea-text">
              Their cutting-edge capabilities help 
              government and military clients tackle evolving global threats. Focused on collaboration and innovation, HII transforms 
              complex challenges into mission-ready solutions.
            </p>

            <p className="sky-blue-color">
              <a className="sky-blue-color text-decoration-none" href="https://www.hii.com/mission-technologies" target="_blank" rel="noopener noreferrer">
                To learn more about HII Mission Technologies, visit our website <ArrowRight className="ms-2" />
              </a>
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

{/* Meet Our Leadership */}
<section className="section-spacing">
  <Container>
    {/* Section Title */}
    <div className="text-left mb-5">
      <h2 className="display-7 deep-sea-text">Our Leadership</h2>
    </div>

    {/* Team Members */}
    <Row className="g-4">
      {/* Team Member 1 */}
      <Col lg={3}>
        <div className="text-center">
          <Image
            src="/images/team-1.jpg"
            alt="Team Member 1"
            fluid
            rounded
          />
        </div>
      </Col>
      <Col lg={9}>
        <div className="text-left">
          <h4 className="mt-3 deep-sea-text">Team Member Name</h4>
          <p className="light-gray">
            Title or role of this team member in the program. Edit me!
          </p>
          <p className="deep-sea-text mt-4">
            A short description about this team member and their role in
            the program.
          </p>
        </div>
      </Col>
    </Row>

    <Row className="g-4 mt-4">
      <Col lg={3}>
        <div className="text-center">
          <Image
            src="/images/team-2.jpg"
            alt="Team Member 2"
            fluid
            rounded
          />
        </div>
      </Col>
      <Col lg={9}>
        <div className="text-left">
          <h4 className="mt-3 deep-sea-text">Team Member Name</h4>
          <p className="light-gray">
            Title or role of the team member in the program. Edit me!
          </p>
          <p className="deep-sea-text mt-4">
            A short description about this team member and their role in
            the program.
          </p>
        </div>
      </Col>
    </Row>
  </Container>
</section>

{/* FAQs */}
<section className="section-spacing">
  <Container>
    <div className="mb-3">
      <h2 className="display-7 deep-sea-text">
        FAQs
      </h2>
      <p className="lead text-secondary">
        Frequently asked questions about the program
      </p>
    </div>

    <Row className="justify-content-center">
      <Col lg={12}>
<Accordion flush alwaysOpen>
  <AccordionItem eventKey="0">
    <AccordionHeader>Is the internship paid?</AccordionHeader>
    <AccordionBody>
      Yes! Interns are paid on a competitive pay scale based on their experience and education.
    </AccordionBody>
  </AccordionItem>

  <AccordionItem eventKey="1">
    <AccordionHeader>What are the working hours?</AccordionHeader>
    <AccordionBody>
      During the school year, hours are flexible to accommodate your school schedule!
    </AccordionBody>
  </AccordionItem>

  <AccordionItem eventKey="2">
    <AccordionHeader>Where are we located?</AccordionHeader>
    <AccordionBody>
      The primary location of work is our corporate office in the heart of Downtown Honolulu. There
      may also be opportunities to work at various onsite client locations.
    </AccordionBody>
  </AccordionItem>

  <AccordionItem eventKey="3">
    <AccordionHeader>Do I need a security clearance to start?</AccordionHeader>
    <AccordionBody>
      No! Government security clearances are not required to start. However, you must be eligible
      to obtain and maintain one.
    </AccordionBody>
  </AccordionItem>
</Accordion>
      </Col>
    </Row>
  </Container>
</section>

  

{/* Requirements */}
<section className="section-spacing">
  <Container>
    <div className="text-center mb-5">
      <h2 className="display-7 deep-sea-text">
        Requirements to Apply
      </h2>
    </div>

    <Row className="g-3">
      {[
        {
          title: "High School Diploma",
          description: "Must have a high school diploma or equivalent."
        },
        {
          title: "Currently Enrolled",
          description: "Must be actively pursuing a bachelor's degree."
        },
        {
          title: "U.S. Citizenship",
          description: "Must be a United States citizen."
        },
        {
          title: "Security Clearance Potential",
          description:
            "Must have the ability to obtain and maintain a security clearance."
        }
      ].map((requirement, index) => (
        <Col md={6} key={index}>
          <div className="bg-white border rounded-0 p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fs-4 fw-bold deep-sea-text">
                0{index + 1}
              </span>
              <i className="bi bi-check-circle-fill fs-4 text-info"></i>
            </div>

            <h5 className="fw-bold deep-sea-text">
              {requirement.title}
            </h5>

            <p className="text-secondary mb-0">
              {requirement.description}
            </p>
          </div>
        </Col>
      ))}
    </Row>
  </Container>
</section>


    {/* Our Partners */}
    <section className="section-spacing">
      <Container>
        <div className="text-left mb-5">
          <h2 className="display-7 deep-sea-text">
            Mission Partner Network
          </h2>
        </div>
        <Row className="align-items-center gx-5 deep-sea-title justify-content-center">
          <Col className="text-center" lg={3}>
            <div className="d-flex flex-column align-items-center gap-4 mb-5">
              
                <h3 className="h5 fw-bold">
                  <a href="https://pac-econ.com/" target="_blank" rel="noopener noreferrer" className="deep-sea-title">
                  <img src="/pacific-economics.png" alt="PacEcon Logo" className="img-fluid" style={{width: "100%", height: "100px", objectFit: "contain",}}/>
                  </a>
                </h3>
            </div>
          </Col>

          <Col className="text-center" lg={3}>
            <div className="d-flex flex-column align-items-center gap-4 mb-5">
            
              <h3 className="h5 fw-bold">
                <a href="https://kapusolutions.com/" target="_blank" rel="noopener noreferrer" className="deep-sea-title">
                  <img src="/kapu-black.png" alt="Kapu Solutions Logo" className="img-fluid" style={{width: "100%", height: "100px", objectFit: "contain",}}/>
                </a>
              </h3>
            </div>
          </Col>

          <Col className="text-center" lg={3}>
            <div className="d-flex flex-column align-items-center gap-4 mb-5">
              
                <h3 className="h5 deep-sea-title fw-bold">
                  <a href="https://hawaiip3i.org/" target="_blank" rel="noopener noreferrer" className="deep-sea-title">
                    <img src="/HawaiiP3I-logo.png" alt="P3I Logo" className="img-fluid" style={{width: "100%", height: "100px", objectFit: "contain",}}/>
                  </a>
                </h3>
            </div>
          </Col>

          <Col className="text-center" lg={3}>
            <div className="d-flex flex-column align-items-center gap-4 mb-5" >
              
                <h3 className="h5 deep-sea-title fw-bold">
                  <a href="https://michael-cardenas-5pp8.squarespace.com/team" target="_blank" rel="noopener noreferrer" className="deep-sea-title">
                    <img src="/mc3-tech.png" alt="MC3 Technologies Logo" className="img-fluid" style={{width: "100%", height: "100px", objectFit: "contain",}}/>
                  </a>
                </h3>
            </div>
          </Col>
        </Row>

        <Row className="align-items-center gx-5 justify-content-center">
          <p className="lead sky-blue-color mt-3">
            <a href="https://forms.gle/SLFgcvE68BNfZzV5A" target="_blank" rel="noopener noreferrer" className="sky-blue-color text-decoration-none">
              Join our Mission Partner Network <ArrowRight className="ms-2" />
            </a>
          </p>
        </Row>
      </Container>
    </section>


{/* Intern Testimonies */}
<section className="section-spacing">
  <Container>
    {/* Section Title */}
    <div className="text-left mb-2">
      <h2 className="display-7 deep-sea-text">Intern Stories</h2>
    </div>

          {/* Team Member 4 */}
    <Row className="mb-5 mt-3 g-4">
      <Col lg={2}>
        <div className="d-flex justify-content-left">
          <Image
            className="pfp mb-3"
            src="k-villegas.jpg"
            alt="Team Member 4"
            fluid
          />
        </div>
      </Col>
      <Col lg={3}>
        <div className="text-left">
          <h4 className="mb-3 deep-sea-text">Kira Villegas</h4>
          <p className="light-gray">
            Summer Intern 2026
          </p>
          <p className="deep-sea-text">
            Leeward Community College
          </p>
          <p className="deep-sea-text">
            Information Security
          </p>
        </div>
      </Col>
      <Col lg={7}>
        <div className="text-left">
          <p className="deep-sea-text">
            I have learned about the opportunities my degree has to offer as well as what it&apos;s like to work in a DoD/Intelligence environment. 
            I&apos;ve also learned a lot about myself and the ways I navigate things such as taking initiative, being more analytical, and working under pressure.
          </p>
          <p className="deep-sea-text">
            HII has created opportunities for me by connecting me with companies of my interest such as MC3. 
            HII has a lot of networking events that are beneficial to those in the tech industry, and I&apos;ve found them useful to learn about adjacent programs to possibly apply for.
          </p>
          <p className="deep-sea-text">
            My advice for future interns is to take in the experience as much as you can and be a sponge for knowledge. Engage with the people who come to teach and support you.
          </p>
          <p className="deep-sea-text">
            One of my favorite memories was playing song games where you guess who added what song to the playlist.
          </p>

        </div>
      </Col>
    </Row>

    {/* Team Member 1 */}
    <Row className="mb-5 mt-3 g-4">
      <Col lg={2}>
        <div className="d-flex justify-content-left">
          <Image
            className="pfp mb-3"
            src="/c-hisamoto.png"
            alt="Team Member 1"
            fluid
          />
        </div>
      </Col>
      <Col lg={3}>
        <div className="text-left">
          <h4 className="mb-3 deep-sea-text">Courtney Hisamoto</h4>
          <p className="light-gray">
            Summer Intern 2026
          </p>
          <p className="deep-sea-text">
            University of Hawaii at Mānoa
          </p>
          <p className="deep-sea-text">
            BS Computer Science
          </p>
        </div>
      </Col>
      <Col lg={7}>
        <div className="text-left">
          <p className="deep-sea-text">
            I learned a lot about intelligence; taking raw data and numbers and turning them into actionable insights through analysis.
          </p>
          <p className="deep-sea-text">
            HII helped has create further development opportunities for me by getting to work on problems that are currently being faced within the Pacific region.
          </p>
          <p className='deep-sea-text'>
            Advice I would give future interns is that connections are your most important asset within industry, so take advantage of the opportunity to getting to know and speak to everyone that you can.
          </p>
          <p className="deep-sea-text">
            One of my favorite memories from the summer is that there&apos;s a special bread bowl lunch sold only on Fridays, so for lunch a lot of the cohort would walk down together to get bread bowls.
          </p>

        </div>
      </Col>
    </Row>

      {/* Team Member 3 */}
    <Row className="mb-5 mt-3 g-4">
      <Col lg={2}>
        <div className="d-flex justify-content-left">
          <Image
            className="pfp mb-3"
            src="n-espiritu.jpg"
            alt="Team Member 3"
            fluid
          />
        </div>
      </Col>
      <Col lg={3}>
        <h4 className="mb-3 deep-sea-text">Naydel Espiritu</h4>
          <p className="light-gray">
            Summer Intern 2026
          </p>
          <p className="deep-sea-text">
            University of Hawaii at Mānoa
          </p>
          <p className="deep-sea-text">
            BS Computer Science
          </p>
      </Col>
      <Col lg={7}>
        <div className="text-left">
          <p className="deep-sea-text">
            HII has provided me with opportunities to step outside of my comfort zone and grow personally. 
            {/* I have become more confident in collaborating with others, strengthened my public speaking skills, and solve problems effectively. */}  
          </p>
          <p className="deep-sea-text">
            I have strengthened my research skills and learned how to prepare and deliver formal briefings. 
            This has helped me learn ways to present information clearly, effectively communicating my findings, and working in a team.
          
          </p>
          <p className="deep-sea-text">
            My advice for future interns is to embrace new challenges and opportunities, and always be open to learning. 
            Every experience offers something valuable to take away, whether it&apos;s developing a new skill, making connections, or just learning more about yourself.
          </p>
          <p className="deep-sea-text">
            One of my favorite parts of this cohort year was getting to meet new people and learn from mentors, peers, and industry professionals. 
            I enjoyed connecting with everyone and getting to know the people in my cohort!
          </p>
        </div>
      </Col>
    </Row>


      {/* Team Member 5 */}
    <Row className="mb-5 mt-3 g-4">
      <Col lg={2}>
        <div className="d-flex justify-content-left">
          <Image
            className="pfp mb-3"
            src="m-han.jpg"
            alt="Team Member 5"
            fluid
          />
        </div>
      </Col>
      <Col lg={3}>
        <div className="text-left">
          <h4 className="mb-3 deep-sea-text">Min Jun Han</h4>
          <p className="light-gray">
            Summer Intern 2026
          </p>
          <p className="deep-sea-text">
            University of Hawaii at Mānoa
          </p>
          <p className="deep-sea-text">
            BS Computer Science
          </p>
        </div>
      </Col>
      <Col lg={7}>
        <div className="text-left">
          <p className="deep-sea-text">
            Throughout my time with HII, I learned how to prepare, research, and present a military-style briefing on a relevant topic surrounding PACOM.
          </p>
          <p className="deep-sea-text">
            HII has provided me with various skills that will help in furthering my development, 
            especially in doing military-style intelligence gathering, and presenting my findings through briefings and presentations.
          </p>
          <p className="deep-sea-text">
            My advice to future interns is don&apos;t be afraid to ask your mentors questions. Absorb everything you can throughout the internship, because all of it comes together in the final capstone project.
          </p>
          <p className="deep-sea-text">
            One of my favorite memories from the cohort year was learning from leaders of various local businesses about the military, current events, and AI integration in the workforce.
          </p>
        </div>
      </Col>
    </Row>

        {/* Team Member 2 */}
    <Row className="mb-5 mt-3 g-4">
      <Col lg={2}>
        <div className="d-flex justify-content-left">
          <Image
            className="pfp mb-3"
            src="/t-d-devore.JPG"
            alt="Team Member 2"
            fluid
          />
        </div>
      </Col>
      <Col lg={3}>
        <div className="text-left">
          <h4 className="mb-3 deep-sea-text">Tai Demura-Devore</h4>
          <p className="light-gray">
            Summer Intern 2026
          </p>
          <p className="deep-sea-text">
            University of Michigan
          </p>
          <p className="deep-sea-text">
            BSE Data Science
          </p>
        </div>
      </Col>
      <Col lg={7}>
        <div className="text-left">
          <p className="deep-sea-text">
            During my time with HII, I learned a lot about the domain, opportunities that exist, and how to communicate more effectively.
          </p>
          <p className="deep-sea-text">
            My current internship with Pac-Econ is through HII, and I&apos;ve really enjoyed working and learning with the team there. 
            I&apos;ve become a better communicator by learning how to distill my ideas into what&apos;s most important others to know.
          </p>
          <p className="deep-sea-text">
            My advice for future interns is to be excited to learn about various different things! 
            The wide breadth of what you learn in this internship is one of the best parts about this internship.
          </p>
          <p className="deep-sea-text">
            I really enjoyed hanging out with everyone after work hours. The program was great, in large part because of the people I was with.
          </p>
        </div>
      </Col>
    </Row> 
      
{/*
      Team Member 6 
      <Col lg={3}>
        <div className="text-center">
          <Image
            className="pfp mb-3"
            src="/images/team-6.jpg"
            alt="Team Member 6"
            fluid
            rounded
          />
          <h4 className="mt-3 deep-sea-text">Team Member Name</h4>
          <p className="deep-sea-text">
            Cohort Year
          </p>
          <p className="deep-sea-text">
            School
          </p>
          <p className="deep-sea-text">
            Major
          </p>
          <p className="deep-sea-text">
            A short description about this team member and their role in
            the program.
          </p>
        </div>
      </Col>

      Team Member 7
      <Col lg={3}>
        <div className="text-center">
          <Image
            className="pfp mb-3"
            src="/images/team-7.jpg"
            alt="Team Member 7"
            fluid
            rounded
          />
          <h4 className="mt-3 deep-sea-text">Team Member Name</h4>
          <p className="deep-sea-text">
            Cohort Year
          </p>
          <p className="deep-sea-text">
            School
          </p>
          <p className="deep-sea-text">
            Major
          </p>
          <p className="deep-sea-text">
            A short description about this team member and their role in
            the program.
          </p>
        </div>
      </Col>

      Team Member 8
      <Col lg={3}>
        <div className="text-center">
          <Image
            className="pfp mb-3"
            src="/images/team-8.jpg"
            alt="Team Member 8"
            fluid
            rounded
          />
          <h4 className="mt-3 deep-sea-text">Team Member Name</h4>
          <p className="deep-sea-text">
            Cohort Year
          </p>
          <p className="deep-sea-text">
            School
          </p>
          <p className="deep-sea-text">
            Major
          </p>
          <p className="deep-sea-text">
            A short description about this team member and their role in
            the program.
          </p>
        </div>
      </Col>
*/}
  </Container>
</section>
    
{/* Mailing List */}
<section className="section-spacing">
  <Container>
    <Row className="justify-content-center">
      <Col lg={6} className="text-center">
        <h2 className="display-5 fw-bold deep-sea-text mb-4">
          JOIN OUR MAILING LIST!
        </h2>
        <p className="mb-5 lead deep-sea-text">
          Stay updated on the latest news, events, and opportunities!
        </p>

        <div className="d-flex justify-content-center gap-3">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeoPsT4NDqSX_ywhbw-R-kbwmORkwoOVO3WHNucIc4JGd4iiQ/viewform"
            className="btn btn-lg text-white"
            style={{
              backgroundColor: "var(--sky-blue)",
              borderColor: "var(--sky-blue)",
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            CLICK HERE TO SIGN UP
          </a>
        </div>
      </Col>
    </Row>
  </Container>
</section>


{/* Media Highlights */}
<section className="section-spacing">
  <Container>
    <Row className="justify-content-left">
      <Col lg={12} className="text-left">
        <h2 className="display-7 deep-sea-text mt-4 mb-3">
          Media Highlights
        </h2>
        <p className="lead text-secondary mb-4">
          Check out the latest news and media coverage involving participants in our programs!
        </p>
      </Col>
    </Row>

    <Row className="justify-content-left">
      <Col md={4} className="text-left mt-4 mb-5">
        <div className="ratio ratio-16x9">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/bRKZa-vPEnI?si=GHdjD9nYUW-8Qzdw" title="YouTube video player" 
          frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </Col>

      <Col md={4} className="text-left mt-4">
        <div className="ratio ratio-16x9">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/Ghm13nyvuAU?si=QlnqH6BbzjjoorsQ" title="YouTube video player" 
          frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </Col>

      <Col md={4} className="text-left mt-4">
        <div className="ratio ratio-16x9">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/uF7CGGpu75I?si=itdW5ljHBywy6Lhl" title="YouTube video player" 
          frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </Col>

    </Row>
  </Container>
</section>

  </main>
);

export default Home;