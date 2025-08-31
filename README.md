# BlueHooper - Construction Management SaaS

A modern construction management application built with React, Redux Toolkit, and Tailwind CSS.

## Features

- 🏗️ **Project Management** - Organize and track construction projects
- ✅ **Task Tracking** - Assign tasks and monitor progress
- 👥 **Team Management** - Manage team members and roles
- 📄 **Document Management** - Store and share project documents
- 🔐 **Authentication** - Secure login/register with token refresh
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🎨 **Modern UI** - Clean interface built with Tailwind CSS

## Tech Stack

- **Frontend**: React 19 + Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios with interceptors
- **Build Tool**: Vite

## Project Structure

```
src/
├── api/              # API layer with Axios configuration
│   ├── client.js     # Axios client with interceptors
│   ├── auth.js       # Authentication API calls
│   └── index.js      # All API endpoints
├── components/       # Reusable UI components
│   ├── ui/           # Base UI components
│   └── forms/        # Form components
├── hooks/            # Custom React hooks
├── layouts/          # Layout components
│   ├── PublicLayout.jsx
│   └── ProtectedLayout.jsx
├── pages/            # Page components
│   ├── auth/         # Authentication pages
│   ├── dashboard/    # Dashboard pages
│   └── LandingPage.jsx
├── routes/           # Routing configuration
│   ├── AppRoutes.jsx
│   ├── ProtectedRoute.jsx
│   └── PublicRoute.jsx
├── store/            # Redux store configuration
│   ├── slices/       # Redux slices
│   └── index.js      # Store configuration
└── utils/            # Utility functions and constants
    ├── config.js     # Environment configuration
    ├── constants.js  # App constants
    └── helpers.js    # Helper functions
```

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` to configure your API base URL.

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:3001/api` |
| `VITE_APP_NAME` | Application name | `BlueHooper` |
| `VITE_APP_VERSION` | Application version | `1.0.0` |

## Authentication Flow

1. Users land on the homepage (`/`)
2. Click "Get Started" or "Sign in" to navigate to auth pages
3. After successful login/register, users are redirected to `/dashboard`
4. Protected routes require authentication
5. Token refresh is handled automatically via Axios interceptors

## API Integration

The app is ready to integrate with a backend API. Update the `VITE_API_BASE_URL` in your `.env` file to point to your backend server.

### Expected API Endpoints:

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Token refresh
- `GET /auth/profile` - Get user profile
- `GET /projects` - Get all projects
- `GET /users` - Get all users
- And more...

## Development

- **Hot Module Replacement** enabled with Vite
- **ESLint** configured for code quality
- **Tailwind CSS** for rapid UI development
- **Redux DevTools** support for state debugging

## 🐳 Frontend Docker Deployment

### Prerequisites

- Docker & Docker Compose installed
- Make (optional, for convenience commands)

### Quick Start with Docker

1. **Setup environment variables**:
   ```bash
   cp .env.docker .env
   # Edit .env with your API backend URL
   ```

2. **Development Environment** (with hot reload):
   ```bash
   # Using Make (recommended)
   make dev
   
   # Or using Docker Compose directly
   docker-compose -f docker-compose.dev.yml up --build
   ```

3. **Production Environment**:
   ```bash
   # Using Make (recommended)
   make prod
   
   # Or using Docker Compose directly
   docker-compose up --build -d
   ```

### Docker Commands

#### Development
```bash
make dev              # Start development with hot reload
make dev-detached     # Start development in background
make dev-logs         # View development logs
make dev-stop         # Stop development environment
make dev-restart      # Restart development
```

#### Production
```bash
make prod             # Start production environment
make prod-logs        # View production logs
make prod-stop        # Stop production environment
make prod-restart     # Restart production
```

#### Build & Management
```bash
make build            # Build frontend image
make build-no-cache   # Build without cache
make logs             # View frontend logs
make restart          # Restart frontend service
make health           # Check service health
make status           # Show container status
```

#### Development Tools
```bash
make shell            # Access production container shell
make shell-dev        # Access development container shell
make test             # Run tests in development container
make lint             # Run linting in development container
```

#### Cleanup
```bash
make clean            # Remove containers and images
make clean-all        # Complete cleanup
```

### Docker Architecture

#### Multi-Stage Dockerfile
- **Development**: Vite dev server with hot reload and volume mounting
- **Builder**: Optimized build stage with environment variables
- **Production**: Nginx-served static files with security headers

#### Frontend Service
- **Development**: React app with Vite dev server on port 5173
- **Production**: Nginx-served static build on port 80
- **Networking**: Isolated frontend network for security

### Environment Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `https://api.bluehooper.com/api` |
| `VITE_APP_NAME` | Application name | `BlueHooper` |
| `VITE_APP_VERSION` | Application version | `1.0.0` |
| `FRONTEND_PORT` | Production port | `80` |
| `FRONTEND_DEV_PORT` | Development port | `5173` |
| `FRONTEND_DOMAIN` | Domain for reverse proxy | `localhost` |

### Production Best Practices

✅ **Security Features**:
- Non-root user in containers
- Security headers (XSS, CSRF protection)
- Content Security Policy
- No server tokens exposed

✅ **Performance Optimizations**:
- Multi-stage builds for minimal image size
- Gzip compression enabled
- Long-term caching for static assets
- Optimized Nginx configuration

✅ **Monitoring & Health**:
- Built-in health checks
- Container restart policies
- Resource monitoring ready
- Traefik labels for load balancing

### Deployment Examples

#### Single Frontend Instance
```bash
# Production deployment
make setup
make prod
```

#### Development with Backend
```bash
# Start frontend in development mode
make dev-detached

# Your backend API should be running on the configured URL
# Update VITE_API_BASE_URL in .env to point to your backend
```

#### CI/CD Pipeline
```bash
# Build and test
make test-build
make security-scan

# Deploy
make deploy
```

### Customization

1. **API Integration**: Update `VITE_API_BASE_URL` in `.env` to point to your backend
2. **Custom Domain**: Set `FRONTEND_DOMAIN` for reverse proxy configuration
3. **SSL/TLS**: Add SSL certificates and update Nginx config
4. **CDN Integration**: Configure static asset URLs for CDN delivery

## Traditional Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting provider

## Contributing

1. Follow the existing code structure and conventions
2. Use the established patterns for API calls, routing, and state management
3. Ensure responsive design with Tailwind CSS
4. Test authentication flows thoroughly
5. Use Docker for consistent development environments