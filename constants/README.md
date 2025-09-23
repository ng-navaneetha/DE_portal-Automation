# Dynamic Test Constants

This directory contains dynamic and configurable constants for the test automation framework. The constants can be adjusted based on environment variables, test scenarios, or runtime parameters.

## 📁 Files Overview

### Core Files
- **`dynamicTestConstants.js`** - Main constants file with environment-based configuration
- **`testConfigManager.js`** - Configuration manager for different test scenarios
- **`.env.example`** - Template for environment variables

### Usage Examples
- **`../examples/dynamicConstantsUsage.js`** - Complete usage examples

## 🚀 Quick Start

### 1. Environment Setup
```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your configuration
nano .env
```

### 2. Basic Usage
```javascript
import { DYNAMIC_TEST_CONSTANTS, DYNAMIC_HELPERS } from '../constants/dynamicTestConstants.js';

// Get environment-specific configuration
const config = DYNAMIC_HELPERS.getEnvConfig();
const procedureData = DYNAMIC_HELPERS.getProcedureData();

// Use in your tests
await page.goto(config.baseUrl);
await page.locator(`tr:has-text("${procedureData.name}")`).click();
```

### 3. Advanced Configuration Management
```javascript
import { TestConfigManager, SMOKE_CONFIG } from '../constants/testConfigManager.js';

// Use pre-configured smoke test settings
const config = SMOKE_CONFIG;

// Or create custom configuration
const customConfig = new TestConfigManager('regression');
```

## 🔧 Configuration Options

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `BASE_URL` | Application base URL | `https://de-hub.ngenux.app` |
| `TEST_ENV` | Test environment (dev/staging/prod) | `dev` |
| `USER_EMAIL` | Test user email | `abcd@ngenux.com` |
| `PROCEDURE_NAME` | Test procedure name | `calculate_average` |
| `DATABASE_NAME` | Test database name | `ecommerce_db` |
| `DEFAULT_TIMEOUT` | Default timeout in ms | `30000` |
| `HEADLESS` | Run browser in headless mode | `true` |

### Test Scenarios

| Scenario | Description | Use Case |
|----------|-------------|----------|
| `default` | Standard configuration | Regular test runs |
| `smoke` | Fast, essential tests | Quick verification |
| `regression` | Comprehensive testing | Full test suite |
| `ci` | CI/CD optimized | Automated pipelines |
| `debug` | Development/debugging | Local development |

## 📝 Usage Patterns

### 1. Environment-Specific Testing
```javascript
// Automatically adapts to current environment
const config = DYNAMIC_HELPERS.getEnvConfig();

// Different URLs for different environments
// dev: https://de-hub.ngenux.app
// staging: https://staging-de-hub.ngenux.app
// prod: https://prod-de-hub.ngenux.app
```

### 2. Multi-Scenario Testing
```javascript
// Test with different procedure data
const procedure1 = DYNAMIC_HELPERS.getProcedureData('CALCULATE_AVERAGE');
const procedure2 = DYNAMIC_HELPERS.getProcedureData('SAMPLE_PROC_2');

// Both procedures have: name, database, schema, fullyQualifiedName
```

### 3. Dynamic Timeouts
```javascript
// Get scenario-specific timeout
const timeout = DYNAMIC_HELPERS.getTimeout('PARSE_OPERATION'); // 45000ms

// Or use with specific operations
await expect(element).toBeVisible({ timeout: config.getTimeout('ASSERTION') });
```

### 4. Conditional Test Behavior
```javascript
const config = DYNAMIC_HELPERS.getEnvConfig();

if (config.isCI) {
    // CI-specific behavior
    test.setTimeout(60000);
}

if (config.debugMode) {
    // Debug-specific behavior
    await page.screenshot({ path: 'debug.png' });
}
```

## 🎯 Test Configuration Manager

The `TestConfigManager` class provides pre-configured setups for different testing scenarios:

### Pre-configured Instances
```javascript
import { SMOKE_CONFIG, REGRESSION_CONFIG, CI_CONFIG, DEBUG_CONFIG } from '../constants/testConfigManager.js';

// Use pre-configured smoke test settings
const config = SMOKE_CONFIG.getConfig();

// Get selectors
const selectors = SMOKE_CONFIG.getSelectors();

// Get procedure data
const procedure = SMOKE_CONFIG.getProcedureData();
```

### Custom Configuration
```javascript
// Create custom configuration for specific needs
const config = TestConfigManager.createConfig('smoke', {
    timeouts: { DEFAULT: 15000 },
    retries: 0,
    headless: true
});
```

## 🌍 Environment Configuration

### Development Environment
```bash
# .env
TEST_ENV=dev
BASE_URL=http://localhost:3000
DEBUG=true
HEADLESS=false
SLOW_MO=1000
```

### CI/CD Environment
```bash
# CI environment variables
TEST_ENV=ci
CI=true
HEADLESS=true
DEFAULT_TIMEOUT=60000
RETRIES=3
```

### Production Testing
```bash
# Production environment
TEST_ENV=prod
BASE_URL=https://prod-de-hub.ngenux.app
USER_EMAIL=prod-test@ngenux.com
DEFAULT_TIMEOUT=45000
```

## 🔄 Dynamic Features

### 1. Runtime Configuration Switching
```javascript
// Start with one config, switch to another
let config = new TestConfigManager('default');

if (testNeedsDebugging) {
    config = new TestConfigManager('debug');
}
```

### 2. Test Data Generation
```javascript
// Generate unique test data for each run
const testData = DYNAMIC_HELPERS.generateTestData('smoke');
// Returns: { timestamp, testId, sessionId, runId }
```

### 3. Parallel Execution Support
```javascript
// Get configuration optimized for parallel execution
const parallelConfig = TestConfigManager.getParallelConfig(
    workerIndex, 
    totalWorkers
);
```

## 🎮 Command Line Usage

### Run with Different Configurations
```bash
# Smoke tests
TEST_ENV=smoke npx playwright test --grep "@smoke"

# Debug mode
DEBUG=true HEADLESS=false npx playwright test

# CI mode
CI=true npx playwright test

# Custom procedure
PROCEDURE_NAME=custom_proc DATABASE_NAME=custom_db npx playwright test
```

### Environment-Specific Runs
```bash
# Development environment
TEST_ENV=dev BASE_URL=http://localhost:3000 npx playwright test

# Staging environment
TEST_ENV=staging npx playwright test

# Production environment
TEST_ENV=prod npx playwright test
```

## 📊 Benefits

### ✅ **Flexibility**
- Easy switching between environments
- Configurable timeouts and retries
- Dynamic test data

### ✅ **Maintainability**
- Centralized configuration
- Environment-specific settings
- Reusable components

### ✅ **Scalability**
- Support for multiple procedures
- Parallel execution optimization
- CI/CD integration

### ✅ **Developer Experience**
- Type-safe configurations
- Clear documentation
- Easy debugging

## 🛠️ Extending the Configuration

### Adding New Test Scenarios
```javascript
// In testConfigManager.js
const scenarios = {
    // ... existing scenarios
    
    myCustomScenario: {
        ...baseConfig,
        procedure: DYNAMIC_HELPERS.getProcedureData('MY_PROCEDURE'),
        timeouts: { DEFAULT: 20000 },
        customProperty: 'customValue'
    }
};
```

### Adding New Environment Variables
```javascript
// In dynamicTestConstants.js
export const DYNAMIC_CONFIG = {
    // ... existing config
    
    MY_FEATURE: {
        ENABLED: process.env.MY_FEATURE_ENABLED === 'true',
        SETTING: process.env.MY_FEATURE_SETTING || 'default'
    }
};
```

This dynamic constants system provides a robust, flexible foundation for test automation that can adapt to different environments, scenarios, and requirements! 🚀
