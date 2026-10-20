
import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const interns = [
  {
    email: 'rodrick@example.com',
    firstName: 'Rodrick Heffley',
    lastName: 'Heffley',
    school: 'University of Hawaii',
    major: 'Computer Science',
    graduationDate: new Date('2027-05-15'),
    skills: ['Python', 'SQL', 'React'],
    interests: ['Data Science', 'Data Visualization'],
    status: 'Active',
  },
  {
    email: 'greg@example.com',
    firstName: 'Greg',
    lastName: 'Heffley',
    school: 'University of Hawaii',
    major: 'Cybersecurity',
    graduationDate: new Date('2027-12-15'),
    skills: ['Networking', 'Linux', 'Python'],
    interests: ['Cybersecurity', 'Dev-Ops'],
    status: 'Active',
  },
  {
    email: 'taylor@example.com',
    firstName: 'Taylor',
    lastName: 'Smith',
    school: 'Hawaii Pacific University',
    major: 'Information Systems',
    graduationDate: new Date('2028-05-15'),
    skills: ['SQL', 'Excel', 'Power BI'],
    interests: ['Software Development', 'Full-Stack Development'],
    status: 'Pending',
  },
];

async function main() {
  for (const intern of interns) {
    const {
      email,
      firstName,
      lastName,
      school,
      major,
      graduationDate,
      skills,
      interests,
      status,
    } = intern;

    await prisma.user.upsert({
      where: { email },
      update: {
        role: 'INTERN',
        internProfile: {
          upsert: {
            create: {
              firstName,
              lastName,
              school,
              major,
              graduationDate,
              skills,
              interests,
              status,
            },
            update: {
              firstName,
              lastName,
              school,
              major,
              graduationDate,
              skills,
              interests,
              status,
            },
          },
        },
      },
      create: {
        email,
        role: 'INTERN',
        internProfile: {
          create: {
            firstName,
            lastName,
            school,
            major,
            graduationDate,
            skills,
            interests,
            status,
          },
        },
      },
    });
  }

  console.log('Sample interns created successfully!');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
