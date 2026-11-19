
'use client';

import { useSession } from 'next-auth/react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const resources = [
  {
    name: 'Costpoint',
    logo: '/costpoint-logo.jpeg',
    url: 'https://login.hii.com/home/hii_costpointtessmtprod_1/0oasgn4y8DhAFpHRR0j6/alnsgnegjtYgL00Eb0j6',
  },
  {
    name: 'MyHR',
    logo: '/myhr-logo.png',
    url: 'https://login.hii.com/home/bookmark/0oasf2mcuNOII1pg20j6/2557',
  },
  {
    name: 'HII Dashboard',
    logo: '/hii-logo.png',
    url: 'https://login.hii.com/app/UserHome?session_hint=AUTHENTICATED',
  },
  {
    name: 'HII Success Factors',
    logo: '/hii-logo.png',
    url: 'https://performancemanager4.successfactors.com/sf/home?bplte_company=hiitechnic#/',
  },
];

const InternPage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Container className="py-5 ">Loading...</Container>;
  }

  if (status === 'unauthenticated') {
    return (
      <Container className="py-5">
        Please sign in to view your dashboard.
      </Container>
    );
  }

  const email = session?.user?.email ?? 'Intern';
  const name = session?.user?.name || email;

  return (
    <main className="intern-dashboard">
      <Container className="py-5 pb-5">

        {/* Welcome Section */}
        <div className="mb-5">
          <h1 className="intern-page-title">
            Intern Dashboard
          </h1>

          <p className="intern-welcome">
            Welcome back, {name}
          </p>
        </div>

        {/* My Progress - Heading Only */}
        <section className="mb-5">
          <h2 className="intern-section-title">
            My Progress
          </h2>
        </section>

        {/* Announcements and Upcoming Events */}
        <section className="mb-5">
          <Row className="g-4">

            {/* Announcements */}
            <Col md={6}>
              <h2 className="intern-section-title">
                Announcements
              </h2>

              <Card className="intern-info-card">
                <Card.Body />
              </Card>
            </Col>

            {/* Upcoming Events and Deadlines */}
            <Col md={6}>
              <h2 className="intern-section-title">
                Upcoming Events & Deadlines
              </h2>

              <Card className="intern-info-card">
                <Card.Body />
              </Card>
            </Col>

          </Row>
        </section>

        {/* My Work Resources */}
        <section className="mb-4">
          <h2 className="intern-section-title">
            My Work Resources
          </h2>

          <Row className="g-4">
            {resources.map((resource) => (
              <Col lg={3} md={6} key={resource.name}>
                <Card className="intern-resource-card h-100">

                  {resource.url ? (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="intern-resource-clickable"
                      aria-label={`Open ${resource.name}`}
                    >
                      <div className="intern-resource-content">
                        {resource.logo ? (
                          <img
                            src={resource.logo}
                            alt={resource.name}
                            className="intern-resource-logo"
                          />
                        ) : (
                          <div className="intern-logo-placeholder">
                            Logo
                          </div>
                        )}

                        <h3 className="intern-resource-name">
                          {resource.name}
                        </h3>
                      </div>
                    </a>
                  ) : (
                    <div className="intern-resource-content">
                      {resource.logo ? (
                        <img
                          src={resource.logo}
                          alt={resource.name}
                          className="intern-resource-logo"
                        />
                      ) : (
                        <div className="intern-logo-placeholder">
                          Logo
                        </div>
                      )}

                      <h3 className="intern-resource-name">
                        {resource.name}
                      </h3>
                    </div>
                  )}

                </Card>
              </Col>
            ))}
          </Row>
        </section>

      </Container>
    </main>
  );
};

export default InternPage;
