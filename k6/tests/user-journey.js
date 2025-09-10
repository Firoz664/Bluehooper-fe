import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate, Trend, Counter } from 'k6/metrics';

// Custom metrics
export let errorRate = new Rate('errors');
export let userJourneyDuration = new Trend('user_journey_duration');
export let pageTransitions = new Counter('page_transitions');

export let options = {
  stages: [
    { duration: '1m', target: 5 },   // Warm up
    { duration: '3m', target: 10 },  // Normal load
    { duration: '1m', target: 0 },   // Cool down
  ],
  thresholds: {
    http_req_duration: ['p(95)<3000'],
    http_req_failed: ['rate<0.05'],
    errors: ['rate<0.05'],
    user_journey_duration: ['p(95)<15000'], // Complete user journey under 15s
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:5173';

// Simulate realistic user data
const userData = {
  email: `test.user.${Math.random().toString(36).substr(2, 9)}@example.com`,
  password: 'TestPassword123!',
  firstName: 'Test',
  lastName: 'User',
  company: 'Test Construction Co.',
};

export default function () {
  let journeyStart = new Date().getTime();
  
  group('Landing Page Visit', function () {
    let response = http.get(`${BASE_URL}/`);
    check(response, {
      'landing page loads': (r) => r.status === 200,
      'contains CTA buttons': (r) => r.body.includes('Start Free Trial'),
    });
    pageTransitions.add(1);
    sleep(Math.random() * 3 + 2); // Browse for 2-5 seconds
  });

  group('Explore Features', function () {
    // Simulate scrolling and reading content
    sleep(Math.random() * 4 + 3); // Spend 3-7 seconds reading features
    
    // Some users check pricing
    if (Math.random() < 0.6) {
      sleep(Math.random() * 2 + 1); // Spend 1-3 seconds on pricing
    }
  });

  group('Registration Process', function () {
    if (Math.random() < 0.4) { // 40% of users attempt registration
      let registerResponse = http.get(`${BASE_URL}/register`);
      check(registerResponse, {
        'register page loads': (r) => r.status === 200,
      });
      pageTransitions.add(1);
      
      sleep(Math.random() * 5 + 3); // Fill form for 3-8 seconds
      
      // Simulate form submission (if API is available)
      let formData = {
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        company: userData.company,
      };
      
      // Note: This would need actual API endpoint
      sleep(1); // Simulate form submission time
    }
  });

  group('Login Attempt', function () {
    if (Math.random() < 0.3) { // 30% try to login
      let loginResponse = http.get(`${BASE_URL}/login`);
      check(loginResponse, {
        'login page loads': (r) => r.status === 200,
      });
      pageTransitions.add(1);
      
      sleep(Math.random() * 3 + 2); // Fill login form
    }
  });

  let journeyEnd = new Date().getTime();
  userJourneyDuration.add(journeyEnd - journeyStart);
  
  // Final pause before next iteration
  sleep(1);
}