# NeuraGO Backend API Documentation

## 🚀 Overview
NeuraGO is a ride-hailing platform that connects users with drivers. This backend system provides APIs for user management, driver management, ride booking, and real-time location tracking.

## 🏗 System Architecture
The application follows a layered architecture:
- **Routes**: Handle HTTP endpoints and request validation
- **Controllers**: Manage request/response logic
- **Services**: Implement business logic
- **Models**: Define data structure and database interactions
- **Middlewares**: Handle authentication and request processing
- **Utilities**: Provide helper functions and socket management

## 🔧 Technical Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Real-time Communication**: Socket.IO
- **Authentication**: JWT
- **Location Services**: Google Maps API
- **Input Validation**: Express Validator

## 📚 API Documentation

### 🧑 User Management

#### Register User
```http
POST /user/register
```
**Body:**
```json
{
	"firstName": "string",
	"lastName": "string",
	"email": "string",
	"password": "string"
}
```

#### User Login
```http
POST /user/login
```
**Body:**
```json
{
	"email": "string",
	"password": "string"
}
```

#### User Profile & Logout
```http
GET /user/profile
GET /user/logout
```

### 🚗 Driver Management

#### Register Driver
```http
POST /driver/register
```
**Body:**
```json
{
	"firstName": "string",
	"lastName": "string",
	"email": "string",
	"password": "string",
	"vehicleColor": "string",
	"vehicleType": "car|bike|van",
	"vehicleNoPlate": "string",
	"vehicleCapacity": "number"
}
```

#### Driver Login
```http
POST /driver/login
```
**Body:**
```json
{
	"email": "string",
	"password": "string"
}
```

#### Driver Profile & Logout
```http
GET /driver/profile
GET /driver/logout
```

### 🚕 Ride Management

#### Create Ride
```http
POST /ride/createRide
```
**Body:**
```json
{
	"pickUpAddress": "string",
	"destination": "string",
	"vehicleType": "auto|car|bike"
}
```

#### Get Ride Fare
```http
GET /ride/getRideFare?location=string&destination=string
```

### 🗺 Map Services

#### Get Location Coordinates
```http
GET /maps/getCoordinates?address=string
```

#### Get Distance and Time
```http
GET /maps/getDistanceAndTime?from=string&to=string
```

#### Get Location Suggestions
```http
GET /maps/getSuggestedLocations?address=string
```

## 🔌 Real-time Features

### Socket Events
- **join**: Connect user/driver to socket
- **driver-location-update**: Update driver's real-time location
- **new_ride**: Notify nearby drivers about new ride requests

## 🔐 Security Features

1. **Authentication**
   - JWT-based authentication
   - Token blacklisting for secure logout
   - Protected routes using middleware

2. **Password Security**
   - Bcrypt hashing
   - Password field exclusion from queries
   - Minimum length requirements

3. **Input Validation**
   - Request body validation
   - Query parameter validation
   - File type validation

## 💾 Data Models

### User Model
- firstName (String, required)
- lastName (String)
- email (String, unique, required)
- password (String, required)
- socket_id (String)

### Driver Model
- firstName (String, required)
- lastName (String)
- email (String, unique, required)
- password (String, required)
- vehicleDetails (Object)
- status (String: active/inactive)
- location (Object: latitude/longitude)
- socket_id (String)

### Ride Model
- user (ObjectId, ref: 'User')
- driver (ObjectId, ref: 'Driver')
- pickUpAddress (String)
- destination (String)
- fare (Number)
- status (String: pending/accepted/ongoing/cancelled/completed)
- duration (String)
- distance (String)
- otp (String)

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```env
PORT=3000
MONGO_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

4. Start the server:
```bash
npm start
```

## 📝 Environment Variables
- `PORT`: Server port number
- `MONGO_URL`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT
- `GOOGLE_MAPS_API_KEY`: Google Maps API key

## 🔄 Error Handling
The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error


