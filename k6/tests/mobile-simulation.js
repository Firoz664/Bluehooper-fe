import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Custom metrics for mobile testing
export let mobileErrorRate = new Rate('mobile_errors');
export let mobileLoadTime = new Trend('mobile_load_time');

export let options = {
  stages: [
    { duration: '2m', target: 8 },   // Mobile users typically fewer
    { duration: '5m', target: 15 },  // Peak mobile usage
    { duration: '2m', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<4000'], // More lenient for mobile
    http_req_failed: ['rate<0.1'],
    mobile_errors: ['rate<0.1'],
    mobile_load_time: ['p(95)<5000'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:5173';

// Mobile user agents for realistic testing
const mobileUserAgents = [
  'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (Linux; Android 10; SM-G975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
  'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
];

// Simulate slower mobile connections
const connectionTypes = [
  { name: '4G', delay: 0.1 },
  { name: '3G', delay: 0.5 },
  { name: 'slow-3G', delay: 1.0 },
];

export default function () {
  // Random mobile setup
  let userAgent = mobileUserAgents[Math.floor(Math.random() * mobileUserAgents.length)];
  let connection = connectionTypes[Math.floor(Math.random() * connectionTypes.length)];
  
  // Simulate connection delay
  sleep(connection.delay);
  
  let startTime = new Date().getTime();
  
  let response = http.get(`${BASE_URL}/`, {
    headers: {
      'User-Agent': userAgent,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate',
      'DNT': '1',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
    },
  });
  
  let endTime = new Date().getTime();
  let loadTimeMs = endTime - startTime;
  
  mobileLoadTime.add(loadTimeMs);
  
  let success = check(response, {
    'mobile page loads': (r) => r.status === 200,
    'mobile viewport meta present': (r) => r.body.includes('viewport'),
    'mobile responsive content': (r) => r.body.includes('responsive') || r.body.includes('mobile'),
    'reasonable mobile load time': () => loadTimeMs < 6000,
    'mobile-friendly size': (r) => r.body.length < 300000, // Smaller for mobile
  });
  
  mobileErrorRate.add(!success);
  
  // Mobile users tend to have longer session gaps
  sleep(Math.random() * 5 + 2); // 2-7 seconds
  
  // Simulate mobile interaction patterns
  if (Math.random() < 0.4) { // 40% scroll to features
    sleep(Math.random() * 3 + 1); // Quick mobile scrolling
  }
  
  if (Math.random() < 0.2) { // 20% try to register on mobile
    let registerResponse = http.get(`${BASE_URL}/register`, {
      headers: { 'User-Agent': userAgent },
    });
    check(registerResponse, {
      'mobile register page loads': (r) => r.status === 200,
    });
    sleep(Math.random() * 8 + 5); // Mobile form filling takes longer
  }
}