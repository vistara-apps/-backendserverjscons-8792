# 🚀 Deployment Guide
## Liquidity Dashboard Application

This guide provides comprehensive instructions for deploying the Liquidity Dashboard application in various environments.

---

## 📋 Prerequisites

### System Requirements
- **Node.js**: 18+ (recommended: 22)
- **npm**: 8+ or **yarn**: 1.22+
- **Docker**: 20+ (for containerized deployment)
- **Git**: 2.30+

### Environment Setup
- **Development**: Local machine with Node.js
- **Staging**: Container orchestration platform
- **Production**: Cloud hosting with CDN

---

## 🏠 Local Development

### 1. Clone Repository
```bash
git clone https://github.com/vistara-apps/-backendserverjscons-8792.git
cd -backendserverjscons-8792
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
```bash
cp .env.example .env
# Edit .env with your local configuration
```

### 4. Start Development Server
```bash
npm run dev
```

**Access Points:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/api/health

---

## 🐳 Docker Deployment

### Local Docker Build
```bash
# Build the image
docker build -t liquidity-dashboard .

# Run the container
docker run -p 3000:3000 liquidity-dashboard
```

### Docker Compose (Development)
```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    volumes:
      - ./logs:/app/logs
```

```bash
docker-compose up -d
```

---

## ☁️ Cloud Deployment

### Vercel Deployment (Frontend)

#### Automatic Deployment
1. **Connect Repository**: Link GitHub repository to Vercel
2. **Configure Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

#### Manual Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### Environment Variables
Set in Vercel Dashboard:
```
VITE_API_BASE_URL=https://your-api-domain.com/api
```

### Backend Deployment Options

#### 1. Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway link
railway up
```

#### 2. Render
1. Connect GitHub repository
2. Configure service:
   - Build Command: `npm install`
   - Start Command: `npm run server`
   - Environment: Node.js

#### 3. AWS ECS (Container)
```bash
# Build and tag image
docker build -t liquidity-dashboard .
docker tag liquidity-dashboard:latest your-account.dkr.ecr.region.amazonaws.com/liquidity-dashboard:latest

# Push to ECR
aws ecr get-login-password --region region | docker login --username AWS --password-stdin your-account.dkr.ecr.region.amazonaws.com
docker push your-account.dkr.ecr.region.amazonaws.com/liquidity-dashboard:latest
```

---

## 🔧 Environment Configuration

### Development (.env.development)
```bash
NODE_ENV=development
PORT=5000
VITE_API_BASE_URL=http://localhost:5000/api
```

### Production (.env.production)
```bash
NODE_ENV=production
PORT=5000
VITE_API_BASE_URL=https://your-api-domain.com/api
```

### Environment Variables Reference

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NODE_ENV` | Environment mode | Yes | development |
| `PORT` | Server port | No | 5000 |
| `VITE_API_BASE_URL` | Frontend API URL | Yes | - |

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

The repository includes automated deployment workflows:

#### 1. Vercel Deployment (`deploy.yml`)
- **Triggers**: Push to main/master, Pull requests
- **Actions**: Build, test, deploy to Vercel
- **Environments**: Production (main), Preview (PRs)

#### 2. Container Deployment (`vercel-deploy.yml`)
- **Triggers**: Push to main branch
- **Actions**: Build Docker image, deploy to container registry

### Required Secrets

Set in GitHub repository settings:

```bash
# Vercel Deployment
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-org-id
VERCEL_PROJECT_ID=your-project-id

# Container Registry (if using)
DOCKER_USERNAME=your-docker-username
DOCKER_PASSWORD=your-docker-password
```

---

## 🏥 Health Checks & Monitoring

### Health Check Endpoint
```bash
curl https://your-domain.com/api/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-09-07T14:15:04.000Z",
  "uptime": 3600,
  "version": "1.0.0"
}
```

### Monitoring Setup

#### 1. Uptime Monitoring
```bash
# Using curl for basic monitoring
curl -f https://your-domain.com/api/health || exit 1
```

#### 2. Log Monitoring
```bash
# View application logs
docker logs container-name

# Follow logs in real-time
docker logs -f container-name
```

#### 3. Performance Monitoring
- **Frontend**: Vercel Analytics, Google PageSpeed Insights
- **Backend**: Application Performance Monitoring (APM) tools
- **Infrastructure**: Cloud provider monitoring dashboards

---

## 🔒 Security Configuration

### HTTPS Setup
```bash
# For production, ensure HTTPS is enabled
# Most cloud providers handle this automatically
```

### CORS Configuration
```javascript
// backend/server.js
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.com'] 
    : ['http://localhost:5173'],
  credentials: true
}));
```

### Security Headers
```javascript
// Add security middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});
```

---

## 📊 Performance Optimization

### Frontend Optimization
```bash
# Build with optimization
npm run build

# Analyze bundle size
npm install -g webpack-bundle-analyzer
npx webpack-bundle-analyzer dist/static/js/*.js
```

### Backend Optimization
```javascript
// Enable compression
const compression = require('compression');
app.use(compression());

// Set cache headers
app.use(express.static('dist', {
  maxAge: '1y',
  etag: false
}));
```

### CDN Configuration
- **Static Assets**: Serve from CDN (Vercel, CloudFlare)
- **API Responses**: Enable gzip compression
- **Images**: Optimize and serve in WebP format

---

## 🔧 Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version  # Should be 18+
```

#### 2. API Connection Issues
```bash
# Check environment variables
echo $VITE_API_BASE_URL

# Test API endpoint
curl https://your-api-domain.com/api/health
```

#### 3. Docker Issues
```bash
# Check Docker daemon
docker --version

# View container logs
docker logs container-name

# Rebuild image
docker build --no-cache -t liquidity-dashboard .
```

### Debug Mode
```bash
# Enable debug logging
DEBUG=* npm run dev

# Check application logs
tail -f logs/app.log
```

---

## 📈 Scaling Considerations

### Horizontal Scaling
- **Load Balancer**: Distribute traffic across multiple instances
- **Container Orchestration**: Use Kubernetes or Docker Swarm
- **Database**: Implement read replicas and connection pooling

### Vertical Scaling
- **Memory**: Increase container memory limits
- **CPU**: Allocate more CPU cores
- **Storage**: Use SSD storage for better I/O performance

### Caching Strategy
```javascript
// Implement Redis caching
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);

// Cache API responses
app.get('/api/kpis', async (req, res) => {
  const cached = await client.get('kpis');
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  
  // Fetch and cache data
  const data = await fetchKPIs();
  await client.setex('kpis', 300, JSON.stringify(data)); // 5 min cache
  res.json(data);
});
```

---

## 🔄 Rollback Procedures

### Vercel Rollback
```bash
# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback [deployment-url]
```

### Container Rollback
```bash
# Tag current version
docker tag liquidity-dashboard:latest liquidity-dashboard:backup

# Pull previous version
docker pull liquidity-dashboard:previous

# Restart with previous version
docker stop current-container
docker run -d --name new-container liquidity-dashboard:previous
```

### Database Rollback
```bash
# Restore from backup
pg_restore -d liquidity_dashboard backup_file.sql

# Or rollback migrations
npm run migrate:rollback
```

---

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] Code reviewed and approved
- [ ] Tests passing (unit, integration, E2E)
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] Security scan completed
- [ ] Performance benchmarks met

### Deployment
- [ ] Backup current production data
- [ ] Deploy to staging environment
- [ ] Run smoke tests
- [ ] Deploy to production
- [ ] Verify health checks
- [ ] Monitor error rates

### Post-Deployment
- [ ] Verify all features working
- [ ] Check performance metrics
- [ ] Monitor error logs
- [ ] Update documentation
- [ ] Notify stakeholders
- [ ] Schedule post-deployment review

---

## 📞 Support Contacts

### Development Team
- **Lead Developer**: [Contact Information]
- **DevOps Engineer**: [Contact Information]
- **QA Engineer**: [Contact Information]

### Emergency Contacts
- **On-Call Engineer**: [24/7 Contact]
- **System Administrator**: [Contact Information]
- **Product Manager**: [Contact Information]

---

## 📚 Additional Resources

- [API Documentation](./API.md)
- [Architecture Guide](./ARCHITECTURE.md)
- [Security Guidelines](./SECURITY.md)
- [Performance Optimization](./PERFORMANCE.md)
- [Monitoring Setup](./MONITORING.md)

---

**Last Updated**: September 7, 2025  
**Version**: 1.0.0  
**Next Review**: October 7, 2025
