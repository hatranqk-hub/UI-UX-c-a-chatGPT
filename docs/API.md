# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication Endpoints

### Register
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name"
}

Response: 201
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: 200
{
  "token": "jwt_token",
  "user": { ... }
}
```

## Chat Endpoints

### Send Message
```
POST /chat/message
Authorization: Bearer <token>
Content-Type: application/json

{
  "conversationId": "conv_123",
  "message": "Hello AI",
  "model": "gpt-3.5-turbo"
}

Response: 200
{
  "id": "msg_123",
  "role": "assistant",
  "content": "AI response here...",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## File Upload Endpoints

### Upload File
```
POST /files/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Data:
- file: <binary file>

Response: 200
{
  "id": "file_123",
  "filename": "document.pdf",
  "size": 1024,
  "type": "pdf",
  "uploadedAt": "2024-01-01T00:00:00Z"
}
```

## Image Generation Endpoints

### Generate Image
```
POST /images/generate
Authorization: Bearer <token>
Content-Type: application/json

{
  "prompt": "A beautiful sunset",
  "model": "dall-e-3",
  "size": "1024x1024"
}

Response: 200
{
  "id": "img_123",
  "url": "https://...",
  "prompt": "A beautiful sunset",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

## Code Assistant Endpoints

### Code Completion
```
POST /code/complete
Authorization: Bearer <token>
Content-Type: application/json

{
  "code": "function hello() {",
  "language": "javascript",
  "context": "React component"
}

Response: 200
{
  "completion": "console.log('Hello World');
}"
}
```
