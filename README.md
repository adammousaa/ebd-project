
# Carbon Finance for Sustainable Farming

**Course:** Electronic Business Development (BINF 503)  
**Semester:** Winter 2025  
**Instructor:** Dr. Nourhan Hamdi  
**Teaching Assistants:** Mr. Nour Gaser, Mr. Omar Alaa

---

## 1. Team Members

_List all team members (5-6 students) below._

| Name             | Student ID | Tutorial Group | GitHub Username |
| :--------------- | :--------- | :------------- | :-------------- |
| jana soliman     | 13001034   |  T2            | jhsoliman       |
| rana magdy       | 13004373   |  T3            | Ranamagdy       |
| adam moussa      | 13007150   |  T4            | adam ahmed      |
| mahmoud ghaly    | 13006972   |  T4            | mahmoud ghaly   |
| farida farag     | 13005412   |  T3            | faridafarag     |
| maryam basim     | 13005731   |  T3            | maryambasimm    |

---

## 2. Project Description

_Provide a detailed description of your project concept here. What is the app? What problem does it solve?_

- **Concept:** Our project is a Carbon Finance Platform that helps Egyptian farmers become more sustainable while earning extra income. Farmers register their land, set their location, and receive AI-powered recommendations on how to reduce emissions, save water, and use resources more efficiently.

As farmers adopt these practices, the platform tracks their reduced carbon emissions and converts them into Carbon Credits. These credits can then be purchased by companies that want to offset their own emissions. This creates a trusted bridge between farmers and corporate buyers, giving farmers a new, reliable revenue stream simply for improving their environmental impact.

Our platform makes sustainability practical, measurable, and profitable—benefiting both farmers and the planet.
The platform includes:
- Smart farm location mapping
- AI-based sustainability recommendations
- Automated carbon reduction tracking
- Carbon credit generation
- Marketplace for companies to purchase carbon credits

- **Link to Fin-Tech Course Document:** [Insert Link if applicable]

---

## 3. Feature Breakdown

### 3.1 Full Scope

_List ALL potential features/user stories envisioned for the complete product (beyond just this course)._

User Management

Farm Management

AI Sustainability Advisor

Emission Tracking & Analytics

Carbon Credit Generation

Carbon Marketplace

Wallet & Payments

Notifications System

Admin Panel


### 3.2 Selected MVP Use Cases (Course Scope)

_From the list above, identify the **5 or 6 specific use cases** you will implement for this course. Note: User Authentication is mandatory._

1.  User authentication (Registration/Login)
 2. Farm Registration & GPS Location Mapping
 3. AI Emission Reduction Recommendations (Basic Version)
 4. Carbon Emission Tracking Dashboard (Simplified)
 5. Carbon Credit Generation (Simulated for MVP)
 6. Carbon Credit Purchase Request (Simple Workflow)
---

## 4. Feature Assignments (Accountability)

_Assign one distinct use case from Section 3.2 to each team member. This member is responsible for the full-stack implementation of this feature._

| Team Member | Assigned Use Case       | Brief Description of Responsibility              |
| :---------- | :---------------------- | :----------------------------------------------- |
| adam        | **User Authentication** | Register, Login, JWT handling, Password Hashing. |
| mariam      | Farm Registration       | Form , location mapping backend                  |
| rana        | AI Recommendations      | Simple engine for MVP                            |
| jana        | Emission Tracking       | Backend endpoint, charts in frontend             |
| mahmoud     | Carbon Credit Generation| Convert emission reductions into credit          |
| farida      | Purchase Requests       | Company purchase page, request handling          |

---

## 5. Data Model (Initial Schemas)

_Define the initial Mongoose Schemas for your application’s main data models (User, Transaction, Account, etc.). You may use code blocks or pseudo-code._

UserSchema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["farmer", "company"], required: true },
  createdAt: { type: Date, default: Date.now }
});

FarmSchema
const FarmSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  location: {
    lat: { type: Number, required: true },
    long: { type: Number, required: true }
  },
  size: { type: Number, required: true }, 
  cropType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

EmissionRecordSchema
const EmissionRecordSchema = new mongoose.Schema({
  farmId: { type: mongoose.Schema.Types.ObjectId, ref: "Farm", required: true },
  date: { type: Date, default: Date.now },
  emissions: { type: Number, required: true },       
  waterUsage: { type: Number, required: false },     
  fertilizerUsage: { type: Number, required: false }
});

CarbonCreditSchema
const CarbonCreditSchema = new mongoose.Schema({
  farmId: { type: mongoose.Schema.Types.ObjectId, ref: "Farm", required: true },
  creditsGenerated: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "verified", "sold"], default: "pending" }
});

PurchaseRequestSchema
const PurchaseRequestSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  creditId: { type: mongoose.Schema.Types.ObjectId, ref: "CarbonCredit", required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["requested", "approved", "rejected"], default: "requested" },
  date: { type: Date, default: Date.now }
});
