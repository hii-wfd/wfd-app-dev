// TODO: Retrieve the intern's profile information from Prisma.
// TODO: Save updated profile information to the database.
// TODO: Implement permanent profile picture storage.
// TODO: Retrieve assigned projects from the database.
// TODO: Add form validation and error handling.
// TODO: Restrict profile access to authenticated interns.
// TODO: Retrieve profile information from Prisma.
// TODO: Save updated profile information to the database.
// TODO: Implement permanent profile picture storage.
// TODO: Retrieve assigned projects from the database.
// TODO: Add additional form validation.
// TODO: Implement role-based profile access.

'use client';

import { useSession } from 'next-auth/react';
import { useState, useRef, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from 'react-bootstrap';
import { Camera } from 'react-bootstrap-icons';
import Select from 'react-select';

// Default profile information
const initialProfile = {
  firstName: '',
  lastName: '',
  bio: '',
  university: '',
  major: '',
  graduation: '',
  missionPartner: '',
  interests: [] as string[],
};

// Available areas of interest
// Feel free to add more options
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

export default function InternProfilePage() {
  const { data: session, status } = useSession();

  const email = session?.user?.email || '';

  // Wait for the user's session
  if (status === 'loading') {
    return null;
  }

  // Only display the profile to signed-in users
  if (!email) {
    return (
      <div className="intern-profile-page">
        <Container>
          <Alert variant="warning">
            Please sign in to view your profile.
          </Alert>
        </Container>
      </div>
    );
  }

  // Reset the profile component when the account changes
  return <ProfileForm key={email} email={email} />;
}

function ProfileForm({ email }: { email: string }) {
  // Store the profile picture
  const [profilePicture, setProfilePicture] =
    useState<string | null>(null);

  // Store editable profile information
  const [profile, setProfile] = useState(initialProfile);

  // Display success or error messages
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<
    'success' | 'danger'
  >('success');

  const [loaded, setLoaded] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Reference to the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Separate local storage key for each user
  const storageKey = `profile-${email}`;

  // Load previously saved profile information
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem(storageKey);

      if (savedProfile) {
        const data = JSON.parse(savedProfile);

        setProfile({
          ...initialProfile,
          ...data.profile,
        });

        setProfilePicture(data.profilePicture || null);
      }
    } catch {
      setMessageType('danger');
      setMessage('Unable to load saved profile information.');
    } finally {
      setLoaded(true);
    }
  }, [storageKey]);

  // Handle profile picture upload
  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Check that the selected file is an image
    if (!file.type.startsWith('image/')) {
      setMessageType('danger');
      setMessage('Please select a valid image.');
      event.target.value = '';
      return;
    }

    // Limit image size to 2 MB for local storage
    if (file.size > 2 * 1024 * 1024) {
      setMessageType('danger');
      setMessage('Please select an image smaller than 2 MB.');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();

    setUploading(true);

    reader.onload = () => {
      setProfilePicture(reader.result as string);
      setMessage('');
    };

    reader.onerror = () => {
      setMessageType('danger');
      setMessage('Unable to upload profile picture.');
    };

    reader.onloadend = () => {
      setUploading(false);
    };

    reader.readAsDataURL(file);

    // Allow the same file to be selected again
    event.target.value = '';
  };

  // Remove uploaded picture and restore the default image
  const handleRemovePicture = () => {
    setProfilePicture(null);
    setMessage('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Update individual profile fields
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage('');
  };

  // Save updated profile information to local storage
  const handleUpdateProfile = (event: React.FormEvent) => {
    event.preventDefault();

    if (!loaded || uploading) return;

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          profile,
          profilePicture,
        })
      );

      setMessageType('success');
      setMessage('Profile updated successfully!');
    } catch {
      setMessageType('danger');
      setMessage(
        'Unable to save profile. Try using a smaller profile picture.'
      );
    }
  };

  if (!loaded) {
    return null;
  }

  return (
    <div className="intern-profile-page">
      <Container>
        <Card className="profile-card">
          <Card.Body className="p-4">
            <Row className="g-4">

              {/* Left: Profile picture and user information */}
              <Col lg={3} className="profile-sidebar">

                {/* Display uploaded picture or default image */}
                <div className="profile-picture-container">
                  <img
                    src={
                      profilePicture || '/Default_pfp.svg.webp'
                    }
                    alt="Profile picture"
                    className="profile-picture"
                  />

                  {/* Camera button opens image selection */}
                  <button
                    type="button"
                    className="profile-camera-button"
                    aria-label="Change profile picture"
                    disabled={uploading}
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

                  {/* Display full name or email username */}
                  <h3 className="profile-name">
                    {`${profile.firstName} ${profile.lastName}`.trim() ||
                      email.split('@')[0]}
                  </h3>

                  <p className="profile-email">
                    {email}
                  </p>

                  {/* Temporary display title for test account */}
                  <span className="profile-role">
                    Intern
                  </span>
                </div>

                {/* Upload picture button */}
                <Button
                  type="button"
                  variant="outline-secondary"
                  className="profile-upload-button mt-4 w-100"
                  disabled={uploading}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {profilePicture
                    ? 'Change Profile Picture'
                    : 'Add Profile Picture'}
                </Button>

                {/* Only display remove button if a picture exists */}
                {profilePicture && (
                  <Button
                    type="button"
                    variant="outline-danger"
                    className="profile-remove-button mt-2 w-100"
                    disabled={uploading}
                    onClick={handleRemovePicture}
                  >
                    Remove Profile Picture
                  </Button>
                )}

              </Col>

              {/* Right: Profile form */}
              <Col lg={9}>

                <Form onSubmit={handleUpdateProfile}>
                  <Row className="g-3">

                    {/* First Name */}
                    <Col md={6}>
                      <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>

                        <Form.Control
                          type="text"
                          name="firstName"
                          placeholder="First name"
                          value={profile.firstName}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>

                    {/* Last Name */}
                    <Col md={6}>
                      <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>

                        <Form.Control
                          type="text"
                          name="lastName"
                          placeholder="Last name"
                          value={profile.lastName}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>

                    {/* Email */}
                    <Col md={12}>
                      <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>

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
                        <Form.Label>About Me</Form.Label>

                        <Form.Control
                          as="textarea"
                          rows={4}
                          name="bio"
                          value={profile.bio}
                          onChange={handleChange}
                          placeholder="Write a brief introduction about yourself..."
                        />
                      </Form.Group>
                    </Col>

                    {/* University */}
                    <Col md={6}>
                      <Form.Group controlId="university">
                        <Form.Label>University</Form.Label>

                        <Form.Control
                          type="text"
                          name="university"
                          placeholder="University name"
                          value={profile.university}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>

                    {/* Major */}
                    <Col md={6}>
                      <Form.Group controlId="major">
                        <Form.Label>Major</Form.Label>

                        <Form.Control
                          type="text"
                          name="major"
                          placeholder="Major"
                          value={profile.major}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>

                    {/* Expected Graduation */}
                    <Col md={6}>
                      <Form.Group controlId="graduation">
                        <Form.Label>
                          Expected Graduation
                        </Form.Label>

                        <Form.Control
                          type="date"
                          name="graduation"
                          value={profile.graduation}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>

                    {/* Title */}
                    <Col md={6}>
                      <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>

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
                        <Form.Label>
                          Mission Partner
                        </Form.Label>

                        <Form.Select
                          name="missionPartner"
                          value={profile.missionPartner}
                          onChange={handleChange}
                        >
                          <option value="">
                            Select a mission partner
                          </option>

                          <option value="Pacific Economics">
                            Pacific Economics
                          </option>

                          <option value="Kapu Systems">
                            Kapu Systems
                          </option>

                          <option value="P3I">
                            P3I
                          </option>

                          <option value="MC3">
                            MC3
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    {/* Interests multi-select dropdown */}
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
                          value={interestOptions.filter((option) =>
                            profile.interests.includes(option.value)
                          )}
                          onChange={(selected) => {
                            setProfile((prev) => ({
                              ...prev,
                              interests: selected.map(
                                (option) => option.value
                              ),
                            }));

                            setMessage('');
                          }}
                        />
                      </Form.Group>
                    </Col>

                    {/* Assigned Projects */}
                    <Col md={6}>
                      <Form.Group controlId="projects">
                        <Form.Label>Projects</Form.Label>

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
                        type="submit"
                        className="profile-update-button"
                        disabled={!loaded || uploading}
                      >
                        Update Profile
                      </Button>

                      {/* Display success or error message */}
                      {message && (
                        <Alert
                          variant={messageType}
                          className="mt-3 mb-0"
                          dismissible
                          onClose={() => setMessage('')}
                        >
                          {message}
                        </Alert>
                      )}
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