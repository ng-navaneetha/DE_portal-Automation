# Environment Variables for Playwright Tests

This project uses environment variables to configure test data across different environments (development, staging, production).

## Environment Files

- `.env.test` - Default development/test environment
- `.env.staging` - Staging environment configuration
- `.env.prod` - Production environment configuration

## Usage

### Run tests with specific environment:

```bash
# Development/Test (default)
npx playwright test --env-file=.env.test

# Staging
npx playwright test --env-file=.env.staging

# Production
npx playwright test --env-file=.env.prod
```

### Override specific variables:

```bash
# Override BASE_URL for local testing
BASE_URL=http://localhost:3000 npx playwright test

# Run in headed mode for debugging
HEADLESS=false DEBUG_MODE=true npx playwright test
```

## Available Environment Variables

### URLs and Endpoints
- `BASE_URL` - Base application URL
- `TABLEAU_SERVER_URL` - Tableau server endpoint

### Credentials
- `VALID_EMAIL` / `VALID_PASSWORD` - Valid login credentials
- `INVALID_EMAIL` / `INVALID_PASSWORD` - Invalid credentials for negative tests

### Tableau Configuration
- `TABLEAU_SITE_ID` - Tableau site identifier
- `TABLEAU_DASHBOARD_NAME` - Default dashboard name
- `LARGE_TABLEAU_DASHBOARD_NAME` - Large dashboard for performance testing

### Test Configuration
- `TEST_ENVIRONMENT` - Environment identifier
- `DEBUG_MODE` - Enable debug logging (true/false)
- `HEADLESS` - Run browser in headless mode (true/false)

### Timeouts (milliseconds)
- `DEFAULT_TIMEOUT` - Default test timeout
- `CONVERSION_TIMEOUT` - Dashboard conversion timeout
- `DOWNLOAD_TIMEOUT` - File download timeout

## Adding New Environment Variables

1. Add the variable to all `.env.*` files
2. Update `tests/constants/testData.js` to include the new variable with fallback
3. Document the variable in this README
