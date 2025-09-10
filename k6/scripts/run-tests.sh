#!/bin/bash

# K6 Performance Testing Script for BlueHooper
# Usage: ./run-tests.sh [test-type] [environment]

set -e

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"
TESTS_DIR="$PROJECT_ROOT/k6/tests"
RESULTS_DIR="$PROJECT_ROOT/k6/results"

# Default values
TEST_TYPE="${1:-landing-page}"
ENVIRONMENT="${2:-local}"
BASE_URL="${3:-http://localhost:5173}"
API_BASE_URL="${4:-http://localhost:3007/api/v1}"

# Create results directory if it doesn't exist
mkdir -p "$RESULTS_DIR"

# Set environment variables
export BASE_URL="$BASE_URL"
export API_BASE_URL="$API_BASE_URL"

# Function to run a specific test
run_test() {
    local test_name="$1"
    local test_file="$TESTS_DIR/${test_name}.js"
    local result_file="$RESULTS_DIR/${test_name}-$(date +%Y%m%d-%H%M%S).json"
    
    echo "🚀 Running $test_name test..."
    echo "📍 Target URL: $BASE_URL"
    echo "💾 Results will be saved to: $result_file"
    
    if [ ! -f "$test_file" ]; then
        echo "❌ Test file not found: $test_file"
        exit 1
    fi
    
    # Check if Docker containers are running
    if ! docker-compose -f "$PROJECT_ROOT/docker-compose.k6.yml" ps | grep -q "Up"; then
        echo "⚠️  K6 infrastructure not running. Starting containers..."
        docker-compose -f "$PROJECT_ROOT/docker-compose.k6.yml" up -d
        echo "⏳ Waiting for services to be ready..."
        sleep 10
    fi
    
    # Run the test
    docker-compose -f "$PROJECT_ROOT/docker-compose.k6.yml" exec -T k6 \
        k6 run \
        --out influxdb=http://influxdb:8086/k6 \
        --out json="$result_file" \
        "/tests/${test_name}.js"
    
    echo "✅ Test completed. Results saved to $result_file"
    echo "📊 View real-time metrics at: http://localhost:3000"
}

# Function to run all tests in sequence
run_all_tests() {
    echo "🔄 Running all performance tests..."
    
    run_test "landing-page"
    sleep 30  # Cool down between tests
    
    run_test "user-journey"
    sleep 30
    
    run_test "api-load-test"
    sleep 30
    
    run_test "mobile-simulation"
    sleep 30
    
    run_test "stress-test"
    
    echo "🎉 All tests completed!"
}

# Function to setup infrastructure
setup_infrastructure() {
    echo "🏗️  Setting up K6 + Grafana infrastructure..."
    
    # Start services
    docker-compose -f "$PROJECT_ROOT/docker-compose.k6.yml" up -d
    
    echo "⏳ Waiting for services to be ready..."
    sleep 15
    
    # Check service health
    echo "🔍 Checking service health..."
    
    # Check InfluxDB
    if curl -s http://localhost:8086/ping > /dev/null; then
        echo "✅ InfluxDB is ready"
    else
        echo "❌ InfluxDB is not responding"
        exit 1
    fi
    
    # Check Grafana
    if curl -s http://localhost:3000/api/health > /dev/null; then
        echo "✅ Grafana is ready"
    else
        echo "❌ Grafana is not responding"
        exit 1
    fi
    
    echo "🎯 Setup complete!"
    echo "📊 Grafana dashboard: http://localhost:3000 (admin/admin)"
    echo "💾 InfluxDB: http://localhost:8086"
}

# Function to cleanup
cleanup() {
    echo "🧹 Cleaning up..."
    docker-compose -f "$PROJECT_ROOT/docker-compose.k6.yml" down
    echo "✅ Cleanup complete"
}

# Function to show help
show_help() {
    echo "K6 Performance Testing for BlueHooper"
    echo ""
    echo "Usage:"
    echo "  ./run-tests.sh [command] [options]"
    echo ""
    echo "Commands:"
    echo "  setup                    - Setup K6 + Grafana infrastructure"
    echo "  landing-page            - Run landing page performance test"
    echo "  user-journey            - Run user journey simulation"
    echo "  api-load-test           - Run API load test"
    echo "  mobile-simulation       - Run mobile device simulation"
    echo "  stress-test             - Run stress test"
    echo "  all                     - Run all tests in sequence"
    echo "  cleanup                 - Stop and remove containers"
    echo "  help                    - Show this help"
    echo ""
    echo "Options:"
    echo "  BASE_URL                - Target application URL (default: http://localhost:5173)"
    echo "  API_BASE_URL           - Target API URL (default: http://localhost:3007/api/v1)"
    echo ""
    echo "Examples:"
    echo "  ./run-tests.sh setup"
    echo "  ./run-tests.sh landing-page"
    echo "  ./run-tests.sh all"
    echo "  BASE_URL=https://bluehooper.com ./run-tests.sh stress-test"
}

# Main execution
case "$TEST_TYPE" in
    "setup")
        setup_infrastructure
        ;;
    "landing-page"|"user-journey"|"api-load-test"|"mobile-simulation"|"stress-test")
        run_test "$TEST_TYPE"
        ;;
    "all")
        run_all_tests
        ;;
    "cleanup")
        cleanup
        ;;
    "help"|"--help"|"-h")
        show_help
        ;;
    *)
        echo "❌ Unknown test type: $TEST_TYPE"
        echo "Run './run-tests.sh help' for available options"
        exit 1
        ;;
esac