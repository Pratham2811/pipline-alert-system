# 🚀 PI AI Pipeline Alert System API

A RESTful backend service to manage and monitor pipeline alerts such as leaks and thefts.  
This system supports full CRUD operations along with analytical endpoints for operational insights.

---

## 📌 Base URL

http://localhost:5000/api/alerts

---

## 📂 Endpoints Overview

| Method | Endpoint                 | Description           |
| ------ | ------------------------ | --------------------- |
| GET    | `/api/alerts/`           | Get all alerts        |
| GET    | `/api/alerts/:id`        | Get alert by ID       |
| POST   | `/api/alerts`            | Create a new alert    |
| PUT    | `/api/alerts/:id`        | Update an alert       |
| DELETE | `/api/alerts/:id`        | Delete an alert       |
| GET    | `/api/alerts/summary`    | Get alerts summary    |
| GET    | `/api/alerts/statistics` | Get alerts statistics |

---

# 📥 GET /api/alerts/

### Description

Retrieve all alerts in the system.

### Response (200 OK)

```json
{
  "success": true,
  "data": [ ...array of alert objects... ]
}
🔍 GET /api/alerts/:id
Description

Retrieve a specific alert by its MongoDB ObjectId.

Path Parameters
Parameter	Type	Description
id	string	MongoDB ObjectId
Example
/api/alerts/69cf6cdb14f3e69aa3fd28e6
Response (200 OK)
{
  "success": true,
  "data": { ...alert object... }
}
➕ POST /api/alerts
Description

Create a new pipeline alert.

Request Body
{
  "pipeline_segment": "Tamil-Nadu-Central-09",
  "detection_method": "Method 2",
  "alert_type": "leak",
  "severity": "medium",
  "location_km": 55.0,
  "status": "active"
}
Field Details
Field	Type	Required	Description
pipeline_segment	string	✅	Pipeline segment name
detection_method	string	✅	Method 1 / Method 2 / Method 3
alert_type	string	✅	leak / theft
severity	string	✅	low / medium / high
location_km	number	✅	Location in kilometers
status	string	❌	active / investigating / resolved
Response (201 Created)
{
  "success": true,
  "data": { ...new alert object... }
}
✏️ PUT /api/alerts/:id
Description

Update an existing alert.

Example
/api/alerts/69cf6cdb14f3e69aa3fd28e6
Request Body (Partial Update Allowed)
{
  "severity": "low",
  "location_km": 55.2,
  "status": "resolved"
}
Response (200 OK)
{
  "success": true,
  "data": { ...updated alert object... }
}
❌ DELETE /api/alerts/:id
Description

Delete an alert by ID.

Example
/api/alerts/69cf7fc593bbf8d399a381b0
Response (200 OK)
{
  "success": true,
  "message": "Alert deleted successfully"
}
📊 GET /api/alerts/summary
Description

Returns a summarized overview of alerts grouped by key attributes like status and detection method.

Response (200 OK)
{
  "success": true,
  "data": { ...summary object... }
}
📈 GET /api/alerts/statistics
Description

Returns detailed analytical insights including:

Total alerts
Alerts grouped by detection method
Average location of active alerts
Response (200 OK)
{
  "success": true,
  "data": {
    "total_alerts": 5,
    "alerts_by_detection_method": [
      { "count": 2, "detection_method": "Method 1" },
      { "count": 2, "detection_method": "Method 2" },
      { "count": 1, "detection_method": "Method 3" }
    ],
    "average_location_km_active": 127.65
  }
}
```
