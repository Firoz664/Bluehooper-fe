import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend, Counter } from 'k6/metrics';

// Custom metrics for API testing
export let apiErrorRate = new Rate('api_errors');
export let apiResponseTime = new Trend('api_response_time');
export let apiCallsTotal = new Counter('api_calls_total');

export let options = {
  stages: [
    { duration: '1m', target: 5 },   // Ramp up
    { duration: '3m', target: 15 },  // Steady load
    { duration: '1m', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'], // API should be faster than frontend
    http_req_failed: ['rate<0.05'],
    api_errors: ['rate<0.05'],
    api_response_time: ['p(95)<800'],
  },
};

const API_BASE_URL = __ENV.API_BASE_URL || 'http://localhost:3007/api/v1';

// Mock authentication token (in real scenario, you'd get this from login)
const authToken = __ENV.AUTH_TOKEN || '';

const apiEndpoints = [
  { method: 'GET', url: '/health', requiresAuth: false },
  { method: 'GET', url: '/auth/profile', requiresAuth: true },
  { method: 'GET', url: '/projects', requiresAuth: true },
  { method: 'GET', url: '/organizations', requiresAuth: true },
];

export default function () {
  // Select random API endpoint
  let endpoint = apiEndpoints[Math.floor(Math.random() * apiEndpoints.length)];
  
  let headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  
  // Add auth header if required
  if (endpoint.requiresAuth && authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  
  let startTime = new Date().getTime();
  let response;
  
  switch (endpoint.method) {
    case 'GET':
      response = http.get(`${API_BASE_URL}${endpoint.url}`, { headers });
      break;
    case 'POST':
      response = http.post(`${API_BASE_URL}${endpoint.url}`, JSON.stringify({}), { headers });
      break;
    default:
      response = http.get(`${API_BASE_URL}${endpoint.url}`, { headers });
  }
  
  let endTime = new Date().getTime();
  let responseTimeMs = endTime - startTime;
  
  apiResponseTime.add(responseTimeMs);
  apiCallsTotal.add(1);
  
  let success = check(response, {
    'API status is 2xx or expected error': (r) => {
      // Accept 2xx responses or 401/403 for auth-required endpoints without token
      return (r.status >= 200 && r.status < 300) || 
             (endpoint.requiresAuth && !authToken && (r.status === 401 || r.status === 403));
    },
    'API response time < 2s': () => responseTimeMs < 2000,
    'API response has content': (r) => r.body.length > 0,
  });
  
  apiErrorRate.add(!success);
  
  sleep(Math.random() * 2 + 0.5); // 0.5-2.5 seconds between API calls
}