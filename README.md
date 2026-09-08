<div align="center">

# 🩺 Doctori

### AI-Assisted Doctor Discovery & Appointment Management Platform

A full-stack healthcare appointment platform that connects **patients, doctors, and administrators** through role-based dashboards, intelligent doctor recommendations, schedule management, secure payments, prescriptions, and reviews.

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.x-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?logo=stripe&logoColor=white)](https://stripe.com/)

**Repository:** [github.com/ahmadakil67/Doctori](https://github.com/ahmadakil67/Doctori)

</div>

---

## Overview

**Doctori** is a full-stack healthcare management application designed around a complete appointment lifecycle.

Patients can discover doctors by specialty, use an AI-assisted symptom-to-doctor recommendation flow, select an available schedule, pay through Stripe, track appointments, receive prescriptions, and submit reviews. Doctors can manage their assigned schedules and appointments, update appointment status, and create prescriptions. Administrators can manage core platform data and monitor system-level statistics.

The project uses a modern **Next.js + Express + PostgreSQL** architecture with **Prisma ORM**, **JWT-based authentication**, **Stripe Checkout**, **OpenRouter-powered AI recommendations**, and **Cloudinary** for media handling.

> **Medical disclaimer:** Doctori's AI recommendation feature is intended only to help route users toward potentially relevant specialties/doctors. It is not a diagnostic system and must not be treated as a substitute for professional medical advice, diagnosis, or emergency care.

---

## ✨ Key Features

### 🤖 AI-Assisted Doctor Recommendation
- Patients describe their symptoms in natural language.
- The backend sends a compact list of available doctors and specialties to an LLM through **OpenRouter**.
- The AI recommends up to three relevant doctors from the platform database.
- Recommendations are constrained to existing doctors instead of inventing providers.
- Users can continue directly to the doctor's profile and appointment flow.

### 👤 Patient Experience
- Patient registration and secure login
- Role-based patient dashboard
- Search and filter doctors
- Browse doctors by specialty
- View doctor profile, experience, fee, rating, workplace, and specialty
- View available appointment slots
- Book appointments
- Stripe Checkout payment
- Automatic payment status synchronization through Stripe webhooks
- View appointment history and current status
- View prescriptions
- Submit ratings and reviews after completed appointments
- Profile and password management

### 👨‍⚕️ Doctor Experience
- Role-based doctor dashboard
- View assigned schedules
- View patient appointments
- Update appointment status
- Create prescriptions for eligible completed and paid appointments
- Access appointment and patient-related workflow data
- Profile management

### 🛡️ Admin Experience
- Role-based admin dashboard
- Manage doctors
- Manage patients/users
- Manage specialties
- Create and manage schedules
- Assign schedules to doctors
- Monitor appointment and platform metadata
- View revenue and activity statistics

### 💳 Payments
- Stripe-hosted Checkout
- Appointment fee captured from doctor profile
- Appointment/payment IDs stored in Stripe Checkout metadata
- `checkout.session.completed` webhook processing
- Automatic appointment and payment status update to `PAID`
- Unpaid appointments are automatically cleaned up after the configured grace period and their slots are released

### ⭐ Reviews & Ratings
- Patients can review completed appointments
- Ratings are associated with doctors
- Doctor average ratings are reflected in doctor data
- Reviews can be displayed on doctor profiles

### 🔐 Authentication & Authorization
- JWT access and refresh tokens
- Role-based access control for `ADMIN`, `DOCTOR`, and `PATIENT`
- Password hashing with bcrypt
- Forgot/reset password flow
- Email-based password reset
- Change password support
- Protected API routes

---

## 🧭 Core User Journey

```mermaid
flowchart LR
    A[Patient Login] --> B[Find Doctor]
    B --> C{Discovery Method}
    C -->|Search / Specialty| D[Doctor Profile]
    C -->|AI Symptoms| D
    D --> E[Choose Available Slot]
    E --> F[Create Appointment]
    F --> G[Stripe Checkout]
    G --> H[Stripe Webhook]
    H --> I[Payment = PAID]
    I --> J[Doctor Manages Appointment]
    J --> K[Appointment Completed]
    K --> L[Doctor Creates Prescription]
    L --> M[Patient Views Prescription]
    K --> N[Patient Submits Review]
```

---

## 🏗️ Architecture

```mermaid
flowchart TB
    U[Browser / User] --> FE[Next.js 16 Client]
    FE --> API[Express 5 REST API]
    API --> AUTH[JWT Auth & RBAC]
    API --> ORM[Prisma ORM]
    ORM --> DB[(PostgreSQL)]
    API --> AI[OpenRouter AI]
    API --> STRIPE[Stripe Checkout]
    API --> CLOUD[Cloudinary]
    API --> MAIL[Email / SMTP]
    STRIPE -->|Webhook| API
```

### Frontend
The client uses **Next.js App Router**, React, TypeScript, Tailwind CSS, shadcn/Radix UI primitives, Lucide icons, and reusable service modules for server communication.

### Backend
The API uses a modular **Express + TypeScript** architecture organized by domain modules such as authentication, users, doctors, schedules, appointments, prescriptions, payments, reviews, and metadata.

### Database
The backend uses **PostgreSQL** with **Prisma ORM** and a multi-file Prisma schema.

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | Next.js 16.2 |
| UI Library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn / Radix UI |
| Icons | Lucide React |
| Backend | Node.js + Express 5 |
| Database | PostgreSQL |
| ORM | Prisma 7 |
| Authentication | JWT + bcrypt |
| Validation | Zod |
| Payments | Stripe Checkout + Webhooks |
| AI Integration | OpenRouter via OpenAI SDK |
| Media Storage | Cloudinary |
| Email | Nodemailer |
| Scheduling / Cleanup | node-cron |

---

## 📁 Project Structure

```text
Doctori/
├── doctori-client/                 # Next.js frontend
│   ├── public/
│   ├── src/
│   │   ├── app/                    # App Router pages/layouts
│   │   ├── components/             # Shared and feature UI
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── services/               # API/service layer
│   │   ├── types/
│   │   ├── zod/
│   │   └── proxy.ts
│   ├── package.json
│   └── ...
│
├── doctori-server/                 # Express REST API
│   ├── prisma/
│   │   └── schema/                 # Multi-file Prisma schema
│   ├── src/
│   │   ├── app/
│   │   │   ├── errors/
│   │   │   ├── helper/
│   │   │   ├── middlewares/
│   │   │   ├── modules/
│   │   │   │   ├── appointment/
│   │   │   │   ├── auth/
│   │   │   │   ├── doctor/
│   │   │   │   ├── doctorSchedule/
│   │   │   │   ├── meta/
│   │   │   │   ├── patient/
│   │   │   │   ├── payment/
│   │   │   │   ├── prescription/
│   │   │   │   ├── review/
│   │   │   │   ├── schedule/
│   │   │   │   ├── specialties/
│   │   │   │   └── user/
│   │   │   ├── routes/
│   │   │   ├── shared/
│   │   │   └── type/
│   │   ├── config/
│   │   ├── app.ts
│   │   └── server.ts
│   └── package.json
│
└── README.md
```

---

## 🔌 API Overview

The backend API is served under:

```text
/api/v1
```

| Module | Base Route | Purpose |
|---|---|---|
| Authentication | `/api/v1/auth` | Login, refresh token, password flows, current session |
| Users | `/api/v1/user` | User creation, profile, status management |
| Doctors | `/api/v1/doctors` | Doctor listing, details, filters, updates, AI suggestion |
| Specialties | `/api/v1/specialties` | Medical specialty management |
| Schedules | `/api/v1/schedule` | Schedule creation and retrieval |
| Doctor Schedules | `/api/v1/doctor-schedule` | Doctor-slot assignments |
| Appointments | `/api/v1/appointment` | Booking, appointment retrieval, status updates |
| Prescriptions | `/api/v1/prescription` | Prescription workflow |
| Reviews | `/api/v1/review` | Patient ratings and reviews |
| Metadata | `/api/v1/metadata` | Role-aware dashboard statistics |

Stripe webhook endpoint:

```text
POST /webhook
```

## 🔐 Demo Credentials

For recruiters, reviewers, or developers who want to explore the admin dashboard:

| Role | Email | Password |
|---|---|---|
| Admin | `admin@admin.com` | `12345678` |

> **Note:** This account is intended for demonstration purposes only. Please avoid deleting or modifying critical test data.
---

## 🚀 Local Development

### Prerequisites

- Node.js 20+
- npm
- PostgreSQL
- Git
- Stripe CLI for local webhook testing
- Stripe, OpenRouter, Cloudinary, and SMTP/email credentials

### 1. Clone the Repository

```bash
git clone https://github.com/ahmadakil67/Doctori.git
cd Doctori
```

### 2. Configure the Backend

```bash
cd doctori-server
npm install
```

Create `doctori-server/.env`:

```env
NODE_ENV=development
PORT=5000

DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/doctori-db?schema=public
CLIENT_URL=http://localhost:3000

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

OPENROUTES_API_KEY=your_openrouter_api_key

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_signing_secret

EMAIL=your_email
APP_PASS=your_email_app_password

JWT_SECRET=your_access_token_secret
EXPIRES_IN=1h
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRES_IN=90d

RESET_PASS_TOKEN=your_reset_password_secret
RESET_PASS_TOKEN_EXPIRES_IN=10m
RESET_PASS_LINK=http://localhost:3000/reset-password

SALT_ROUND=12
```

> Never commit `.env`, Stripe secrets, JWT secrets, Cloudinary credentials, email credentials, or OpenRouter keys.

### 3. Prepare the Database

```bash
npm run db:generate
npm run db:push
```

Optional database UI:

```bash
npx prisma studio
```

### 4. Start the Backend

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

### 5. Configure Stripe Webhooks Locally

```bash
stripe login
```

Make sure the CLI is connected to the **same Stripe test environment/sandbox** used by the backend API key.

```bash
stripe listen --events checkout.session.completed --forward-to http://localhost:5000/webhook
```

Stripe will display a webhook signing secret beginning with `whsec_...`. Put it in `.env`:

```env
STRIPE_WEBHOOK_SECRET=whsec_...
```

Restart the backend after changing `.env` and keep the Stripe CLI listener running while testing payments.

### 6. Start the Frontend

Open another terminal:

```bash
cd doctori-client
npm install
npm run dev
```

Frontend:

```text
http://localhost:3000
```

If the default Next.js dev bundler behaves poorly on a Windows/slow drive:

```bash
npm run dev -- --webpack
```

---

## 💳 Payment Lifecycle

1. Patient selects a doctor and available schedule.
2. Backend creates the appointment.
3. The doctor schedule is marked as booked.
4. A payment record is created.
5. A Stripe Checkout session is created.
6. Appointment ID and payment ID are stored in Stripe metadata.
7. Patient completes Checkout.
8. Stripe sends `checkout.session.completed` to `/webhook`.
9. The backend verifies the webhook signature.
10. Appointment and payment records are updated to `PAID`.
11. Patient returns to the appointment page.

Unpaid appointments older than the cleanup threshold are removed by a scheduled job and the related doctor slot is released.

---

## 🤖 AI Recommendation Flow

Doctori's AI doctor recommendation feature uses the user's symptom description together with a compact representation of doctors stored in the platform.

The model receives fields such as doctor ID, name, designation, experience, appointment fee, average rating, and assigned specialties. The prompt restricts recommendations to doctors supplied by the database and returns structured JSON for the frontend.

This keeps the AI focused on **matching symptoms to available specialties/providers**, rather than generating fictional doctors.

---

## 🔐 Security Practices

Doctori includes:

- Password hashing with bcrypt
- JWT access and refresh tokens
- Role-based route authorization
- User status validation
- Zod request validation
- Stripe webhook signature verification
- Protected patient/doctor/admin operations
- Environment-based credential management
- Ownership checks for doctor appointment updates

### Production checklist

Before production deployment:

- Rotate all development/test secrets
- Never hardcode API keys or webhook signing secrets
- Use environment-specific Stripe webhook endpoints
- Replace localhost CORS with approved production origins
- Use HTTPS
- Add rate limiting
- Add security headers such as Helmet
- Add automated tests
- Configure structured logging/monitoring
- Review medical/privacy requirements for the target jurisdiction

---

## 📊 Dashboard Data

### Patient
- Appointment count
- Prescription count
- Review count
- Appointment status distribution

### Doctor
- Appointment count
- Patient count
- Review count
- Revenue
- Appointment status distribution

### Admin
- Patient count
- Doctor count
- Admin count
- Appointment count
- Payment count
- Revenue
- Appointment/statistical data

---

## 🧪 Suggested End-to-End Test Scenario

```text
Admin
  → Create specialty
  → Create doctor
  → Assign specialty
  → Create schedule
  → Assign schedule to doctor

Patient
  → Register/Login
  → Search or use AI recommendation
  → Open doctor profile
  → Choose schedule
  → Book appointment
  → Complete Stripe payment
  → Confirm PAID status

Doctor
  → Login
  → View appointment
  → Update status
  → Mark appointment COMPLETED
  → Create prescription

Patient
  → View prescription
  → Submit rating/review

Admin
  → Verify dashboard metadata
```

---

## 🗺️ Roadmap

Potential future improvements:

- Video consultation
- Patient health-record timeline
- Medical report upload/view workflow
- Email/SMS appointment reminders
- Calendar integration
- Production deployment and CI/CD
- Automated unit/integration/E2E tests
- Audit logs
- Notification center
- More structured prescription data
- Stronger AI safety and clinical-routing guardrails

---

## 👨‍💻 Author

**Ahmad Akil**  
GitHub: [@ahmadakil67](https://github.com/ahmadakil67)

---

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make focused changes.
4. Test the relevant workflow.
5. Open a pull request with a clear description.

```bash
git checkout -b feature/your-feature
git commit -m "Add your feature"
git push origin feature/your-feature
```

---

<div align="center">

Built to explore a modern, role-based healthcare workflow with AI-assisted doctor discovery.

**Doctori — Find the right doctor, book with confidence.**

</div>
