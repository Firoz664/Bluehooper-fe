import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Custom metrics
export let errorRate = new Rate('errors');
export let loadTime = new Trend('load_time');

// Quick test configuration
export let options = {
  stages: [
    { duration: '30s', target: 5 },  // Ramp up to 5 users
    { duration: '1m', target: 5 },   // Stay at 5 users for 1 minute
    { duration: '30s', target: 0 },  // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<3000'],
    http_req_failed: ['rate<0.1'],
    errors: ['rate<0.1'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3008';

export default function () {
  let startTime = new Date().getTime();
  
  // Test landing page
  let response = http.get(`${BASE_URL}/`, {
    headers: {
      'User-Agent': 'K6 Quick Test',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
  });

  let endTime = new Date().getTime();
  let loadTimeMs = endTime - startTime;
  
  loadTime.add(loadTimeMs);
  
  let success = check(response, {
    'status is 200': (r) => r.status === 200,
    'page contains BlueHooper': (r) => r.body.includes('BlueHooper'),
    'page contains Construction': (r) => r.body.includes('Construction'),
    'load time < 5s': () => loadTimeMs < 5000,
    'response size reasonable': (r) => r.body.length > 1000,
  });

  errorRate.add(!success);
  
  console.log(`Load time: ${loadTimeMs}ms, Status: ${response.status}`);
  
  sleep(Math.random() * 2 + 1); // 1-3 second pause
}