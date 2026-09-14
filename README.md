## Installation

1. **Install PostgreSQL** and create a database for your app:
	```bash
	createdb nextjs-application-template
	```

2. **Install dependencies:**
	```bash
	npm install
	```

3. **Create your .env file:**
	- Copy `sample.env` to `.env` and update the `DATABASE_URL` to match your PostgreSQL setup.

4. **Run database migrations:**
	```bash
	npx prisma migrate dev
	```

5. **Generate Prisma client:**
	```bash
	npx prisma generate
	```

6. **Seed the database:**
	```bash
	npm run seed
	```

7. **Start the development server:**
	```bash
	npm run dev
	```

The app will be available at [http://localhost:3000](http://localhost:3000).

See the [template documentation](http://ics-software-engineering.github.io/nextjs-application-template/) for more details and walkthroughs.
