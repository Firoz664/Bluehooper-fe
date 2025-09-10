import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Custom metrics for stress testing
export let errorRate = new Rate('errors');
export let responseTime = new Trend('response_time');

export let options = {
  stages: [
    { duration: '2m', target: 10 },   // Normal load
    { duration: '5m', target: 10 },   // Stay at normal load
    { duration: '2m', target: 50 },   // Scale up to 50 users
    { duration: '5m', target: 50 },   // Stay at 50 users
    { duration: '2m', target: 100 },  // Scale up to 100 users
    { duration: '5m', target: 100 },  // Stay at 100 users
    { duration: '2m', target: 200 },  // Scale up to 200 users (stress)
    { duration: '5m', target: 200 },  // Stay at stress level
    { duration: '2m', target: 0 },    // Scale down
  ],
  thresholds: {
    http_req_duration: ['p(95)<5000'], // More lenient for stress test
    http_req_failed: ['rate<0.2'],     // Allow higher error rate under stress
    errors: ['rate<0.2'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:5173';

const endpoints = [
  '/',
  '/login',
  '/register',
];

export default function () {
  // Randomly select endpoint to test
  let endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
  
  let startTime = new Date().getTime();
  let response = http.get(`${BASE_URL}${endpoint}`, {
    timeout: '30s', // Increased timeout for stress test
  });
  let endTime = new Date().getTime();
  
  responseTime.add(endTime - startTime);
  
  let success = check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 10s': (r) => r.timings.duration < 10000,
    'response size > 0': (r) => r.body.length > 0,
  });
  
  errorRate.add(!success);
  
  // Minimal sleep during stress test
  sleep(0.1);
}