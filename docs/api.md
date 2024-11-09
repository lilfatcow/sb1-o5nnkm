## API Documentation

### Base URL
`/api/v1`

### Authentication
All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Endpoints

#### Health Check
- `GET /health`
- No authentication required
- Returns server status

#### Authentication
- `POST /auth/login`
  - Login with credentials
  - Returns JWT token
- `POST /auth/refresh`
  - Refresh JWT token
  - Requires valid refresh token

#### Users
- `GET /users/me`
  - Get current user profile
  - Requires authentication
- `PATCH /users/me`
  - Update current user profile
  - Requires authentication

#### Files
- `POST /files`
  - Upload file
  - Requires authentication
  - Multipart form data
- `GET /files/:id`
  - Get file by ID
  - Requires authentication

### Error Responses
All error responses follow the format:
```json
{
  "error": {
    "message": "Error message",
    "details": "Optional error details"
  }
}
```

### Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error