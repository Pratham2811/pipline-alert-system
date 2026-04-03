# Pipeline Alert Management REST API

A RESTful backend API for managing pipeline leak and theft alerts. Built as part of the **PI AI Backend Developer Intern** assignment.

## Tech Stack

- **Backend**: Node.js (Express)
- **Database**: MongoDB (Mongoose ODM)
- **Validation**: express-validator
- **Tools**: Git, Postman / VS Code REST Client

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) running locally or a cloud URI

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd PI-AI

# 2. Install dependencies
npm install

# 3. Create a .env file (or use defaults)
cp .env.example .env
# Edit MONGODB_URI if needed

# 4. Start the development server
npm run dev
```

The server starts at `http://localhost:5000`. On first run, the database is **automatically seeded** with 5 sample alerts.

## API Endpoints

| Method   | Endpoint             | Description                                          |
| -------- | -------------------- | ---------------------------------------------------- |
| `POST`   | `/api/alerts`        | Create a new pipeline alert                          |
| `GET`    | `/api/alerts`        | Get all alerts (filter by `status`, `alert_type`)    |
| `GET`    | `/api/alerts/:id`    | Get a specific alert by ID                           |
| `PUT`    | `/api/alerts/:id`    | Update an alert's status or details                  |
| `DELETE` | `/api/alerts/:id`    | Delete an alert by ID                                |
| `GET`    | `/api/alerts/summary`| Count of alerts grouped by status and severity       |
| `GET`    | `/api/alerts/statistics` | Total alerts, by detection method, avg location_km |

### Query Parameters (GET /api/alerts)

| Param        | Type   | Description                            |
| ------------ | ------ | -------------------------------------- |
| `status`     | String | Filter by: active, investigating, resolved |
| `alert_type` | String | Filter by: leak, theft                 |
| `page`       | Number | Page number (default: 1)               |
| `limit`      | Number | Items per page (default: 10, max: 100) |

### Alert Data Model

| Field              | Type     | Description                                  |
| ------------------ | -------- | -------------------------------------------- |
| `pipeline_segment` | String   | Name/ID of the affected segment              |
| `detection_method` | String   | Method 1, Method 2, or Method 3              |
| `alert_type`       | String   | leak or theft                                |
| `severity`         | String   | low, medium, or high                         |
| `location_km`      | Number   | Estimated distance from origin (km)          |
| `status`           | String   | active, investigating, or resolved           |
| `created_at`       | DateTime | Auto-generated timestamp                     |
| `updated_at`       | DateTime | Auto-updated timestamp                       |

## Testing the API

Open `api-tests.http` in VS Code with the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension and click "Send Request" on any block.

## Project Structure

```
├── server.js                    # Entry point
├── api-tests.http               # HTTP test file
├── .env                         # Environment variables
├── package.json
└── src/
    ├── app.js                   # Express app setup
    ├── config/
    │   └── db.js                # MongoDB connection
    ├── controllers/
    │   └── alertController.js   # Route handlers
    ├── middleware/
    │   └── validate.js          # Input validation
    ├── models/
    │   └── Alert.js             # Mongoose schema
    ├── routes/
    │   └── alertRoutes.js       # API routes
    └── seed/
        └── seedData.js          # Database seeder
```
