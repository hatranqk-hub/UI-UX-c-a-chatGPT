# AI Chat Application (ChatGPT/Gemini Clone)

Một ứng dụng web full-stack kết hợp các tính năng của ChatGPT, Gemini và Copilot.

## ✨ Tính Năng Chính

### 1. **Trò Chuyện Thông Minh**
- Chat realtime với AI (ChatGPT/Gemini API)
- Lưu lịch sử trò chuyện
- Hỗ trợ đa ngôn ngữ

### 2. **Tải Lên & Phân Tích Tập Tin**
- Upload PDF, Word, PowerPoint, Excel
- OCR (nhận diện chữ trong ảnh)
- Trích xuất thông tin tự động
- Tóm tắt tài liệu

### 3. **Tạo Ảnh**
- Tạo ảnh từ mô tả (DALL-E / Stable Diffusion)
- Chỉnh sửa ảnh bằng AI
- Tạo nhiều phiên bản

### 4. **Hỗ Trợ Lập Trình**
- Code completion & suggestions
- Giải thích mã nguồn
- Phát hiện lỗi
- Generate code from description

## 🛠️ Tech Stack

### Frontend
- **React 18** + TypeScript
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **Axios** (HTTP client)
- **React Router** (navigation)
- **Zustand** (state management)

### Backend
- **Node.js** + **Express.js**
- **TypeScript**
- **MongoDB** + **Mongoose** (database)
- **JWT** (authentication)
- **Multer** (file upload)
- **Dotenv** (environment config)

### External APIs
- **OpenAI API** (ChatGPT, DALL-E)
- **Google Gemini API** (alternative)
- **Hugging Face** (image generation)
- **Tesseract.js** (OCR)

## 📁 Cấu Trúc Dự Án

```
ai-chat-app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatInterface.tsx
│   │   │   ├── FileUpload.tsx
│   │   │   ├── ImageGenerator.tsx
│   │   │   └── CodeAssistant.tsx
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   └── styles/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── services/
│   │   └── middleware/
│   └── package.json
└── docs/
```

## 🚀 Cài Đặt

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📡 API Endpoints

- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `POST /api/chat/message` - Gửi tin nhắn
- `POST /api/files/upload` - Tải lên tập tin
- `POST /api/images/generate` - Tạo ảnh
- `POST /api/code/complete` - Code completion

## 📚 Documentation

- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)
- [API Docs](./docs/API.md)

## 📄 License

MIT License
