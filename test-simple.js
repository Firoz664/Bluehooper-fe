import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 2,
  duration: '10s',
};

export default function () {
  let response = http.get('http://localhost:3008/');
  check(response, {
    'status is 200': (r) => r.status === 200,
  });
  console.log(`Response status: ${response.status}, size: ${response.body.length}`);
}