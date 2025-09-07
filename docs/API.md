# 📚 API Documentation

## Overview

The Liquidity Dashboard API provides endpoints for authentication and data retrieval. All endpoints return JSON responses and follow RESTful conventions.

**Base URL**: `http://localhost:5000/api`

## 🔐 Authentication

### POST /api/login

Authenticate a user with username and password.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "user": {
    "username": "admin",
    "role": "admin"
  }
}
```

**Response (Error - 401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

**Example:**
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

## 📊 Data Endpoints

### GET /api/kpis

Retrieve key performance indicators for the dashboard.

**Response (200):**
```json
{
  "totalSales": 150000,
  "activeCustomers": 1200,
  "dailyRevenue": 5000,
  "liquidityRatio": 2.4,
  "totalVolume": 2500000,
  "activePositions": 850
}
```

**Example:**
```bash
curl http://localhost:5000/api/kpis
```

### GET /api/sales

Get historical sales and volume data for chart visualization.

**Response (200):**
```json
[
  {
    "date": "2025-01-01",
    "sales": 4000,
    "volume": 45000
  },
  {
    "date": "2025-01-02",
    "sales": 4500,
    "volume": 48000
  },
  {
    "date": "2025-01-03",
    "sales": 4700,
    "volume": 52000
  }
]
```

**Example:**
```bash
curl http://localhost:5000/api/sales
```

## 📋 Data Models

### User Model
```typescript
interface User {
  username: string;
  password: string;
  role: 'admin' | 'user';
}
```

### KPI Model
```typescript
interface KPIData {
  totalSales: number;        // Total sales in USD
  activeCustomers: number;   // Count of active customers
  dailyRevenue: number;      // Daily revenue in USD
  liquidityRatio: number;    // Liquidity ratio (decimal)
  totalVolume: number;       // Total volume in USD
  activePositions: number;   // Count of active positions
}
```

### Sales Data Model
```typescript
interface SalesData {
  date: string;    // ISO date string (YYYY-MM-DD)
  sales: number;   // Sales amount in USD
  volume: number;  // Volume amount in USD
}
```

## 🚨 Error Handling

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "code": "ERROR_CODE"
}
```

### Common Error Codes

| Status Code | Description | Example Response |
|-------------|-------------|------------------|
| 400 | Bad Request | Invalid request format or missing parameters |
| 401 | Unauthorized | Invalid credentials or missing authentication |
| 404 | Not Found | Endpoint or resource not found |
| 500 | Internal Server Error | Server-side error occurred |

## 🔧 Development Notes

### CORS Configuration
The API is configured with CORS to allow cross-origin requests from the frontend application running on different ports during development.

### Data Storage
Currently, the API uses in-memory data storage with dummy data. In production, this should be replaced with a proper database solution.

### Security Considerations
- Passwords are stored in plain text (development only)
- No rate limiting implemented
- No input validation middleware
- No authentication tokens (sessions not persisted)

## 🚀 Production Recommendations

### Authentication Improvements
1. **JWT Tokens**: Implement JSON Web Tokens for stateless authentication
2. **Password Hashing**: Use bcrypt or similar for password security
3. **Session Management**: Implement proper session handling
4. **Rate Limiting**: Add rate limiting to prevent abuse

### Data Validation
1. **Input Validation**: Validate all incoming request data
2. **Sanitization**: Sanitize inputs to prevent injection attacks
3. **Schema Validation**: Use libraries like Joi or Yup for request validation

### Database Integration
1. **Database**: Replace in-memory storage with PostgreSQL/MongoDB
2. **ORM/ODM**: Use Prisma, Sequelize, or Mongoose
3. **Migrations**: Implement database migration system
4. **Backup**: Set up automated database backups

### API Enhancements
1. **Pagination**: Add pagination for large datasets
2. **Filtering**: Implement query parameters for data filtering
3. **Sorting**: Add sorting capabilities
4. **Caching**: Implement Redis caching for frequently accessed data

### Monitoring & Logging
1. **Logging**: Implement structured logging with Winston
2. **Monitoring**: Add health check endpoints
3. **Metrics**: Track API performance metrics
4. **Error Tracking**: Integrate error tracking service

## 📝 Example Integration

### Frontend Integration (React)
```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Authentication
const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Fetch KPIs
const fetchKPIs = async () => {
  const response = await axios.get(`${API_BASE_URL}/kpis`);
  return response.data;
};

// Fetch Sales Data
const fetchSalesData = async () => {
  const response = await axios.get(`${API_BASE_URL}/sales`);
  return response.data;
};
```

### Error Handling Example
```javascript
const handleApiCall = async () => {
  try {
    const data = await fetchKPIs();
    setKpis(data);
  } catch (error) {
    console.error('API Error:', error);
    setError('Failed to fetch data. Please try again.');
  }
};
```

## 🧪 Testing

### Manual Testing
Use tools like Postman, Insomnia, or curl to test the API endpoints.

### Automated Testing
Consider implementing:
- Unit tests for individual functions
- Integration tests for API endpoints
- End-to-end tests for complete workflows

### Test Data
The API includes demo data for testing:
- **Username**: `admin`
- **Password**: `admin123`
- **Role**: `admin`

---

*This documentation is for the current development version. Production API may have additional endpoints and enhanced security features.*
