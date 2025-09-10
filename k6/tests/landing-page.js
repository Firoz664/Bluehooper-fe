import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Custom metrics
export let errorRate = new Rate('errors');
export let loadTime = new Trend('load_time');
export let contentLoadTime = new Trend('content_load_time');

// Test configuration
export let options = {
  stages: [
    { duration: '2m', target: 10 }, // Ramp up to 10 users over 2 minutes
    { duration: '5m', target: 10 }, // Stay at 10 users for 5 minutes
    { duration: '2m', target: 20 }, // Ramp up to 20 users over 2 minutes
    { duration: '5m', target: 20 }, // Stay at 20 users for 5 minutes
    { duration: '2m', target: 50 }, // Ramp up to 50 users over 2 minutes
    { duration: '5m', target: 50 }, // Stay at 50 users for 5 minutes
    { duration: '2m', target: 0 },  // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% of requests must complete below 2s
    http_req_failed: ['rate<0.1'],     // Error rate must be below 10%
    errors: ['rate<0.1'],              // Custom error rate below 10%
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:5173';

export default function () {
  let startTime = new Date().getTime();
  
  // Test landing page load
  let response = http.get(`${BASE_URL}/`, {
    headers: {
      'User-Agent': 'K6 Performance Test',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate',
      'Connection': 'keep-alive',
    },
  });

  let endTime = new Date().getTime();
  let loadTimeMs = endTime - startTime;
  
  // Record custom metrics
  loadTime.add(loadTimeMs);
  
  // Check response status and content
  let checkResults = check(response, {
    'status is 200': (r) => r.status === 200,
    'page contains title': (r) => r.body.includes('BlueHooper'),
    'page contains hero section': (r) => r.body.includes('Construction Management'),
    'page loads in reasonable time': () => loadTimeMs < 3000,
    'response size is reasonable': (r) => r.body.length > 1000 && r.body.length < 500000,
  });

  // Record error rate
  errorRate.add(!checkResults);

  // Test static assets loading
  let cssResponse = http.get(`${BASE_URL}/src/index.css`);
  check(cssResponse, {
    'CSS loads successfully': (r) => r.status === 200,
  });

  // Simulate user behavior - scroll and interaction
  sleep(Math.random() * 3 + 1); // Random sleep between 1-4 seconds

  // Test navigation to register page
  if (Math.random() < 0.3) { // 30% of users navigate to register
    let registerResponse = http.get(`${BASE_URL}/register`);
    check(registerResponse, {
      'register page loads': (r) => r.status === 200,
      'register page contains form': (r) => r.body.includes('register') || r.body.includes('sign up'),
    });
    sleep(2);
  }

  // Test API endpoint if available
  if (Math.random() < 0.2) { // 20% of users trigger API calls
    let apiResponse = http.get(`${BASE_URL}/api/health`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    check(apiResponse, {
      'API responds': (r) => r.status === 200 || r.status === 404, // 404 is acceptable if endpoint doesn't exist
    });
  }
}