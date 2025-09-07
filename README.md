# 🚀 Liquidity Dashboard

A modern, responsive liquidity management dashboard built with React and Express.js, featuring real-time KPI tracking, interactive charts, and a beautiful glassmorphism UI.

![Liquidity Dashboard](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-22-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.11-blue)

## ✨ Features

### 📊 Dashboard Analytics
- **Real-time KPI Monitoring**: Track total sales, active customers, daily revenue, liquidity ratio, total volume, and active positions
- **Interactive Charts**: Beautiful line charts showing sales and volume trends
- **Recent Activity Feed**: Live updates of important business events
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🔐 Security & Authentication
- Secure login system with credential validation
- Session management with logout functionality
- Protected routes and API endpoints
- Input validation and sanitization

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Modern frosted glass effect with backdrop blur
- **Gradient Backgrounds**: Beautiful color gradients throughout the interface
- **Smooth Animations**: Hover effects and transitions for enhanced user experience
- **Mobile-First**: Fully responsive design that works on all devices

### 🚀 Performance & Deployment
- **Docker Support**: Containerized application for easy deployment
- **CI/CD Pipeline**: Automated deployment with GitHub Actions
- **Vercel Integration**: Ready for production deployment
- **Optimized Build**: Multi-stage Docker build for minimal production image

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Interactive charts and data visualization
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API requests

### Backend
- **Express.js** - Fast, unopinionated web framework
- **CORS** - Cross-origin resource sharing
- **Node.js 22** - JavaScript runtime

### DevOps & Deployment
- **Docker** - Containerization
- **GitHub Actions** - CI/CD pipeline
- **Vercel** - Production deployment platform

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Docker (optional, for containerized deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vistara-apps/-backendserverjscons-8792.git
   cd -backendserverjscons-8792
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

### 🔑 Demo Credentials
- **Username**: `admin`
- **Password**: `admin123`

## 📁 Project Structure

```
├── backend/                 # Express.js backend
│   └── server.js           # Main server file with API endpoints
├── src/                    # React frontend source
│   ├── components/         # Reusable React components
│   │   ├── Dashboard.jsx   # Main dashboard component
│   │   ├── LoginForm.jsx   # Authentication form
│   │   ├── KPICard.jsx     # KPI display component
│   │   └── LiquidityChart.jsx # Chart visualization
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # React entry point
│   └── index.css          # Global styles
├── .github/workflows/      # CI/CD configuration
├── Dockerfile             # Docker configuration
├── package.json           # Dependencies and scripts
└── tailwind.config.js     # Tailwind CSS configuration
```

## 🔌 API Endpoints

### Authentication
- `POST /api/login` - User authentication
  ```json
  {
    "username": "admin",
    "password": "admin123"
  }
  ```

### Data Endpoints
- `GET /api/kpis` - Retrieve key performance indicators
- `GET /api/sales` - Get sales and volume data for charts

### Response Format
```json
{
  "success": true,
  "data": { ... },
  "message": "Success"
}
```

## 🐳 Docker Deployment

### Build and Run
```bash
# Build the Docker image
docker build -t liquidity-dashboard .

# Run the container
docker run -p 3000:3000 liquidity-dashboard
```

### Multi-stage Build
The Dockerfile uses a multi-stage build process:
1. **Builder stage**: Installs dependencies and builds the application
2. **Production stage**: Serves the built application with minimal footprint

## 🚀 Production Deployment

### Vercel Deployment
The application is configured for automatic deployment to Vercel:

1. **Push to main branch** triggers production deployment
2. **Pull requests** create preview deployments
3. **Environment variables** are managed through Vercel dashboard

### Required Environment Variables
- `VERCEL_TOKEN` - Vercel deployment token
- `VERCEL_ORG_ID` - Organization ID
- `VERCEL_PROJECT_ID` - Project ID

## 🧪 Development

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run server` - Start backend server only

### Development Workflow
1. **Frontend**: Vite dev server with hot module replacement
2. **Backend**: Express server with CORS enabled for development
3. **Concurrent Development**: Both servers run simultaneously with `npm run dev`

## 📊 KPI Metrics

The dashboard tracks the following key performance indicators:

| Metric | Description | Format |
|--------|-------------|---------|
| Total Sales | Cumulative sales revenue | Currency ($) |
| Active Customers | Number of active users | Count |
| Daily Revenue | Revenue for current day | Currency ($) |
| Liquidity Ratio | Financial liquidity metric | Decimal |
| Total Volume | Trading/transaction volume | Currency ($M) |
| Active Positions | Number of open positions | Count |

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#3b82f6` - Main brand color
- **Purple Accent**: `#8b5cf6` - Secondary accent
- **Background Gradient**: Deep blue to purple gradient
- **Glass Effect**: White with 10% opacity and backdrop blur

### Typography
- **Font Family**: System fonts (Apple System, Segoe UI, Roboto)
- **Font Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

## 🔒 Security Considerations

### Current Implementation
- Basic authentication with username/password
- CORS configuration for cross-origin requests
- Input validation on forms

### Production Recommendations
- Implement JWT tokens for session management
- Add rate limiting for API endpoints
- Use HTTPS in production
- Implement proper password hashing
- Add input sanitization and validation middleware

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in the `/docs` folder
- Review the API documentation below

---

**Built with ❤️ using React, Express.js, and modern web technologies**
