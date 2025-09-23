# Test Coverage with NYC

This project uses NYC (Istanbul) for code coverage analysis of Playwright tests.

## Installation

NYC is already installed as a dev dependency. To install manually:
```bash
npm install --save-dev nyc
```

## Available Coverage Commands

### Basic Coverage
```bash
# Run tests with coverage
npm run test:coverage

# Run tests with HTML and text reports
npm run test:coverage:report

# Standard test run (no coverage)
npm test
```

### Manual NYC Commands
```bash
# Run with coverage
nyc playwright test

# Generate specific reports
nyc --reporter=html --reporter=text playwright test

# Check coverage thresholds
nyc --check-coverage --lines 70 playwright test
```

## Coverage Configuration

### Configuration Location
Coverage settings are configured in `package.json` under the `nyc` section:

```json
{
  "nyc": {
    "include": ["tests/**/*.js", "src/**/*.js"],
    "exclude": ["tests/fixtures/**", "node_modules/**"],
    "reporter": ["text", "html", "json", "lcov"],
    "check-coverage": true,
    "lines": 70,
    "functions": 70,
    "branches": 60,
    "statements": 70
  }
}
```

### Alternative Configuration
You can also use `.nycrc` file for configuration (already created).

## Coverage Thresholds

| Metric | Threshold |
|--------|-----------|
| Lines | 70% |
| Functions | 70% |
| Branches | 60% |
| Statements | 70% |

## Coverage Reports

### Generated Reports
- **Text**: Console output with coverage summary
- **HTML**: Interactive web report in `coverage/` directory
- **JSON**: Machine-readable format for CI/CD
- **LCOV**: Compatible with external tools

### Viewing HTML Report
```bash
# After running coverage tests
open coverage/index.html
# or on Windows
start coverage/index.html
```

## Coverage Files & Directories

```
coverage/
├── index.html          # Main HTML report
├── lcov-report/        # LCOV HTML format
├── coverage-final.json # JSON coverage data
└── .nyc_output/        # Temporary NYC files
```

## CI/CD Integration

### Failing on Low Coverage
Tests will fail if coverage falls below thresholds:
```bash
nyc --check-coverage playwright test
# Fails if any metric is below configured threshold
```

### Coverage in GitHub Actions
```yaml
- name: Run tests with coverage
  run: npm run test:coverage

- name: Upload coverage reports
  uses: codecov/codecov-action@v3
  with:
    file: ./coverage/lcov.info
```

## Excluding Files from Coverage

### In package.json
```json
{
  "nyc": {
    "exclude": [
      "tests/fixtures/**",
      "tests/constants/**",
      "**/node_modules/**"
    ]
  }
}
```

### Inline Exclusions
```javascript
/* istanbul ignore next */
function debugFunction() {
  // This function won't be counted in coverage
}

/* istanbul ignore if */
if (process.env.NODE_ENV === 'test') {
  // This branch won't be counted
}
```

## Troubleshooting

### Common Issues
1. **No coverage data**: Ensure files are in `include` patterns
2. **Low coverage**: Check `exclude` patterns aren't too broad
3. **Threshold failures**: Adjust thresholds in configuration

### Debug Coverage
```bash
# Verbose output
nyc --reporter=text-summary --reporter=html playwright test

# Check which files are instrumented
nyc --dry-run playwright test
```
