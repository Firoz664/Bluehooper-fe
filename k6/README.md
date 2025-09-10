# K6 + Grafana Performance Testing Setup

This directory contains a comprehensive performance testing setup for BlueHooper using K6 and Grafana for metrics visualization.

## 🚀 Quick Start

### 1. Setup Infrastructure
```bash
./k6/scripts/run-tests.sh setup
```

### 2. Run Tests
```bash
# Run individual tests
./k6/scripts/run-tests.sh landing-page
./k6/scripts/run-tests.sh user-journey
./k6/scripts/run-tests.sh stress-test

# Run all tests
./k6/scripts/run-tests.sh all
```

### 3. View Results
- **Grafana Dashboard**: http://localhost:3000 (admin/admin)
- **InfluxDB**: http://localhost:8086

## 📁 Directory Structure

```
k6/
├── tests/                          # Test scripts
│   ├── landing-page.js            # Landing page load test
│   ├── user-journey.js            # User behavior simulation
│   ├── api-load-test.js           # API endpoint testing
│   ├── mobile-simulation.js       # Mobile device simulation
│   └── stress-test.js             # High load stress testing
├── scripts/
│   └── run-tests.sh               # Test execution script
├── grafana/
│   ├── dashboards/                # Grafana dashboard configs
│   └── datasources/               # Data source configurations
├── results/                       # Test result files
└── README.md                      # This file
```

## 🧪 Test Scenarios

### 1. Landing Page Test (`landing-page.js`)
- **Purpose**: Tests main landing page performance
- **Load Pattern**: 10→20→50 users over 16 minutes
- **Metrics**: Page load time, content verification, asset loading
- **Thresholds**: 95% requests < 2s, error rate < 10%

### 2. User Journey Test (`user-journey.js`)
- **Purpose**: Simulates realistic user behavior
- **Flow**: Landing → Features → Pricing → Registration → Login
- **Metrics**: Complete journey duration, page transitions
- **Thresholds**: Journey completion < 15s, error rate < 5%

### 3. API Load Test (`api-load-test.js`)
- **Purpose**: Tests backend API performance
- **Endpoints**: Health, Auth, Projects, Organizations
- **Metrics**: API response times, error rates
- **Thresholds**: 95% requests < 1s, error rate < 5%

### 4. Mobile Simulation (`mobile-simulation.js`)
- **Purpose**: Tests mobile device performance
- **Devices**: iPhone, Android devices with various connection speeds
- **Metrics**: Mobile load times, responsive design validation
- **Thresholds**: 95% requests < 4s (mobile-friendly)

### 5. Stress Test (`stress-test.js`)
- **Purpose**: Tests system under high load
- **Load Pattern**: Gradual increase to 200 concurrent users
- **Metrics**: System stability, breaking points
- **Thresholds**: More lenient for stress conditions

## 📊 Custom Metrics

### Application-Specific Metrics
- `load_time`: Page load duration
- `content_load_time`: Content rendering time
- `user_journey_duration`: Complete user flow time
- `page_transitions`: Navigation events
- `api_calls_total`: Total API requests

### Performance Indicators
- Response time percentiles (P95, P99)
- Error rates by endpoint
- Throughput (requests/second)
- Data transfer rates

## 🔧 Configuration

### Environment Variables
```bash
# Application URLs
export BASE_URL="http://localhost:5173"
export API_BASE_URL="http://localhost:3007/api/v1"

# Authentication (for API tests)
export AUTH_TOKEN="your-jwt-token"
```

### Docker Services
- **InfluxDB**: Metrics storage (port 8086)
- **Grafana**: Visualization (port 3000)
- **K6**: Test runner

## 📈 Grafana Dashboard

The included dashboard provides:
- Real-time virtual user count
- Request rate (req/s)
- Response time trends
- Error rate monitoring
- Data transfer metrics
- Custom application metrics

### Dashboard Features
- **Time Range**: Configurable (default: last 5 minutes)
- **Refresh Rate**: 5 seconds
- **Panels**: 8 comprehensive metric panels
- **Alerts**: Configurable threshold alerts

## 🎯 Performance Thresholds

### Landing Page
- 95% of requests < 2 seconds
- Error rate < 10%
- Page load complete < 3 seconds

### API Endpoints
- 95% of requests < 1 second
- Error rate < 5%
- Throughput > 100 req/s

### Mobile Performance
- 95% of requests < 4 seconds
- Mobile-optimized content delivery
- Responsive design validation

### Stress Testing
- System remains stable up to 200 concurrent users
- Graceful degradation under load
- Recovery after load reduction

## 🚀 Running Tests in Different Environments

### Local Development
```bash
# Default local setup
./k6/scripts/run-tests.sh landing-page
```

### Staging Environment
```bash
BASE_URL="https://staging.bluehooper.com" ./k6/scripts/run-tests.sh all
```

### Production Monitoring
```bash
BASE_URL="https://bluehooper.com" ./k6/scripts/run-tests.sh user-journey
```

## 📋 Test Results Analysis

### Key Metrics to Monitor
1. **Response Time**: P95 should be under threshold
2. **Error Rate**: Should remain below 5-10%
3. **Throughput**: Requests per second capacity
4. **Resource Usage**: Memory, CPU during load
5. **User Experience**: Complete journey success rate

### Performance Bottlenecks
- High response times → Backend optimization needed
- High error rates → Stability issues
- Memory leaks → Frontend optimization required
- API timeouts → Database or network issues

## 🔍 Troubleshooting

### Common Issues
1. **Tests not starting**: Check Docker containers are running
2. **No metrics in Grafana**: Verify InfluxDB connection
3. **High error rates**: Check application is running
4. **Slow performance**: Increase system resources

### Debug Commands
```bash
# Check container status
docker-compose -f docker-compose.k6.yml ps

# View logs
docker-compose -f docker-compose.k6.yml logs grafana
docker-compose -f docker-compose.k6.yml logs influxdb

# Manual K6 test run
docker-compose -f docker-compose.k6.yml exec k6 k6 run --out influxdb=http://influxdb:8086/k6 /tests/landing-page.js
```

## 🧹 Cleanup

```bash
# Stop and remove all containers
./k6/scripts/run-tests.sh cleanup

# Remove test result files
rm -rf k6/results/*
```

## 📚 Additional Resources

- [K6 Documentation](https://k6.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)
- [InfluxDB Documentation](https://docs.influxdata.com/)
- [Performance Testing Best Practices](https://k6.io/docs/testing-guides/)

---

## 🎯 Performance Goals

### Target Metrics for BlueHooper
- **Landing Page Load**: < 2 seconds (P95)
- **User Registration Flow**: < 10 seconds end-to-end
- **API Response**: < 500ms (P95)
- **Concurrent Users**: Support 100+ simultaneous users
- **Uptime**: 99.9% availability
- **Mobile Performance**: < 3 seconds on 3G networks