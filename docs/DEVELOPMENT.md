# Development Guide

## Getting Started

### Prerequisites
- Node.js 16+
- MongoDB 4.0+
- npm or yarn

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/hatranqk-hub/UI-UX-c-a-chatGPT.git
cd UI-UX-c-a-chatGPT
git checkout ai-chat-app
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your API keys
npm run dev
```

3. **Setup Frontend**
```bash
cd frontend
npm install
npm run dev
```

## Project Structure

### Backend
- `src/routes/` - API routes
- `src/controllers/` - Business logic
- `src/models/` - Database schemas
- `src/services/` - External API integrations
- `src/middleware/` - Express middleware

### Frontend
- `src/components/` - React components
- `src/pages/` - Page components
- `src/services/` - API services
- `src/store/` - Zustand state management
- `src/styles/` - CSS and Tailwind styles

## Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful commit messages

## Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## Building for Production

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npm run preview
```
