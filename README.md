# Patient Management Application

This is a full-stack Patient Management Application developed using React (frontend) and Node.js with Express and SQLite (backend). It allows users to manage patient records, including adding, editing, deleting, and viewing patient details.
<img width="1486" alt="image" src="https://github.com/user-attachments/assets/ce04d80b-b2fe-46e7-b6f6-20ea845c1da5" />

<img width="1503" alt="image" src="https://github.com/user-attachments/assets/81c8b7f4-c78c-4c28-9226-57f560624df6" />
<img width="1492" alt="image" src="https://github.com/user-attachments/assets/5c34891a-635c-4dba-8e07-485b9a05bba5" />
<img width="1490" alt="image" src="https://github.com/user-attachments/assets/9014ac02-2ef5-4ddd-95bc-ad1fafb69473" />


## Technologies Used

- **Frontend:** React, TypeScript, Material UI
- **Backend:** Node.js, Express.js, Axios, MySQL
- **Database:** SQLite
- **Testing:** Jest, React Testing Library
- **Tools:** Docker, Postman (for API testing)

## Project Structure

### Frontend

- `components`: Reusable UI components.
- `services`: Axios services for API interaction.
- `types`: TypeScript interfaces.
- `tests`: Automated test cases using Jest.

### Backend

- `index.js`: Main server entry point.
- `controllers`: Logic for handling CRUD operations.
- `routes`: API route definitions.
- `database`: SQLite database configuration.

---

## Setup and Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (v18+)
- SQLite3
- npm (v9+)

---

### Setup

1. `Git clone`
2. Install dependencies: `npm install`
3. `npm start`

The app will be available at `http://localhost:3000`.

---

### Backend Setup

1. Navigate to the backend directory:
   `cd patients-backend`

2. Install dependencies:
   `npm install`

3. Create a `.env` file and configure the database path and server port:

`PORT=5000`
`DB_PATH=./patients.db`

4. Start the backend server: `node server.js`

5. The backend server will run at `http://localhost:5000`.

---

### Database Setup

The backend uses SQLite as a lightweight database. If the database file (patients.db) does not exist, it will be created automatically. To manually create the database, use the following schema:

CREATE TABLE patients (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
dob TEXT NOT NULL,
condition TEXT NOT NULL,
appointment_date TEXT NOT NULL
);

CREATE TABLE appointments (
id INTEGER PRIMARY KEY AUTOINCREMENT,
patient_id INTEGER,
appointment_date TEXT NOT NULL,
details TEXT,
FOREIGN KEY(patient_id) REFERENCES patients(id)
);
#### Open http://localhost:3000 in your browser

### API Endpoints
Patients:
`GET /api/patients` - Fetch all patients.
`GET /api/patients/:id` - Fetch a specific patient by ID.
`POST /api/patients` - Add a new patient.
`PUT /api/patients/:id` - Update a patient by ID.
`DELETE /api/patients/:id` - Delete a patient by ID.
Appointments:
`GET /api/appointments` - Fetch all appointments.
`POST /api/appointments` - Create a new appointment.
`DELETE /api/appointments/:id` - Delete an appointment by ID.

### Testing 

Run `npm test`
