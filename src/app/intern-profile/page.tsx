// TODO: Retrieve the intern's profile information from Prisma.
// TODO: Save updated profile information to the database.
// TODO: Implement permanent profile picture storage.
// TODO: Retrieve assigned projects from the database.
// TODO: Add form validation and error handling.
// TODO: Restrict profile access to authenticated interns.
'use client';

import { useSession } from 'next-auth/react';
import { useState, useRef } from 'react';
import {Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Camera } from 'react-bootstrap-icons';
import Select from 'react-select';

export default function InternProfilePage() {
  const { data: session } = useSession();

  const [profilePicture, setProfilePicture] =
    useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const email = session?.user?.email || '';

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

// Remove the uploaded picture and restore the default image
const handleRemovePicture = () => {
  setProfilePicture(null);

  // Reset the file input
  if (fileInputRef.current) {
    fileInputRef.current.value = '';
  }
};

  // Available areas of interest, feel free to add more options
const interestOptions = [
  { value: 'software-engineering', label: 'Software Engineering' },
  { value: 'data-science', label: 'Data Science' },
  { value: 'cybersecurity', label: 'Cybersecurity' },
  { value: 'ai', label: 'Artificial Intelligence' },
  { value: 'data-visualization', label: 'Data Visualization' },
  { value: 'cloud-computing', label: 'Cloud Computing' },
  { value: 'project-management', label: 'Project Management' },
  { value: 'machine-learning', label: 'Machine Learning' },
  { value: 'networking', label: 'Networking' },
  { value: 'other', label: 'Other' },
];

  return (
    
    <div className="intern-profile-page">
        <Container>

        <Card className="profile-card">
          <Card.Body className="p-4">

            <Row className="g-4">

              {/* Left: Profile picture and user information */}
              <Col lg={3} className="profile-sidebar">

                {/* Profile picture */}
                {/* Display uploaded profile picture or default image */}
                <div className="profile-picture-container">
                <img
                    src={profilePicture || '/Default_pfp.svg.webp'}
                    alt="Profile picture"
                    className="profile-picture"
                />

                {/* Camera button opens the image selection window */}
                <button
                    type="button"
                    className="profile-camera-button"
                    aria-label="Change profile picture"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <Camera size={20} />
                </button>
                </div>

                {/* Hidden image upload input */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  hidden
                />

                {/* User information */}
                <div className="profile-user-info">

                  <h3 className="profile-name">
                    {email.split('@')[0]}
                  </h3>

                  <p className="profile-email">
                    {email}
                  </p>

                  <span className="profile-role">
                    Intern
                  </span>

                </div>

                {/* Upload picture button */}
                <Button
                  type="button"
                  variant="outline-secondary"
                  className="profile-upload-button mt-4 w-100"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                >
                  {profilePicture
                    ? 'Change Profile Picture'
                    : 'Add Profile Picture'}
                </Button>

                {/* Only display the remove button if a picture is uploaded */}
                {profilePicture && (
                <Button
                    type="button"
                    variant="outline-danger"
                    className="profile-remove-button mt-2 w-100"
                    onClick={handleRemovePicture}
                >
                    Remove Profile Picture
                </Button>
                )}

              </Col>

              {/* Right: Profile form */}
              <Col lg={9}>

                <Form>
                  <Row className="g-3">

                    {/* First Name */}
                    <Col md={6}>
                      <Form.Group controlId="firstName">
                        <Form.Label>
                          First Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="First name"
                        />
                      </Form.Group>
                    </Col>

                    {/* Last Name */}
                    <Col md={6}>
                      <Form.Group controlId="lastName">
                        <Form.Label>
                          Last Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Last name"
                        />
                      </Form.Group>
                    </Col>

                    {/* Email */}
                    <Col md={12}>
                      <Form.Group controlId="email">
                        <Form.Label>
                          Email
                        </Form.Label>
                        <Form.Control
                          type="email"
                          value={email}
                          disabled
                        />
                      </Form.Group>
                    </Col>

                    {/* About Me */}
                    <Col md={12}>
                      <Form.Group controlId="bio">
                        <Form.Label>
                          About Me
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          placeholder="Write a brief introduction about yourself..."
                        />
                      </Form.Group>
                    </Col>

                    {/* University */}
                    <Col md={6}>
                      <Form.Group controlId="university">
                        <Form.Label>
                          University
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="University name"
                        />
                      </Form.Group>
                    </Col>

                    {/* Major */}
                    <Col md={6}>
                      <Form.Group controlId="major">
                        <Form.Label>
                          Major
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Major"
                        />
                      </Form.Group>
                    </Col>

                    {/* Expected Graduation */}
                    <Col md={6}>
                      <Form.Group controlId="graduation">
                        <Form.Label>
                          Expected Graduation
                        </Form.Label>
                        <Form.Control type="date" />
                      </Form.Group>
                    </Col>

                    {/* Title */}
                    <Col md={6}>
                      <Form.Group controlId="title">
                        <Form.Label>
                          Title
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value="Intern"
                          disabled
                        />
                      </Form.Group>
                    </Col>

                    {/* Mission Partner dropdown */}
                    <Col md={12}>
                    <Form.Group controlId="missionPartner">
                        <Form.Label>Mission Partner</Form.Label>
                        <Form.Select defaultValue="">
                        <option value="" disabled>
                            Select a mission partner
                        </option>
                        <option value="Pacific Economics">
                            Pacific Economics
                        </option>
                        <option value="Kapu Systems">
                            Kapu Systems
                        </option>
                        <option value="P3I">P3I</option>
                        <option value="MC3">MC3</option>
                        </Form.Select>
                    </Form.Group>
                    </Col>

                    {/* Interests */}
                    {/* Allow interns to select multiple areas of interest */}
                    <Col md={6}>
                    <Form.Group controlId="interests">
                        <Form.Label>Interests</Form.Label>

                        <Select
                        inputId="interests"
                        instanceId="interests"
                        isMulti
                        options={interestOptions}
                        placeholder="Select interests..."
                        classNamePrefix="interest-select"
                        closeMenuOnSelect={false}
                        />
                    </Form.Group>
                    </Col>

                    {/* Assigned Projects */}
                    <Col md={6}>
                      <Form.Group controlId="projects">
                        <Form.Label>
                          Projects
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          value="No projects assigned"
                          readOnly
                        />
                      </Form.Group>
                    </Col>

                    {/* Update Profile */}
                    <Col md={12}>
                      <Button
                        type="button"
                        className="profile-update-button"
                        disabled
                      >
                        Update Profile
                      </Button>
                    </Col>

                  </Row>
                </Form>

              </Col>
            </Row>

          </Card.Body>
        </Card>

      </Container>
    </div>
  );
}