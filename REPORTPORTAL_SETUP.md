# ReportPortal Configuration Guide

ReportPortal is currently disabled in the Playwright configuration to prevent connection errors. Follow this guide to enable and configure ReportPortal properly.

## 🚫 Current Status
ReportPortal is **DISABLED** in `playwright.config.js` to prevent the following error:
```
Error: getaddrinfo ENOTFOUND your-instance.reportportal.io
```

## ✅ How to Enable ReportPortal

### Step 1: Set Up ReportPortal Instance
1. **Deploy ReportPortal** (choose one option):
   - **Docker**: Use the official [ReportPortal Docker setup](https://github.com/reportportal/reportportal)
   - **Cloud**: Use a hosted ReportPortal instance
   - **Local**: Install locally for development

### Step 2: Get Configuration Details
From your ReportPortal instance, collect:
- **API Key**: From your user profile in ReportPortal UI
- **Endpoint**: Your ReportPortal API URL (e.g., `https://your-instance.reportportal.io/api/v1`)
- **Project Name**: Must already exist in ReportPortal

### Step 3: Set Environment Variables
Create a `.env` file or set environment variables:

```bash
# ReportPortal Configuration
RP_API_KEY=your_actual_api_key_here
RP_ENDPOINT=https://your-actual-instance.reportportal.io/api/v1
RP_PROJECT=your_actual_project_name
RP_LAUNCH=Playwright Test Run
RP_DESCRIPTION=Automated Playwright run with screenshots, traces & video
```

### Step 4: Enable ReportPortal in Playwright Config
In `playwright.config.js`, uncomment and modify the ReportPortal reporter:

```javascript
reporter: [
  ['html'],
  ['json', { outputFile: 'test-results/results.json' }],
  ['junit', { outputFile: 'test-results/results.xml' }],
  // Enable ReportPortal reporter
  ['@reportportal/agent-js-playwright', { 
    apiKey: process.env.RP_API_KEY,
    endpoint: process.env.RP_ENDPOINT,
    project: process.env.RP_PROJECT,
    launch: process.env.RP_LAUNCH || 'Playwright Test Run',
    description: process.env.RP_DESCRIPTION || 'Automated Playwright run'
  }]
],
```

## 🔧 Quick Setup for Development

If you want to quickly test without ReportPortal:

### Option 1: Remove ReportPortal Completely
```bash
npm uninstall @reportportal/agent-js-playwright
```

### Option 2: Use Local ReportPortal with Docker
```bash
# Clone ReportPortal
git clone https://github.com/reportportal/reportportal.git
cd reportportal

# Start with Docker Compose
docker-compose -p reportportal up -d --force-recreate

# Access at http://localhost:8080
# Default credentials: superadmin / erebus
```

### Option 3: Keep Disabled (Current Setup)
The current configuration will work fine without ReportPortal - it uses HTML, JSON, and JUnit reporters.

## 🏃‍♂️ Running Tests

### Without ReportPortal (Current Setup)
```bash
# Smoke tests
npx playwright test --grep "@smoke"

# All tests  
npx playwright test

# View HTML report
npx playwright show-report
```

### With ReportPortal Enabled
```bash
# Set environment variables and run
RP_API_KEY=your_key RP_ENDPOINT=your_endpoint RP_PROJECT=your_project npx playwright test --grep "@smoke"
```

## 📊 Alternative Reporting Options

If you don't want to use ReportPortal, consider these alternatives:

### Allure Reports
```bash
npm install -D allure-playwright
```

### Custom HTML Reporter  
```bash
npm install -D playwright-html-reporter
```

### CI/CD Integration
- **GitHub Actions**: Use built-in test results
- **Jenkins**: Use JUnit XML reports
- **Azure DevOps**: Use test result publishing

## 🔍 Troubleshooting

### Common Issues:
1. **ENOTFOUND errors**: ReportPortal endpoint not accessible
2. **401 Unauthorized**: Invalid API key
3. **404 Project not found**: Project doesn't exist in ReportPortal
4. **Connection timeout**: Network or firewall issues

### Solutions:
1. Verify ReportPortal instance is running and accessible
2. Check API key is valid and has correct permissions
3. Ensure project exists in ReportPortal before running tests
4. Test network connectivity to ReportPortal instance

## 💡 Best Practices

1. **Environment-specific configs**: Use different ReportPortal projects for dev/staging/prod
2. **Conditional enabling**: Only enable ReportPortal in CI/CD environments
3. **Fallback reporters**: Always include HTML/JSON reporters as backup
4. **Secret management**: Store API keys securely, not in code

## 📝 Current Working Configuration

The current setup works perfectly for development and testing without ReportPortal:

- ✅ **HTML Reporter**: Interactive test results
- ✅ **JSON Reporter**: Machine-readable results  
- ✅ **JUnit Reporter**: CI/CD integration
- ✅ **Screenshots**: On test failures
- ✅ **Videos**: On test failures
- ✅ **Traces**: On retry attempts

This provides comprehensive test reporting without external dependencies.
